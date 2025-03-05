const { paymentRequestValidation, rasxodFioValidation, rasxodQueryValidation } = require("../utils/validation");
const { resFunc } = require("../utils/resFunc");
const { validationResponse } = require("../utils/response.validation");
const { errorCatch } = require('../utils/errorCatch')
const { paymentRequestService, createRasxodDocService, getRasxodService, getByIdRasxodService, deeleteRasxodService, updateRasxodService } = require('./rasxod.fio.service')
const { getByIdaccount_numberService } = require('../spravochnik/account.number/account.number.service')
const { getByIdBatalonService } = require('../batalon/db')
const { getByIdWorkerTaskService } = require('./rasxod.fio.service')
const { returnStringSumma } = require('../utils/return.summa')
const { getByIddeductionService } = require('../spravochnik/deduction/deduction.service')
const { returnStringDate } = require('../utils/date.functions')
const ExcelJS = require('exceljs')
const path = require('path')

const getPaymentRequest = async (req, res) => {
    try {
        const user_id = req.user.id
        const { account_number_id, batalon_id, to, from } = validationResponse(paymentRequestValidation, req.query)
        await getByIdaccount_numberService(user_id, account_number_id, null, req.i18n)
        await getByIdBatalonService(user_id, batalon_id, false, true, req.i18n)
        const data = await paymentRequestService(account_number_id, batalon_id, from, to);
        let summa = 0;
        for (let item of data) {
            summa += item.summa;
        }
        const meta = {
            pageCount: 1,
            count: data.length,
            currentPage: 1,
            nextPage: null,
            backPage: null,
            summa
        }

        return res.success(req.i18n.t('getSuccess'), 200, meta, data);
    } catch (error) {
        errorCatch(error, res)
    }
}

