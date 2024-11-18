const {
    contractCreateService,
    getcontractService,
    getByIdcontractService,
    contractUpdateService,
    deletecontractService,
    dataForExcelService,
    contractViewService
} = require("./contract.service");
const { contractValidation, conrtactQueryValidation } = require("../utils/validation");
const { resFunc } = require("../utils/resFunc");
const { validationResponse } = require("../utils/response.validation");
const { errorCatch } = require('../utils/errorCatch')
const { getByIdBatalonService } = require('../batalon/batalon.service')
const { getByIdorganizationService } = require('../organization/organization.service')
const { getByIdaccount_numberService } = require('../spravochnik/accountNumber/account.number.service')
const { getbxmService } = require('../spravochnik/bxm/bxm.service');
const { returnStringSumma } = require('../utils/return.summa');
const { returnStringDate } = require('../utils/date.functions')
const xlsx = require('xlsx')
const ExcelJs = require('exceljs')
const path = require('path')


const contractCreate = async (req, res) => {
    try {
        const user_id = req.user.id
        const account_number_id = req.query.account_number_id
        await getByIdaccount_numberService(user_id, account_number_id)
        const data = validationResponse(contractValidation, req.body)
        const bxm = await getbxmService(user_id)
        await getByIdorganizationService(user_id, data.organization_id)
        for (let task of data.tasks) {
            await getByIdBatalonService(user_id, task.batalon_id)
        }
        const result = await contractCreateService({ ...data, user_id, bxm, account_number_id })
        resFunc(res, 201, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const contractGet = async (req, res) => {
    try {
        const user_id = req.user.id
        const { page, limit, search, from, to, account_number_id, organization_id, batalon_id } = validationResponse(conrtactQueryValidation, req.query)
        await getByIdaccount_numberService(user_id, account_number_id)
        const offset = (page - 1) * limit
        const { data, total, from_balance, to_balance } = await getcontractService(user_id, offset, limit, search, from, to, account_number_id, organization_id, batalon_id)
        const pageCount = Math.ceil(total / limit);
        const meta = {
            pageCount: pageCount,
            count: total,
            currentPage: page,
            nextPage: page >= pageCount ? null : page + 1,
            backPage: page === 1 ? null : page - 1,
            from_balance: returnStringSumma(from_balance),
            to_balance: returnStringSumma(to_balance)
        }
        resFunc(res, 200, data, meta)
    } catch (error) {
        errorCatch(error, res)
    }
}

const contractGetById = async (req, res) => {
    try {
        const user_id = req.user.id
        const account_number_id = req.query.account_number_id
        await getByIdaccount_numberService(user_id, account_number_id)
        const id = req.params.id
        const result = await getByIdcontractService(user_id, id, true, account_number_id)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const contractUpdate = async (req, res) => {
    try {
        const id = req.params.id
        const user_id = req.user.id
        const account_number_id = req.query.account_number_id
        await getByIdaccount_numberService(user_id, account_number_id)
        await getByIdcontractService(user_id, id, false, account_number_id)
        const data = validationResponse(contractValidation, req.body)
        const bxm = await getbxmService(user_id)
        await getByIdorganizationService(user_id, data.organization_id)
        for (let task of data.tasks) {
            await getByIdBatalonService(user_id, task.batalon_id)
        }
        const result = await contractUpdateService({ ...data, user_id, bxm, id })
        resFunc(res, 201, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const contractDelete = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        const account_number_id = req.query.account_number_id
        await getByIdcontractService(user_id, id, false, account_number_id)
        await deletecontractService(id)
        resFunc(res, 200, 'delete success true')
    } catch (error) {
        errorCatch(error, res)
    }
}

const exportExcelData = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { from, to, account_number_id } = validationResponse(conrtactQueryValidation, req.query);
        const { data, total } = await dataForExcelService(user_id, account_number_id, from, to);

        const contractBook = new ExcelJs.Workbook();
        const contractSheet = contractBook.addWorksheet('Shartnomalar');
        contractSheet.columns = [
            { header: 'N_', key: 'doc_num', width: 10 },
            { header: 'client', key: 'organization_name', width: 40 },
            { header: 'shartnoma sanasi', key: 'doc_date', width: 20 },
            { header: 'amal qilish muddati', key: 'period', width: 20 },
            { header: 'adress', key: 'adress', width: 40 },
            { header: 'Boshlanish vaqti', key: 'start_date', width: 20 },
            { header: 'Tugallash sanasi', key: 'end_date', width: 20 },
            { header: 'shegirma %', key: 'discount', width: 20 },
            { header: 'Chegirma summa', key: 'discount_money', width: 20 },
            { header: 'summa', key: 'summa', width: 20 },
            { header: 'umumiy summa', key: 'result_summa', width: 20 },
            { header: 'kridit', key: 'kridit', width: 20 },
            { header: 'debit', key: 'debit', width: 20 },
            { header: 'Qolgan summa', key: 'remaining_summa', width: 20 },
            { header: 'xisob raqam', key: 'account_number', width: 25 },
            { header: 'xodimlar soni', key: 'all_worker_number', width: 20 },
            { header: 'topshiriq vaqti', key: 'all_task_time', width: 20 }
        ];
        const headerRow = contractSheet.getRow(1);
        headerRow.font = { bold: true };
        headerRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFFFFF' }
        };
        headerRow.alignment = { horizontal: 'center' };
        headerRow.height = 30;
        contractSheet.columns.forEach((column) => {
            column.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        });
        headerRow.eachCell((cell) => {
            cell.border = {
                top: { style: 'thin', color: { argb: 'FF000000' } },
                left: { style: 'thin', color: { argb: 'FF000000' } },
                bottom: { style: 'thin', color: { argb: 'FF000000' } },
                right: { style: 'thin', color: { argb: 'FF000000' } }
            };
        });
        for (let contract of data) {
            contractSheet.addRow({
                doc_num: contract.doc_num,
                organization_name: contract.organization_name,
                doc_date: contract.doc_date,
                period: contract.period,
                adress: contract.adress,
                start_date: `${contract.start_date} ${contract.start_time}`,
                end_date: `${contract.end_date} ${contract.end_time}`,
                discount: contract.discount,
                discount_money: contract.discount_money,
                summa: contract.summa,
                result_summa: contract.result_summa,
                kridit: contract.kridit,
                debit: contract.debit,
                remaining_summa: contract.remaining_summa,
                account_number: contract.account_number,
                all_worker_number: contract.all_worker_number,
                all_task_time: contract.all_task_time
            });
        }
        const totalRow = contractSheet.addRow(['Barcha', 'shartnomalar', 'Soni', `${total}`]);
        totalRow.font = { bold: true };
        totalRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFFFFF' }
        };
        totalRow.alignment = { horizontal: 'center' };
        totalRow.eachCell((cell) => {
            cell.border = {
                top: { style: 'thin', color: { argb: 'FF000000' } },
                left: { style: 'thin', color: { argb: 'FF000000' } },
                bottom: { style: 'thin', color: { argb: 'FF000000' } },
                right: { style: 'thin', color: { argb: 'FF000000' } }
            };
            cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        });
        const fileName = `contracts.${Date.now()}.xlsx`;
        const filePath = path.join(__dirname, '../../public/exports', fileName);

        await contractBook.xlsx.writeFile(filePath);
        return res.download(filePath, (err) => {
            if (err) throw new ErrorResponse(err, err.statusCode);
        });
    } catch (error) {
        errorCatch(error, res);
    }
};

const forDataPdf = async (req, res) => {
    try {
        const user_id = req.user.id
        const { from, to, account_number_id } = validationResponse(conrtactQueryValidation, req.query);
        const { data, total } = await dataForExcelService(user_id, account_number_id, from, to);
        resFunc(res, 200, { total, data })
    } catch (error) {
        errorCatch(error, res)
    }
}

const importExcelData = async (req, res) => {
    try {
        const user_id = req.user.id
        if (!req.file) {
            throw new ErrorResponse('File  not found', 404)
        }
        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet).map(row => {
            const newRow = {};
            for (const key in row) {
                newRow[key.trim()] = row[key];
            }
            return newRow;
        });
        res.send(data);
    } catch (error) {

    }
}

const contractView = async (req, res) => {
    try {
        const user_id = req.user.id
        const account_number_id = req.query.account_number_id
        const id = req.params.id 
        await getByIdcontractService(user_id, id, false, account_number_id)
        const { contract, prixods, rasxod_fios, rasxods } = await contractViewService(user_id, account_number_id, id)
        resFunc(res, 200, { contract, prixods, rasxod_fios, rasxods })
    } catch (error) {
        errorCatch(error, res)
    }
}

const conntractViewExcel = async (req, res) => {
    try {
        const user_id = req.user.id
        const account_number_id = req.query.account_number_id
        const id = req.params.id
        const { contract, prixods, rasxod_fios, rasxods } = await contractViewService(user_id, account_number_id, id)
        const workbook = new ExcelJs.Workbook()
        const fileName = `contract_${new Date().getTime()}.xlsx`
        const worksheet = workbook.addWorksheet('contract')
        worksheet.pageSetup.margins.left = 0
        worksheet.pageSetup.margins.header = 0
        worksheet.pageSetup.margins.footer = 0
        worksheet.pageSetup.margins.right = 0
        worksheet.mergeCells(`A1`, 'K1');
        const title = worksheet.getCell(`A1`);
        title.value = `${contract.doc_num}  шартнома таҳлили`;
        worksheet.mergeCells(`A2`, 'C2')
        const contract_date = worksheet.getCell(`A2`)
        contract_date.value = returnStringDate(new Date(contract.doc_date))
        worksheet.mergeCells(`D2`, 'G2')
        const organization = worksheet.getCell(`D2`)
        organization.value = `Буюртмачи`
        worksheet.mergeCells(`H2`, 'K2')
        const doer = worksheet.getCell(`H2`)
        doer.value = 'Бажарувчи'
        worksheet.mergeCells(`A3`, 'C3')
        const address = worksheet.getCell(`A3`)
        address.value = 'Манзил';
        worksheet.mergeCells(`D3`, 'G3');
        const organization_name = worksheet.getCell(`D3`)
        organization_name.value = `${contract.organization_name}`
        worksheet.mergeCells(`H3`, 'K3')
        const doer_name = worksheet.getCell(`H3`)
        doer_name.value = `${contract.doer}`
        worksheet.mergeCells(`A4`, 'C4')
        const inn = worksheet.getCell(`A4`)
        inn.value = 'ИНН'
        worksheet.mergeCells(`D4`, 'G4')
        const organization_str = worksheet.getCell(`D4`)
        organization_str.value = returnStringSumma(contract.organization_str)
        worksheet.mergeCells(`H4`, 'K4')
        const doer_str = worksheet.getCell(`H4`)
        doer_str.value = returnStringSumma(contract.str)
        worksheet.mergeCells(`A5`, `C5`)
        const account_number = worksheet.getCell(`A5`)
        account_number.value = `Хисоб рақами`
        worksheet.mergeCells(`D5`, 'G5')
        const organization_account_number = worksheet.getCell(`D5`)
        organization_account_number.value = returnStringSumma(contract.organization_account_number)
        worksheet.mergeCells(`H5`, 'K5')
        const doer_account_number = worksheet.getCell(`H5`)
        doer_account_number.value = returnStringSumma(contract.account_number)
        const css_array = [title, organization, doer, address, inn, account_number, contract_date, organization_name, organization_str, organization_account_number, doer_name, doer_str, doer_account_number]
        css_array.forEach((item, index) => {
            let size = 10;
            let bold = true;
            let horizontal = 'center'
            if (index === 0) size = 14;
            if(index > 6) bold = false;
            Object.assign(item, {
                numFmt: '#,## ',
                font: { size, bold, color: { argb: 'FF000000' }, name: 'Times New Roman' },
                alignment: { vertical: 'middle', horizontal },
                fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } },
                border: {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                }
            });
        })

        worksheet.getRow(1).height = 30;
        const filePath = path.join(__dirname, '../../public/uploads/' + fileName);
        await workbook.xlsx.writeFile(filePath);
        return res.download(filePath, (err) => {
            if (err) throw new ErrorResponse(err, err.statusCode);
        });
    } catch (error) {
        errorCatch(error, res)
    }
}

module.exports = {
    contractCreate,
    contractGet,
    contractGetById,
    contractUpdate,
    contractDelete,
    importExcelData,
    exportExcelData,
    forDataPdf,
    contractView
};
