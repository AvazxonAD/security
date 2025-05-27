const { BatalonTaskDB } = require(`./db`);
const ExcelJS = require("exceljs");
const fs = require("fs/promises");
const path = require("path");

exports.BatalonTasksService = class {
  static async getExcel(data) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`${data.task.contract_number}`);

    worksheet.columns = [
      { header: "№", key: "order", width: 10 },
      { header: "F.I.O", key: "fio", width: 40 },
      { header: "Topshiriq vaqti", key: "task_time", width: 30 },
      { header: "Foydalanuvchi", key: "user", width: 40 },
    ];

    data.workers.forEach((worker, index) => {
      worksheet.addRow({
        order: index + 1,
        fio: worker.fio,
        task_time: worker.task_time,
        user: worker.user,
      });
    });

    worksheet.addRow({
      order: `Jami:`,
      fio: data.workers.length,
      task_time: data.workers.reduce(
        (acc, worker) => acc + worker.task_time,
        0
      ),
    });

    // css
    worksheet.getRow(1).height = 40;

    worksheet.eachRow((row, row_number) => {
      let bold = false;
      let size = 10;
      let horizontal = "center";
      let vertical = "middle";
      let argb = "FFFFFFFF";

      if (row_number === 1) {
        argb = "FFCCFFCC";
      }

      if (row_number === 1 || row_number === worksheet.rowCount) {
        bold = true;
      }

      if (row_number !== 1) {
        worksheet.getRow(row_number).height = 25;
      }

      row.eachCell((cell, column) => {
        Object.assign(cell, {
          font: { size, name: "Times New Roman", bold },
          alignment: {
            vertical,
            horizontal,
            wrapText: true,
          },
          fill: {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb },
          },
          border: {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          },
        });
      });
    });

    const folder_path = path.join(__dirname, "../../../public/exports");

    try {
      await fs.access(folder_path, fs.constants.W_OK);
    } catch (error) {
      await fs.mkdir(folder_path);
    }

    const fileName = `${
      data.task.contract_number
    }_${new Date().getTime()}.xlsx`;

    const filePath = `${folder_path}/${fileName}`;

    await workbook.xlsx.writeFile(filePath);

    return { fileName, filePath };
  }

  static now = new Date();

  static async get(data) {
    const result = await BatalonTaskDB.get(
      [data.batalon_id, data.from, data.to, data.offset, data.limit, this.now],
      data
    );

    return result;
  }

  static async getById(data) {
    const result = await BatalonTaskDB.getById([data.id]);

    return result;
  }
};