const createRasxod = async (req, res) => {
    try {
        const user_id = req.user.id
        const from = req.query.from
        const to = req.query.to
        const account_number_id = req.query.account_number_id
        const { error, value: data } = rasxodFioValidation.validate({ ...req.body, from, to });
        if (error) {
            return res.error(req.i18n.t('validationError'), 400);
        }

        await getByIdaccount_numberService(user_id, account_number_id, null, req.i18n)
        await getByIdBatalonService(user_id, data.batalon_id, false, true, req.i18n)
        data.deductions = await Promise.all(data.deductions.map(async item => {
            const deduction = await getByIddeductionService(user_id, item.deduction_id, null, req.i18n)
            return deduction;
        }))
        for (let task of data.worker_tasks) {
            await getByIdWorkerTaskService(data.batalon_id, task.worker_task_id, user_id, req.i18n)
        }
        const result = await createRasxodDocService({ ...data, user_id, account_number_id, from, to })
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const getRasxod = async (req, res) => {
    try {
        const user_id = req.user.id
        const { from, to, account_number_id, page, limit, batalon_id } = validationResponse(rasxodQueryValidation, req.query)
        await getByIdaccount_numberService(user_id, account_number_id, null, req.i18n)
        if (batalon_id) {
            await getByIdBatalonService(user_id, batalon_id, false, null, req.i18n)
        }
        const offset = (page - 1) * limit;
        const { total, data, summa_from, summa_to } = await getRasxodService(user_id, account_number_id, from, to, offset, limit, batalon_id)
        const pageCount = Math.ceil(total / limit);
        const meta = {
            pageCount: pageCount,
            count: total,
            currentPage: page,
            nextPage: page >= pageCount ? null : page + 1,
            backPage: page === 1 ? null : page - 1,
            from_balance: returnStringSumma(summa_from),
            to_balance: returnStringSumma(summa_to)
        }
        resFunc(res, 200, data, meta)
    } catch (error) {
        errorCatch(error, res)
    }
}

const getByIdRasxod = async (req, res) => {
    try {
        const user_id = req.user.id
        const account_number_id = req.query.account_number_id
        await getByIdaccount_numberService(user_id, account_number_id, null, req.i18n)
        const id = req.params.id
        const data = await getByIdRasxodService(user_id, account_number_id, id, true, req.i18n)
        resFunc(res, 200, data)
    } catch (error) {
        errorCatch(error, res)
    }
}

const deeleteRasxod = async (req, res) => {
    try {
        const user_id = req.user.id
        const account_number_id = req.query.account_number_id
        const id = req.params.id
        await getByIdRasxodService(user_id, account_number_id, id, null, req.i18n)
        await deeleteRasxodService(id)
        resFunc(res, 200, 'delete success true')
    } catch (error) {
        errorCatch(error, res)
    }
}

const updateRasxod = async (req, res) => {
    try {
        const user_id = req.user.id
        const account_number_id = req.query.account_number_id
        const id = req.params.id
        const from = req.query.from
        const to = req.query.to
        const oldData = await getByIdRasxodService(user_id, account_number_id, id, null, req.i18n)
        const data = validationResponse(rasxodFioValidation, { ...req.body, from, to })
        await getByIdaccount_numberService(user_id, account_number_id, null, req.i18n)
        await getByIdBatalonService(user_id, data.batalon_id, false, true, req.i18n)
        for (let task of data.worker_tasks) {
            const test = oldData.worker_tasks.find(item => item.task_id === task.task_id)
            if (!test || oldData.batalon_id !== data.batalon_id) {
                await getByIdWorkerTaskService(data.batalon_id, task.task_id, user_id, req.i18n)
            }
        }
        data.deductions = await Promise.all(data.deductions.map(async item => {
            const deduction = await getByIddeductionService(user_id, item.deduction_id, null, req.i18n)
            return deduction;
        }))
        const result = await updateRasxodService({ ...data, id, from, to })
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const exportExcelData = async (req, res) => {
    try {
        const user_id = req.user.id
        const { from, to, account_number_id, batalon_id } = validationResponse(rasxodQueryValidation, req.query)
        await getByIdaccount_numberService(user_id, account_number_id, null, req.i18n)
        if (batalon_id) {
            await getByIdBatalonService(user_id, batalon_id, true, null, req.i18n)
        }
        const { total, data, summa_from, summa_to } = await getRasxodService(user_id, account_number_id, from, to, null, null, batalon_id)
        const workbook = new ExcelJS.Workbook()
        const file_name = `rasxod_batalon_${new Date().getTime()}.xlsx`;
        const worksheet = workbook.addWorksheet(`rasxod_docs_${total}`);
        worksheet.pageSetup.margins.left = 0.5
        worksheet.pageSetup.margins.header = 0.5
        worksheet.pageSetup.margins.footer = 0.5
        worksheet.pageSetup.margins.right = 0.5
        worksheet.mergeCells(`A1`, 'F1')
        worksheet.mergeCells(`A2`, 'F2')
        worksheet.mergeCells(`A3`, 'F3')
        const titleCell = worksheet.getCell('A1')
        const summa_fromCell = worksheet.getCell('A2')
        const periodCell = worksheet.getCell('A3')
        const doc_numCell = worksheet.getCell('A4')
        const doc_dateCell = worksheet.getCell('B4')
        const clientCell = worksheet.getCell('C4')
        const innCell = worksheet.getCell('D4')
        const rasxod_sumCell = worksheet.getCell('E4')
        const commentCell = worksheet.getCell('F4')
        titleCell.value = `Батальонлар учун қилинган чиқимлар`
        periodCell.value = `${returnStringDate(new Date(from))} дан ${returnStringDate(new Date(to))} гача бўлган чиқимлар`
        summa_fromCell.value = `${returnStringDate(new Date(from))} гача бўлган чиқимлар жами : ${returnStringSumma(summa_from)}`
        doc_numCell.value = 'Ҳужжат рақами'
        doc_dateCell.value = `Ҳужжат санаси`
        clientCell.value = `Батальон  номи`
        innCell.value = `Батальон инн`
        rasxod_sumCell.value = `Тўланган пул маблағи`
        commentCell.value = `Тавсиф`
        let row_number = 5
        for (let rasxod of data) {
            const doc_numCell = worksheet.getCell(`A${row_number}`)
            const doc_dateCell = worksheet.getCell(`B${row_number}`)
            const clientCell = worksheet.getCell(`C${row_number}`)
            const innCell = worksheet.getCell(`D${row_number}`)
            const rasxod_sumCell = worksheet.getCell(`E${row_number}`)
            const commentCell = worksheet.getCell(`F${row_number}`)
            doc_numCell.value = rasxod.doc_num
            doc_dateCell.value = returnStringDate(new Date(rasxod.doc_date))
            clientCell.value = rasxod.batalon_name
            innCell.value = rasxod.batalon_str
            rasxod_sumCell.value = rasxod.summa
            commentCell.value = rasxod.opisanie
            const css_array = [doc_dateCell, doc_numCell, clientCell, innCell, commentCell, rasxod_sumCell]
            css_array.forEach((element, index) => {
                let horizontal = 'center'
                let bold = true
                let size = 8
                if (index === 4) horizontal = 'left'
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
        itogoCell.value = summa_to
        summa_toCell.value = `${returnStringDate(new Date(to))} гача бўлган чиқимлар жами : ${returnStringSumma(summa_to)}`
        const css_array = [titleCell, summa_fromCell, periodCell, doc_dateCell, doc_numCell, clientCell, innCell, commentCell, rasxod_sumCell, itogo_stringCell, itogoCell, summa_toCell]
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
            if (index === 10) size = 8, horizontal = 'right'
            if (index === 9 || index === 10 || index === 0 || index === 1 || index === 2 || index === 11) fill = {}, border = {}
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

const exportRasxodByIdExcelData = async (req, res) => {
    try {
        const user_id = req.user.id
        const account_number_id = req.query.account_number_id
        await getByIdaccount_numberService(user_id, account_number_id, null, req.i18n)
        const id = req.params.id
        const data = await getByIdRasxodService(user_id, account_number_id, id, null, req.i18n)
        const workbook = new ExcelJS.Workbook()
        const file_name = `rasxod_fio_${new Date().getTime()}.xlsx`;
        const worksheet = workbook.addWorksheet(`rasxod_docs`);
        worksheet.pageSetup.margins.left = 0
        worksheet.pageSetup.margins.header = 0
        worksheet.pageSetup.margins.footer = 0
        worksheet.pageSetup.margins.right = 0
        const css_array = []
        worksheet.mergeCells(`A1`, `G1`)
        const titleCell = worksheet.getCell(`A1`)
        titleCell.value = `${returnStringDate(new Date(data.from))}дан ${returnStringDate(new Date(data.to))}-гача оммавий тадбирларда қатнашган ${data.batalon_name} батальон  ходимларга пул ўтказиш`
        css_array.push(titleCell)
        let row_number = 2;
        if (data.deductions.length > 0) {
            worksheet.mergeCells(`A${row_number}`, `B${row_number}`)
            const deductionTitleCell = worksheet.getCell(`A${row_number}`)
            deductionTitleCell.value = `Ушланмалар`
            css_array.push(deductionTitleCell)
            row_number++
            const deductionNameCell = worksheet.getCell(`A${row_number}`)
            deductionNameCell.value = `Ушланма номи`
            css_array.push(deductionNameCell)
            const deductionPercentCell = worksheet.getCell(`B${row_number}`)
            deductionPercentCell.value = `Ушланма фоизи %`
            css_array.push(deductionPercentCell)
            row_number++
            data.deductions.forEach(item => {
                const deductionNameCell = worksheet.getCell(`A${row_number}`)
                deductionNameCell.value = item.deduction_name
                css_array.push(deductionNameCell)
                const deductionPercentCell = worksheet.getCell(`B${row_number}`)
                deductionPercentCell.value = `${item.percent}%`
                css_array.push(deductionNameCell, deductionPercentCell)
                row_number++
            })
        }
        const fioCell = worksheet.getCell(`A${row_number}`)
        fioCell.value = 'ФИО';
        const xisobRaqamCell = worksheet.getCell(`B${row_number}`)
        xisobRaqamCell.value = `Хисоб рақами`;
        const accountNumberCell = worksheet.getCell(`C${row_number}`)
        accountNumberCell.value = `Карта рақами`;
        const task_timeCell = worksheet.getCell(`D${row_number}`)
        task_timeCell.value = 'Вақт';
        const summaCell = worksheet.getCell(`E${row_number}`)
        summaCell.value = `Сумма`;
        const deductionCell = worksheet.getCell(`F${row_number}`)
        deductionCell.value = 'Ушлаб қолинган'
        const result_summaCell = worksheet.getCell(`G${row_number}`)
        result_summaCell.value = `Қўлга тегадиган`;
        css_array.push(fioCell, xisobRaqamCell, accountNumberCell, task_timeCell, summaCell, deductionCell, result_summaCell)
        let itogo_summa = 0
        let itogo_deduction = 0
        let itogo_result = 0
        row_number++
        for (let worker of data.worker_tasks) {
            const fioCell = worksheet.getCell(`A${row_number}`)
            fioCell.value = worker.fio
            const xisobRaqamCell = worksheet.getCell(`B${row_number}`)
            xisobRaqamCell.value = worker.xisob_raqam
            const accountNumberCell = worksheet.getCell(`C${row_number}`)
            accountNumberCell.value = worker.account_number
            const task_timeCell = worksheet.getCell(`D${row_number}`)
            task_timeCell.value = worker.task_time
            const summaCell = worksheet.getCell(`E${row_number}`)
            summaCell.value = worker.summa
            const deductionCell = worksheet.getCell(`F${row_number}`)
            deductionCell.value = worker.deduction_money
            const result_summaCell = worksheet.getCell(`G${row_number}`)
            result_summaCell.value = worker.result_summa
            const css_array = [fioCell, xisobRaqamCell, accountNumberCell, task_timeCell, summaCell, deductionCell, result_summaCell]
            itogo_summa += worker.summa
            itogo_deduction += worker.deduction_money
            itogo_result += worker.result_summa
            css_array.forEach((item, index) => {
                let horizontal = 'center'
                if (index === 0) horizontal = 'left';
                if (index > 3) horizontal = 'right', item.numFmt = '#,##0.00';
                Object.assign(item, {
                    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } },
                    border: {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    },
                    font: { size: 7, name: 'Times New Roman' },
                    alignment: { vertical: 'middle', horizontal, wrapText: true }
                });
            })
            row_number++
        }
        worksheet.mergeCells(`A${row_number}`, `D${row_number}`)
        const itogoStr = worksheet.getCell(`A${row_number}`)
        itogoStr.value = 'Итого'
        const itogo_summaCell = worksheet.getCell(`E${row_number}`)
        itogo_summaCell.value = itogo_summa
        const itogo_deductionCell = worksheet.getCell(`F${row_number}`)
        itogo_deductionCell.value = itogo_deduction
        const itogo_resultCell = worksheet.getCell(`G${row_number}`)
        itogo_resultCell.value = itogo_result
        css_array.push(itogoStr, itogo_deductionCell, itogo_resultCell, itogo_summaCell)

        css_array.forEach((item, index) => {
            let fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } }
            let border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            }
            let size = 8
            let horizontal = 'center'
            if (index == 0) fill = {}, border = {}, size = 10;
            if (index > 18) horizontal = 'right';
            if (index === 17) horizontal = 'left';
            Object.assign(item, {
                numFmt: '#,##,0.00',
                fill, border,
                font: { size, name: 'Times New Roman', bold: true },
                alignment: { vertical: 'middle', horizontal, wrapText: true }
            });
        })
        worksheet.getRow(1).height = 35;
        worksheet.getColumn(1).width = 20;
        worksheet.getColumn(2).width = 20;
        worksheet.getColumn(3).width = 20;
        worksheet.getColumn(4).width = 6;
        worksheet.getColumn(5).width = 12;
        worksheet.getColumn(6).width = 11;
        worksheet.getColumn(7).width = 11;
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
        const user_id = req.user.id
        const { from, to, account_number_id, batalon_id } = validationResponse(rasxodQueryValidation, req.query)
        await getByIdaccount_numberService(user_id, account_number_id, null, req.i18n)
        if (batalon_id) {
            await getByIdBatalonService(user_id, batalon_id, true, null, req.i18n)
        }
        const data = await getRasxodService(user_id, account_number_id, from, to, null, null, batalon_id)
        resFunc(res, 200, data)
    } catch (error) {
        errorCatch(error, res)
    }
}

module.exports = {
    getPaymentRequest,
    createRasxod,
    getRasxod,
    getByIdRasxod,
    deeleteRasxod,
    updateRasxod,
    exportExcelData,
    exportRasxodByIdExcelData,
    forPdfData
}