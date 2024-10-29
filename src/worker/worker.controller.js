const {
    workerCreateService,
    getworkerService,
    getByIdworkerService,
    workerUpdateService,
    deleteworkerService,
    getByAcountNumberWorkerService,
    excelDataWorkerService,
    excelDataCreateWorkerService
} = require("./worker.service");
const { workerValidation, workerQueryValidation, workerExcelValidation } = require("../utils/validation");
const { getByIdBatalonService } = require('../batalon/batalon.service')
const { resFunc } = require("../utils/resFunc");
const { validationResponse } = require("../utils/response.validation");
const { errorCatch } = require('../utils/errorCatch')
const ExcelJS = require('exceljs')
const path = require('path')
const ErrorResponse = require('../utils/errorResponse')
const xlsx = require('xlsx')
const { getByNameBatalonService } = require('../batalon/batalon.service')

const workerCreate = async (req, res) => {
    try {
        const user_id = req.user.id
        const { fio, batalon_id, account_number } = validationResponse(workerValidation, req.body)
        await getByIdBatalonService(user_id, batalon_id)
        await getByAcountNumberWorkerService(account_number)
        const result = await workerCreateService(fio, batalon_id, account_number)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const workerGet = async (req, res) => {
    try {
        const user_id = req.user.id
        const { page, limit, batalon_id, search } = validationResponse(workerQueryValidation, req.query)
        const offset = (page - 1) * limit
        const { data, total } = await getworkerService(user_id, search, batalon_id, offset, limit)
        const pageCount = Math.ceil(total / limit);
        const meta = {
            pageCount: pageCount,
            count: total,
            currentPage: page,
            nextPage: page >= pageCount ? null : page + 1,
            backPage: page === 1 ? null : page - 1
        }
        resFunc(res, 200, data, meta)
    } catch (error) {
        errorCatch(error, res)
    }
}

const workerGetById = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        const result = await getByIdworkerService(user_id, id, true)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const workerUpdate = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        const { fio, account_number, batalon_id } = validationResponse(workerValidation, req.body)
        const oldDate = await getByIdworkerService(user_id, id)
        if (oldDate.account_number !== account_number) {
            await getByAcountNumberWorkerService(account_number)
        }
        const result = await workerUpdateService(fio, batalon_id, account_number, id)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const workerDelete = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        await getByIdworkerService(user_id, id)
        await deleteworkerService(id)
        resFunc(res, 200, 'delete success true')
    } catch (error) {
        errorCatch(error, res)
    }
}


const excelDataWorker = async (req, res) => {
    try {
        const user_id = req.user.id;
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Askarlar');

        worksheet.columns = [
            { header: 'Batalon', key: 'batalon_name', width: 20 },
            { header: 'FIO', key: 'fio', width: 50 },
            { header: 'Karta_raqam', key: 'account_number', width: 30 }
        ];

        const headerRow = worksheet.getRow(1);
        headerRow.font = { bold: true };
        headerRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFFFFF' }
        };
        headerRow.alignment = { horizontal: 'center' };
        headerRow.height = 30;
        headerRow.eachCell((cell) => {
            cell.border = {
                top: { style: 'thin', color: { argb: 'FF000000' } },
                left: { style: 'thin', color: { argb: 'FF000000' } },
                bottom: { style: 'thin', color: { argb: 'FF000000' } },
                right: { style: 'thin', color: { argb: 'FF000000' } }
            };
        });

        for (let col = 1; col <= 3; col++) {
            worksheet.getColumn(col).alignment = { vertical: 'middle', horizontal: 'center' };
        }

        const { data, total } = await excelDataWorkerService(user_id);
        for (let worker of data) {
            worksheet.addRow({
                batalon_name: worker.batalon_name,
                fio: worker.fio,
                account_number: worker.account_number
            });
        }

        const totalRow = worksheet.addRow(['Barcha xodimlar Soni', `${total}`]);
        totalRow.font = { bold: true };
        totalRow.getCell(1).alignment = { horizontal: 'center' };

        const fileName = `workers.${Date.now()}.xlsx`;
        const filePath = path.join(__dirname, '../../public/exports', fileName);
        await workbook.xlsx.writeFile(filePath);

        return res.download(filePath, (err) => {
            if (err) throw new ErrorResponse(err, err.statusCode);
        });
    } catch (error) {
        errorCatch(error, res);
    }
};


// import excel data 
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
        const newWorkers = []
        for (let worker of data) {
            const { Batalon, Karta_raqam, FIO } = validationResponse(workerExcelValidation, worker)
            const batalon = await getByNameBatalonService(user_id, Batalon, false)
            console.log(batalon)
            await getByAcountNumberWorkerService(Karta_raqam)
            newWorkers.push({batalon_id: batalon.id, account_number: Karta_raqam, fio: FIO})
        }
        const result = await excelDataCreateWorkerService(newWorkers, user_id)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const downloadWorkersTemplate = async (req, res) => {
    try {
        const filePath = path.join(__dirname, '../../src/template/workers.template.xlsx')
        return res.download(filePath);
    } catch (error) {
        console.log('///////')
        errorCatch(error, res)
    }
}


module.exports = {
    workerCreate,
    workerGet,
    workerGetById,
    workerUpdate,
    workerDelete,
    excelDataWorker,
    importExcelData,
    downloadWorkersTemplate
};
