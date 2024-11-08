const {
    contractCreateService,
    getcontractService,
    getByIdcontractService,
    contractUpdateService,
    deletecontractService,
    dataForExcelService
} = require("./contract.service");
const { contractValidation, conrtactQueryValidation } = require("../utils/validation");
const { resFunc } = require("../utils/resFunc");
const { validationResponse } = require("../utils/response.validation");
const { errorCatch } = require('../utils/errorCatch')
const { getByIdBatalonService } = require('../batalon/batalon.service')
const { getByIdorganizationService } = require('../organization/organization.service')
const { getByIdaccount_numberService } = require('../spravochnik/accountNumber/account.number.service')
const { getbxmService } = require('../spravochnik/bxm/bxm.service');
const { returnStringSumma } = require('../utils/return.summa')
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
        const { page, limit, search, from, to, account_number_id, organization_id } = validationResponse(conrtactQueryValidation, req.query)
        await getByIdaccount_numberService(user_id, account_number_id)
        const offset = (page - 1) * limit
        const { data, total, from_balance, to_balance } = await getcontractService(user_id, offset, limit, search, from, to, account_number_id, organization_id)
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
        await getByIdcontractService(user_id, id)
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

module.exports = {
    contractCreate,
    contractGet,
    contractGetById,
    contractUpdate,
    contractDelete,
    importExcelData,
    exportExcelData
};
