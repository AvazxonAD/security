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
        const { data, total, from_balance, to_balance, summa } = await getPrixodService(user_id, from, to, offset, limit, account_number_id, search, organization_id)
        const pageCount = Math.ceil(total / limit);
        const meta = {
            pageCount: pageCount,
            count: total,
            currentPage: page,
            nextPage: page >= pageCount ? null : page + 1,
            backPage: page === 1 ? null : page - 1,
            from_balance: returnStringSumma(from_balance) || 0,
            to_balance: returnStringSumma(to_balance) || 0,
            summa: returnStringSumma(summa) || 0
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
        const { data, total, from_balance, to_balance, summa } = await getPrixodService(user_id, from, to, null, null, account_number_id, search, organization_id)
        const workbook = new ExcelJS.Workbook()
        const file_name = `prixod_${new Date().getTime()}.xlsx`;
        const worksheet = workbook.addWorksheet(`prixod_docs_${total}`);
        worksheet.pageSetup.margins.left = 0.5
        worksheet.pageSetup.margins.header = 0.5
        worksheet.pageSetup.margins.footer = 0.5
        worksheet.pageSetup.margins.right = 0.5
        worksheet.mergeCells(`A1`, 'F1')
        worksheet.mergeCells(`A2`, 'F2')
        worksheet.mergeCells(`A3`, 'F3')
        const titleCell = worksheet.getCell('A1')
        const summa_fromCell = worksheet.getCell('A2')
        const prixodCell = worksheet.getCell('A3')
        const doc_numCell = worksheet.getCell('A4')
        const doc_dateCell = worksheet.getCell('B4')
        const clientCell = worksheet.getCell('C4')
        const innCell = worksheet.getCell('D4')
        const prixod_sumCell = worksheet.getCell('E4')
        const prixod_dateCell = worksheet.getCell('F4')
        titleCell.value = `Оммавий тадбирлардан тушган тушумлар`
        prixodCell.value = `${returnStringDate(new Date(from))} дан ${returnStringDate(new Date(to))} гача бўлган тушумлар`
        summa_fromCell.value = `${returnStringDate(new Date(from))} гача бўлган тушумлар жами : ${returnStringSumma(from_balance)}`
        doc_numCell.value = 'Шартнома рақами'
        doc_dateCell.value = `Шартнома санаси`
        clientCell.value = `Ҳамкор ташкилот`
        innCell.value = `Ҳамкор инн`
        prixod_sumCell.value = `Тўланган пул маблағи`
        prixod_dateCell.value = `Тўланган пул санаси`
        let row_number = 5
        for (let prixod of data) {
            const doc_numCell = worksheet.getCell(`A${row_number}`)
            const doc_dateCell = worksheet.getCell(`B${row_number}`)
            const clientCell = worksheet.getCell(`C${row_number}`)
            const innCell = worksheet.getCell(`D${row_number}`)
            const prixod_sumCell = worksheet.getCell(`E${row_number}`)
            const prixod_dateCell = worksheet.getCell(`F${row_number}`)
            doc_numCell.value = prixod.contract_doc_num
            doc_dateCell.value = returnStringDate( new Date(prixod.contract_doc_date))
            clientCell.value = prixod.organization_name
            innCell.value = prixod.organization_str
            prixod_sumCell.value = prixod.prixod_summa
            prixod_dateCell.value = returnStringDate(new Date(prixod.prixod_date))
            const css_array = [doc_dateCell, doc_numCell, clientCell, innCell, prixod_dateCell, prixod_sumCell]
            css_array.forEach((element, index) => {
                let horizontal = 'center'
                let bold = true
                let size = 8
                if (index === 2) horizontal = 'left'
                if (index === 5) horizontal = 'right'
                Object.assign(element, {
                    numFmt: '#,##0.00',
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
            row_number++
        }
        worksheet.mergeCells(`A${row_number}`, `D${row_number}`)
        worksheet.mergeCells(`A${row_number + 1}`, `F${row_number + 1}`)
        const itogo_stringCell = worksheet.getCell(`A${row_number}`)
        const itogoCell = worksheet.getCell(`E${row_number}`)
        const summa_toCell = worksheet.getCell(`A${row_number + 1}`)
        itogo_stringCell.value = `${returnStringDate(new Date(from))} дан ${returnStringDate(new Date(to))}-гача бўлган  итого :`
        itogoCell.value = summa
        summa_toCell.value = `${returnStringDate(new Date(to))} гача бўлган тушумлар жами : ${returnStringSumma(to_balance)}`
        const css_array = [titleCell, summa_fromCell, prixodCell, doc_dateCell, doc_numCell, clientCell, innCell, prixod_dateCell, prixod_sumCell, itogo_stringCell, itogoCell, summa_toCell]
        css_array.forEach((element, index) => {
            let horizontal = 'center'
            let bold = true
            let size = 10
            let fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } }
            let border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            }
            if (index === 1 || index === 2 || index === 9 || index === 11) horizontal = 'left'
            if(index === 10 ) size = 8, horizontal = 'right'
            if(index === 9 || index === 10 || index === 0 || index === 1 || index === 2 || index === 11 ) fill = {}, border = {} 
            Object.assign(element, {
                numFmt: '#,#00.00',
                font: { size, name: 'Times New Roman', bold },
                alignment: { vertical: 'middle', horizontal, wrapText: true },
                fill,
                border
            });
        });
        worksheet.getRow(1).height = 50
        worksheet.getRow(2).height = 35
        worksheet.getRow(3).height = 30
        worksheet.getColumn(1).width = 10
        worksheet.getColumn(2).width = 13
        worksheet.getColumn(3).width = 15
        worksheet.getColumn(4).width = 20
        worksheet.getColumn(5).width = 15
        worksheet.getColumn(6).width = 15
        worksheet.getColumn(7).width = 13
        worksheet.getRow(itogoCell.row).height = 30 
        worksheet.getRow(summa_toCell.row).height = 30 
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

const forPdfData = async (req, res) => {
    try {
        const { search, from, to, account_number_id, organization_id } = validationResponse(prixodQueryValidation, req.query)
        const user_id = req.user.id;
        await getByIdaccount_numberService(user_id, account_number_id);
        const data = await getPrixodService(user_id, from, to, null, null, account_number_id, search, organization_id)
        resFunc(res, 200, data)
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
    exportExcelData,
    forPdfData
}