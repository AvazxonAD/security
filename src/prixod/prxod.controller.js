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
        const { page, limit, search, from, to, account_number_id } = validationResponse(prixodQueryValidation, req.query)
        const user_id = req.user.id;
        await getByIdaccount_numberService(user_id, account_number_id);
        const offset = (page - 1) * limit
        const { data, total, from_balance, to_balance } = await getPrixodService(user_id, from, to, offset, limit, account_number_id, search)
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
        const data = validationResponse(prixodExcelValidation, req.body);
        const workbook = new ExcelJS.Workbook()
        const file_name = `prixod_${new Date().getTime()}.xlsx`;
        const worksheet = workbook.addWorksheet('prixod_docs')
        worksheet.columns = [
            { header: 'doc_num', key: 'doc_num', width: 18 },
            { header: 'doc_date', key: 'doc_date', width: 18 },
            { header: 'summa', key: 'summa', width: 18 },
            { header: 'client', key: 'client', width: 18 },
            { header: 'inn', key: 'inn', width: 18 },
            { header: 'prixod_summa', key: 'prixod_summa', width: 18 },
            { header: 'prixod_date', key: 'prixod_date', width: 18 },
        ]
        const headerRow = worksheet.getRow(1)
        headerRow.height = 25
        headerRow.eachCell((cell) => {
            cell.font = { bold: true, color: { argb: 'FFFFFF' }, name: 'Times New Roman' };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '4472C4' },
            };
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
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
        })
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