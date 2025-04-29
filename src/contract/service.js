const { returnStringDate } = require("../utils/date.functions");
const { ContractDB } = require("./db");
const ExcelJs = require(`exceljs`);
const path = require(`path`);
const fs = require(`fs`).promises;

exports.ContractService = class {
  static async checkDoc(data) {
    const result = await ContractDB.checkDoc([data.id]);

    return result;
  }

  static async getByBatalonReport(data) {
    const result = await ContractDB.getByBatalonReport(
      [data.user_id, data.account_number_id, data.from, data.to],
      data.batalon_id
    );

    return result;
  }

  static async getByBatalonReportExcel(data) {
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

    worksheet.eachRow((row, row_number) => {
      let bold = false;
      let size = 14;
      let horizontal = "center";

      if (row_number === 1) {
        worksheet.getRow(row_number).height = 20;
        bold = true;
      } else if (row_number === 2) {
        worksheet.getRow(row_number).height = 60;
        bold = true;
      } else if (row_number === 3) {
        bold = true;
      } else {
        size = 11;
        worksheet.getRow(row_number).height = 30;
      }

      if (row_number === row_number) {
        bold = true;
      }

      row.eachCell((cell, column) => {
        if (column > 2 && row_number > 3) {
          horizontal = "right";
        }

        if (column === 2 && row_number > 3) {
          horizontal = "left";
        }

        if (column !== 1) {
          cell.numFmt = "# ##0 ##0.00";
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
            fgColor: { argb: "FFFFFFFF" },
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

    const file_name = `contract_${new Date().getTime()}.xlsx`;
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
