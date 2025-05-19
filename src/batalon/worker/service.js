const { WorkerDB } = require("./db");
const { access, constants, mkdir } = require("fs").promises;
const ExcelJS = require("exceljs");
const path = require("path");

exports.WorkerService = class {
  static async create(data) {
    await WorkerDB.create([
      data.fio,
      data.batalon_id,
      data.account_number,
      data.xisob_raqam,
      data.user_id,
    ]);
  }

  static async update(data) {
    await WorkerDB.update([
      data.fio,
      data.account_number,
      data.xisob_raqam,
      data.id,
    ]);
  }

  static async get(data) {
    const result = await WorkerDB.get(
      [data.batalon_id, data.offset, data.limit],
      data.search
    );
    return result;
  }

  static async getById(data) {
    const result = await WorkerDB.getById(
      [data.batalon_id, data.id],
      data.isdeleted
    );
    return result;
  }

  static async delete(data) {
    await WorkerDB.delete([data.id]);
  }

  static async getByAccountNumber(data) {
    const result = await WorkerDB.getByAccountNumber([
      data.account_number,
      data.user_id,
    ]);
    return result;
  }

  static async getByXisobNumber(data) {
    const result = await WorkerDB.getByXisobNumber([
      data.xisob_raqam,
      data.user_id,
    ]);
    return result;
  }

  static async getByFio(data) {
    const result = await WorkerDB.getByFio([data.fio, data.user_id]);
    return result;
  }

  static async exportExcel(data) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Askarlar");

    worksheet.columns = [
      { header: "Batalon", key: "batalon_name", width: 20 },
      { header: "FIO", key: "fio", width: 50 },
      { header: "Karta_raqam", key: "account_number", width: 30 },
      { header: "Xisob_raqam", key: "xisob_raqam", width: 30 },
    ];

    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" },
    };

    headerRow.alignment = { horizontal: "center" };
    headerRow.height = 30;
    headerRow.eachCell((cell) => {
      cell.border = {
        top: { style: "thin", color: { argb: "FF000000" } },
        left: { style: "thin", color: { argb: "FF000000" } },
        bottom: { style: "thin", color: { argb: "FF000000" } },
        right: { style: "thin", color: { argb: "FF000000" } },
      };
    });

    for (let col = 1; col <= 3; col++) {
      worksheet.getColumn(col).alignment = {
        vertical: "middle",
        horizontal: "center",
      };
    }

    for (let worker of data.data) {
      worksheet.addRow({
        batalon_name: worker.batalon_name,
        fio: worker.fio,
        account_number: worker.account_number,
        xisob_raqam: worker.xisob_raqam,
      });
    }

    const totalRow = worksheet.addRow([
      "Barcha xodimlar Soni",
      `${data.total}`,
    ]);
    totalRow.font = { bold: true };
    totalRow.getCell(1).alignment = { horizontal: "center" };

    const fileName = `workers_${Date.now()}.xlsx`;
    const folderPath = path.join(__dirname, "../../../public/exports");

    try {
      await access(folderPath, constants.W_OK);
    } catch (error) {
      await mkdir(folderPath);
    }

    const filePath = `${folderPath}/${fileName}`;

    await workbook.xlsx.writeFile(filePath);

    return { filePath, fileName };
  }
};
