const { WorkerDB } = require('./db');
const { access, constants, mkdir } = require('fs').promises;
const xlsx = require('xlsx');
const ExcelJS = require('exceljs');
const path = require('path');

exports.WorkerService = class {
    static async workerCreate(data) {
        await WorkerDB.workerCreate([data.fio, data.batalon_id, data.account_number, data.xisob_raqam, data.user_id])
    }

    static async workerUpdate(data) {
        await WorkerDB.workerUpdate([data.fio, data.batalon_id, data.account_number, data.xisob_raqam, data.id]);
    }

    static async workerGet(data) {
        const result = await WorkerDB.workerGet([data.user_id, data.offset, data.limit], data.search, data.batalon_id);
        return result;
    }

    static async getById(data) {
        const result = await WorkerDB.getById([data.user_id, data.id], data.isdeleted);
        return result;
    }

    static async workerDelete(data) {
        await WorkerDB.workerDelete([data.id]);
    }

    static async workerGetByAccountNumber(data) {
        const result = await WorkerDB.workerGetByAccountNumber([data.account_number, data.user_id]);
        return result;
    }

    static async workerGetByXisobRaqam(data) {
        const result = await WorkerDB.workerGetByXisobRaqam([data.xisob_raqam, data.user_id]);
        return result;
    }

    static async workerGetByFio(data) {
        const result = await WorkerDB.workerGetByFio([data.fio, data.user_id]);
        return result;
    }

    static async exportExcel(data) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Askarlar');

        worksheet.columns = [
            { header: 'Batalon', key: 'batalon_name', width: 20 },
            { header: 'FIO', key: 'fio', width: 50 },
            { header: 'Karta_raqam', key: 'account_number', width: 30 },
            { header: 'Xisob_raqam', key: 'xisob_raqam', width: 30 },
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

        for (let worker of data.data) {
            worksheet.addRow({
                batalon_name: worker.batalon_name,
                fio: worker.fio,
                account_number: worker.account_number,
                xisob_raqam: worker.xisob_raqam
            });
        }

        const totalRow = worksheet.addRow(['Barcha xodimlar Soni', `${data.total}`]);
        totalRow.font = { bold: true };
        totalRow.getCell(1).alignment = { horizontal: 'center' };

        const fileName = `workers_${Date.now()}.xlsx`;
        const folderPath = path.join(__dirname, '../../public/exports');

        try {
            await access(folderPath, constants.W_OK);
        } catch (error) {
            await mkdir(folderPath);
        }

        const filePath = `${folderPath}/${fileName}`;

        await workbook.xlsx.writeFile(filePath);

        return { filePath, fileName };
    }

    static async readFile(data) {
        const workbook = xlsx.readFile(data.filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const result = xlsx.utils.sheet_to_json(sheet).map(row => {
            const newRow = {};
            const requiredKeys = ["FIO", "Karta_raqam", "Xisob_raqam", "Batalon"];

            requiredKeys.forEach(key => {
                if (row[key] !== undefined && row[key] !== null) {
                    newRow[key] = String(row[key]).trim();
                } else {
                    newRow[key] = null;
                }
            });

            return newRow;
        });

        return result;
    }

}
