const { prixodValidation, prixodQueryValidation, prixodExcelValidation } = require("../utils/validation");
const { resFunc } = require("../utils/resFunc");
const { validationResponse } = require("../utils/response.validation");
const { errorCatch } = require('../utils/errorCatch')
const ErrorResponse = require("../utils/errorResponse");
const { getByIdcontractService } = require('../contract/contract.service')
const { getByIdorganizationService } = require('../organization/organization.service')
const { getByIdaccount_numberService } = require('../spravochnik/accountNumber/account.number.service')
const ExcelJS = require('exceljs')
const path = require('path')
const { returnStringSumma } = require('../utils/return.summa')
const { returnStringDate } = require('../utils/date.functions')
const {
    prixodCreateService,
    getPrixodService,
    getByIdPrixodService,
    updatePrixodService,
    deletePrixodService
} = require('./prixod.service')

const prixodCreate = async (req, res) => {
    try {
        const user_id = req.user.id;
        const account_number_id = req.query.account_number_id;
        await getByIdaccount_numberService(user_id, account_number_id);
        const data = validationResponse(prixodValidation, req.body);
        await getByIdorganizationService(user_id, data.organization_id);
        const contract = await getByIdcontractService(user_id, data.contract_id, false, account_number_id, data.organization_id)
        if (contract.remaining_balance < data.summa) {
            throw new ErrorResponse('You are overpaying for this contract', 400);
        }
        const prixod = await prixodCreateService({ ...data, account_number_id, user_id })
        resFunc(res, 201, prixod);
    } catch (error) {
        errorCatch(error, res);
    }
}

const getByIdPrixod = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        const account_number_id = req.query.account_number_id;
        await getByIdaccount_numberService(user_id, account_number_id);
        const data = await getByIdPrixodService(user_id, id, account_number_id, true)
        resFunc(res, 200, data)
    } catch (error) {
        errorCatch(error, res)
    }
}

const getPrixod = async (req, res) => {
    try {
        const { page, limit, search, from, to, account_number_id, organization_id } = validationResponse(prixodQueryValidation, req.query)
        const user_id = req.user.id;
        await getByIdaccount_numberService(user_id, account_number_id);
        const offset = (page - 1) * limit
        const { data, total, from_balance, to_balance } = await getPrixodService(user_id, from, to, offset, limit, account_number_id, search, organization_id)
        const pageCount = Math.ceil(total / limit);
        const meta = {
            pageCount: pageCount,
            count: total,
            currentPage: page,
            nextPage: page >= pageCount ? null : page + 1,
            backPage: page === 1 ? null : page - 1,
            from_balance: returnStringSumma(from_balance) || 0,
            to_balance: returnStringSumma(to_balance) || 0
        }
        resFunc(res, 200, data, meta)
    } catch (error) {
        errorCatch(error, res)
    }
}


const updatePrixod = async (req, res) => {
    try {
        const user_id = req.user.id;
        const id = req.params.id;
        const account_number_id = req.query.account_number_id;
        const data = validationResponse(prixodValidation, req.body);
        const oldData = await getByIdPrixodService(user_id, id, account_number_id)
        await getByIdaccount_numberService(user_id, account_number_id);
        await getByIdorganizationService(user_id, data.organization_id);
        const contract = await getByIdcontractService(user_id, data.contract_id, false, account_number_id, data.organization_id)
        if (contract.remaining_balance + oldData.prixod_summa < data.summa) {
            throw new ErrorResponse('You are overpaying for this contract', 400);
        }
        const result = await updatePrixodService({ ...data, id })
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const deletePrixod = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        const account_number_id = req.query.account_number_id;
        await getByIdaccount_numberService(user_id, account_number_id);
        await getByIdPrixodService(user_id, id, account_number_id, true)
        await deletePrixodService(id)
        resFunc(res, 200, 'Delete success true')
    } catch (error) {
        errorCatch(error, res)
    }
}

const exportExcelData = async (req, res) => {
    try {
        const { search, from, to, account_number_id, organization_id } = validationResponse(prixodQueryValidation, req.query)
        const user_id = req.user.id;
        await getByIdaccount_numberService(user_id, account_number_id);
        const { data, total, from_balance, to_balance } = await getPrixodService(user_id, from, to, null, null, account_number_id, search, organization_id)
        const workbook = new ExcelJS.Workbook()
        const file_name = `prixod_${new Date().getTime()}.xlsx`;
        const worksheet = workbook.addWorksheet('prixod_docs')
        worksheet.mergeCells(`A1`, 'G1')
        const titleCell = worksheet.getCell('A1')
        titleCell.value = `Оммавий тадбирлардан тушган тушумлар`
        worksheet.mergeCells(`A2`, 'G2')
        const period = worksheet.getCell('A2')
        period.value = `${returnStringDate(new Date(from))} дан ${returnStringDate(new Date(to))} гача бўлган давр`
        const css_array = [ titleCell, period ]
        css_array.forEach((element, index) => {
            let horizontal = 'center'
            let bold = true
            let size = 14
            if(index === 1) horizontal = 'left'
            Object.assign(element, {
                font: { size, name: 'Times New Roman', bold },
                alignment: { vertical: 'middle', horizontal, wrapText: true },
                fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } },
                border: {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                }
            });
        });
        /*((cell) => {
            cell.font = { bold: true, color: { argb: '#FFFFFF' }, name: 'Times New Roman' };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFFFF' },
            };
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        });
        
        data.data.forEach((prixod, index) => {
            const row = worksheet.addRow({
                doc_num: prixod.contract_doc_num,
                doc_date: returnStringDate( new Date(prixod.contract_doc_date)),
                summa: returnStringSumma(prixod.contract_summa),
                client: prixod.organization_name,
                inn: prixod.organization_str,
                prixod_summa: returnStringSumma(prixod.prixod_summa),
                prixod_date: returnStringDate( new Date(prixod.prixod_date))
            })
            row.eachCell((cell, collNumber) => {
                let horizontal = 'left'
                if (collNumber === 3 || collNumber === 6) horizontal = 'right'
                cell.font = { name: 'Times New Roman', size: 11, color: { argb: '000000' } };
                cell.alignment = { horizontal, vertical: 'middle', wrapText: true };
                cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            });
        })*/
        worksheet.getRow(1).height = 30
        worksheet.getColumn(1).width = 16
        worksheet.getColumn(2).width = 16
        worksheet.getColumn(3).width = 20
        worksheet.getColumn(4).width = 30
        worksheet.getColumn(5).width = 20
        worksheet.getColumn(6).width = 20
        worksheet.getColumn(7).width = 16
        const filePath = path.join(__dirname, '../../public/exports/' + file_name)
        await workbook.xlsx.writeFile(filePath)
        return res.download(filePath, (err) => {
            if (err) {
                throw new ErrorResponse(err, err.statusCode)
            }
        })
    } catch (error) {
        errorCatch(error, res)
    }
}

module.exports = {
    prixodCreate,
    getPrixod,
    getByIdPrixod,
    updatePrixod,
    deletePrixod,
    exportExcelData
}