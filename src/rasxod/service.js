const { returnStringDate } = require("../utils/date.functions");
const ExcelJs = require("exceljs");
const fs = require("fs").promises;
const path = require("path");

exports.RasxodService = class {
  static async getByBatalonReportExcel(data) {
    const itogo = {
      summa: 0,
      worker_number: 0,
      task_time: 0,
      task: {
        summa: 0,
        worker_number: 0,
      },
    };

    for (let item of data.contracts) {
      itogo.summa += item.summa;
      itogo.worker_number += item.worker_number;
      itogo.task_time += item.task_time;
      itogo.task.summa += item.task.summa;
      itogo.task.worker_number += item.task.worker_number;
    }

    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet("contract");

    worksheet.mergeCells(`A1`, "J1");
    worksheet.getCell(`A1`).value = `${returnStringDate(
      new Date(data.from)
    )} dan ${returnStringDate(
      new Date(data.to)
    )} gacha tuzilgan shartnomalar boyicha malumot`;

    worksheet.mergeCells(`A2`, "A3");
    worksheet.getCell(`A2`).value = "№";

    worksheet.mergeCells(`B2`, "B3");
    worksheet.getCell(`B2`).value = "Tashkilot nomi";

    worksheet.mergeCells(`C2`, "E2");
    worksheet.getCell(`C2`).value = "Shartnoma";
    worksheet.getCell(`C3`).value = "raqami";
    worksheet.getCell(`D3`).value = "sanasi";
    worksheet.getCell(`E3`).value = "umumiy summasi";

    worksheet.mergeCells(`F2`, "F3");
    worksheet.getCell(`F2`).value = "Umumiy jalb qilingan shaxsiy tarkib soni";

    worksheet.mergeCells(`G2`, "G3");
    worksheet.getCell(`G2`).value = "Tadbir umumiy vaqti (soat)";

    worksheet.mergeCells(`H2`, "H3");
    worksheet.getCell(`H2`).value = "Tadbir otkizilgan sana";

    worksheet.mergeCells(`I2`, "J2");
    worksheet.getCell(`I2`).value = `${data.batalon.name} harbiy qisim`;
    worksheet.getCell(`I3`).value = `soni`;
    worksheet.getCell(`J3`).value = `summasi`;
    worksheet.getRow(4).values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    worksheet.columns = [
      { key: "order", width: 5 },
      { key: "client", width: 50 },
      { key: "number", width: 15 },
      { key: "date", width: 20 },
      { key: "summa", width: 25 },
      { key: "worker_number", width: 25 },
      { key: "task_time", width: 20 },
      { key: "event_date", width: 30 },
      { key: "batalon_worker_number", width: 15 },
      { key: "batalon_summa", width: 25 },
    ];

    data.contracts.forEach((contract, index) => {
      const event_date =
        contract.start_date === contract.end_date
          ? returnStringDate(new Date(contract.start_date))
          : `${returnStringDate(
              new Date(contract.start_date)
            )} дан  ${returnStringDate(new Date(contract.end_date))} гача`;
      worksheet.addRow({
        order: index + 1,
        client: contract.organization_name,
        number: contract.doc_num,
        date: contract.doc_date,
        summa: contract.result_summa,
        worker_number: contract.worker_number,
        task_time: contract.task_time,
        event_date: event_date,
        batalon_worker_number: contract.task.worker_number,
        batalon_summa: contract.task.summa,
      });
    });

    worksheet.addRow({
      summa: itogo.summa,
      worker_number: itogo.worker_number,
      task_time: itogo.task_time,
      batalon_worker_number: itogo.task.worker_number,
      batalon_summa: itogo.task.summa,
    });

    // template
    worksheet.eachRow((row, row_number) => {
      let bold = false;
      let size = 10;
      let horizontal = "center";
      let numFmt = "# ##0 ##0.00";
      let argb = "FFFFFFFF";

      if (row_number < 5 || row_number === worksheet.rowCount) {
        bold = true;
        size = 12;
      }

      if (row_number === 1) {
        worksheet.getRow(row_number).height = 40;
      }

      if (row_number === 4) {
        argb = "FF90EE90";
      }

      row.eachCell((cell, column) => {
        if ((column === 5 || column === 10) && row_number > 4) {
          horizontal = "right";
          cell.numFmt = numFmt;
        } else if ((column === 8 || column === 2) && row_number > 4) {
          horizontal = "left";
        } else {
          horizontal = "center";
          cell.numFmt = "";
        }

        Object.assign(cell, {
          font: { size, name: "Times New Roman", bold },
          alignment: {
            vertical: "middle",
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

    const file_name = `rasxod_${new Date().getTime()}.xlsx`;
    const folder_path = path.join(__dirname, "../../public/exports");
    const file_path = `${folder_path}/${file_name}`;

    try {
      await fs.access(folder_path);
    } catch (error) {
      await fs.mkdir(folder_path, { recursive: true });
    }

    await workbook.xlsx.writeFile(file_path);

    return { file_name, file_path };
  }
};
