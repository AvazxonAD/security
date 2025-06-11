const { paymentRequestValidation, rasxodFioValidation, rasxodQueryValidation } = require("../utils/validation");
const { resFunc } = require("../utils/resFunc");
const { validationResponse } = require("../utils/response.validation");
const { errorCatch } = require("../utils/errorCatch");
const {
  paymentRequestService,
  createRasxodDocService,
  getRasxodService,
  getByIdRasxodService,
  deeleteRasxodService,
  updateRasxodService,
  getByGroupTasks,
} = require("./rasxod.fio.service");
const { getByIdaccount_numberService } = require("../spravochnik/account.number/account.number.service");
const { getByIdBatalonService } = require("../region/batalon/db");
const { getByIdWorkerTaskService } = require("./rasxod.fio.service");
const { returnStringSumma } = require("../utils/return.summa");
const { getByIddeductionService } = require("../spravochnik/deduction/deduction.service");
const { returnStringDate } = require("../utils/date.functions");
const ExcelJS = require("exceljs");
const path = require("path");

const getPaymentRequest = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { account_number_id, batalon_id, to, from } = validationResponse(paymentRequestValidation, req.query);

    await getByIdaccount_numberService(user_id, account_number_id, null, req.i18n);

    await getByIdBatalonService(user_id, batalon_id, false, true, req.i18n);
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
      summa,
    };

    return res.success(req.i18n.t("getSuccess"), 200, meta, data);
  } catch (error) {
    errorCatch(error, res);
  }
};

const createRasxod = async (req, res) => {
  try {
    const user_id = req.user.id;
    const from = req.query.from;
    const to = req.query.to;
    const account_number_id = req.query.account_number_id;
    const { batalon_account_number_id, batalon_gazna_number_id } = req.body;

    const { error, value: data } = rasxodFioValidation.validate({
      ...req.body,
      from,
      to,
    });

    if (error) {
      return res.error(req.i18n.t("validationError"), 400);
    }

    await getByIdaccount_numberService(user_id, account_number_id, null, req.i18n);

    const batalon = await getByIdBatalonService(user_id, data.batalon_id, false, true, req.i18n);

    if (batalon_account_number_id) {
      const check = batalon.account_numbers.find((item) => item.id === batalon_account_number_id);
      if (!check) {
        return res.error(req.i18n.t("accountNumberNotFound"), 404);
      }
    }

    if (batalon_gazna_number_id) {
      const check = batalon.gazna_numbers.find((item) => item.id === batalon_gazna_number_id);
      if (!check) {
        return res.error(req.i18n.t("gaznaNumberNotFound"), 404);
      }
    }

    data.deductions = await Promise.all(
      data.deductions.map(async (item) => {
        const deduction = await getByIddeductionService(user_id, item.deduction_id, null, req.i18n);
        return deduction;
      })
    );

    for (let task of data.worker_tasks) {
      await getByIdWorkerTaskService(data.batalon_id, task.worker_task_id, user_id, req.i18n);
    }

    const result = await createRasxodDocService({
      ...data,
      user_id,
      account_number_id,
      from,
      to,
    });

    return res.success(req.i18n.t("createSuccess"), 201, null, result);
  } catch (error) {
    errorCatch(error, res);
  }
};

const getRasxod = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { from, to, account_number_id, page, limit, batalon_id } = validationResponse(rasxodQueryValidation, req.query);
    await getByIdaccount_numberService(user_id, account_number_id, null, req.i18n);
    if (batalon_id) {
      await getByIdBatalonService(user_id, batalon_id, false, null, req.i18n);
    }
    const offset = (page - 1) * limit;
    const result = await getRasxodService(user_id, account_number_id, from, to, offset, limit, batalon_id);

    for (let doc of result.data) {
      doc.summa = Math.round(doc.summa * 100) / 100;
    }

    const pageCount = Math.ceil(result.total / limit);

    const meta = {
      pageCount: pageCount,
      count: result.total,
      currentPage: page,
      nextPage: page >= pageCount ? null : page + 1,
      backPage: page === 1 ? null : page - 1,
      summa: returnStringSumma(Math.round(result.summa * 100) / 100),
      summa_75: returnStringSumma(Math.round(result.summa_75 * 100) / 100),
      summa_25: returnStringSumma(Math.round(result.summa_25 * 100) / 100),
      summa_1_25: returnStringSumma(Math.round(result.summa_1_25 * 100) / 100),
      summa_25_2: returnStringSumma(Math.round(result.summa_25_2 * 100) / 100),
      summa_12: returnStringSumma(Math.round(result.summa_12 * 100) / 100),
      worker_summa: returnStringSumma(Math.round(result.worker_summa * 100) / 100),
    };

    return res.success(req.i18n.t("getSuccess"), 200, meta, result.data);
  } catch (error) {
    errorCatch(error, res);
  }
};

const getByIdRasxod = async (req, res) => {
  try {
    const user_id = req.user.id;
    const account_number_id = req.query.account_number_id;
    await getByIdaccount_numberService(user_id, account_number_id, null, req.i18n);
    const id = req.params.id;
    const data = await getByIdRasxodService(user_id, account_number_id, id, true, req.i18n);

    return res.success(req.i18n.t("getSuccess"), 200, null, data);
  } catch (error) {
    errorCatch(error, res);
  }
};

const deeleteRasxod = async (req, res) => {
  try {
    const user_id = req.user.id;
    const account_number_id = req.query.account_number_id;
    const id = req.params.id;
    await getByIdRasxodService(user_id, account_number_id, id, null, req.i18n);

    await deeleteRasxodService(id);

    return res.success(req.i18n.t("deleteSuccess"), 200);
  } catch (error) {
    errorCatch(error, res);
  }
};

const updateRasxod = async (req, res) => {
  try {
    const user_id = req.user.id;
    const account_number_id = req.query.account_number_id;
    const id = req.params.id;
    const from = req.query.from;
    const to = req.query.to;
    const oldData = await getByIdRasxodService(user_id, account_number_id, id, null, req.i18n);

    const { error, value: data } = rasxodFioValidation.validate({
      ...req.body,
      from,
      to,
    });
    if (error) {
      return res.error(req.i18n.t("validationError"), 400);
    }

    await getByIdaccount_numberService(user_id, account_number_id, null, req.i18n);
    await getByIdBatalonService(user_id, data.batalon_id, false, true, req.i18n);
    for (let task of data.worker_tasks) {
      const test = oldData.worker_tasks.find((item) => item.task_id === task.task_id);
      if (!test || oldData.batalon_id !== data.batalon_id) {
        await getByIdWorkerTaskService(data.batalon_id, task.task_id, user_id, req.i18n);
      }
    }
    data.deductions = await Promise.all(
      data.deductions.map(async (item) => {
        const deduction = await getByIddeductionService(user_id, item.deduction_id, null, req.i18n);
        return deduction;
      })
    );

    const result = await updateRasxodService({ ...data, id, from, to });

    return res.success(req.i18n.t("getSuccess"), 200, null, result);
  } catch (error) {
    errorCatch(error, res);
  }
};

const exportExcelData = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { from, to, account_number_id, batalon_id } = validationResponse(rasxodQueryValidation, req.query);
    await getByIdaccount_numberService(user_id, account_number_id, null, req.i18n);
    if (batalon_id) {
      await getByIdBatalonService(user_id, batalon_id, true, null, req.i18n);
    }
    const { total, data, summa_from, summa_to } = await getRasxodService(user_id, account_number_id, from, to, null, null, batalon_id);
    const workbook = new ExcelJS.Workbook();
    const file_name = `rasxod_batalon_${new Date().getTime()}.xlsx`;
    const worksheet = workbook.addWorksheet(`rasxod_docs_${total}`);
    worksheet.pageSetup.margins.left = 0.5;
    worksheet.pageSetup.margins.header = 0.5;
    worksheet.pageSetup.margins.footer = 0.5;
    worksheet.pageSetup.margins.right = 0.5;
    worksheet.mergeCells(`A1`, "F1");
    worksheet.mergeCells(`A2`, "F2");
    worksheet.mergeCells(`A3`, "F3");
    const titleCell = worksheet.getCell("A1");
    const summa_fromCell = worksheet.getCell("A2");
    const periodCell = worksheet.getCell("A3");
    const doc_numCell = worksheet.getCell("A4");
    const doc_dateCell = worksheet.getCell("B4");
    const clientCell = worksheet.getCell("C4");
    const innCell = worksheet.getCell("D4");
    const rasxod_sumCell = worksheet.getCell("E4");
    const commentCell = worksheet.getCell("F4");
    titleCell.value = `Батальонлар учун қилинган чиқимлар`;
    periodCell.value = `${returnStringDate(new Date(from))} дан ${returnStringDate(new Date(to))} гача бўлган чиқимлар`;
    summa_fromCell.value = `${returnStringDate(new Date(from))} гача бўлган чиқимлар жами : ${returnStringSumma(summa_from)}`;
    doc_numCell.value = "Ҳужжат рақами";
    doc_dateCell.value = `Ҳужжат санаси`;
    clientCell.value = `Батальон  номи`;
    innCell.value = `Батальон инн`;
    rasxod_sumCell.value = `Тўланган пул маблағи`;
    commentCell.value = `Тавсиф`;
    let row_number = 5;
    for (let rasxod of data) {
      const doc_numCell = worksheet.getCell(`A${row_number}`);
      const doc_dateCell = worksheet.getCell(`B${row_number}`);
      const clientCell = worksheet.getCell(`C${row_number}`);
      const innCell = worksheet.getCell(`D${row_number}`);
      const rasxod_sumCell = worksheet.getCell(`E${row_number}`);
      const commentCell = worksheet.getCell(`F${row_number}`);
      doc_numCell.value = rasxod.doc_num;
      doc_dateCell.value = returnStringDate(new Date(rasxod.doc_date));
      clientCell.value = rasxod.batalon_name;
      innCell.value = rasxod.batalon_str;
      rasxod_sumCell.value = rasxod.summa;
      commentCell.value = rasxod.opisanie;
      const css_array = [doc_dateCell, doc_numCell, clientCell, innCell, commentCell, rasxod_sumCell];
      css_array.forEach((element, index) => {
        let horizontal = "center";
        let bold = true;
        let size = 8;
        if (index === 4) horizontal = "left";
        if (index === 5) horizontal = "right";
        Object.assign(element, {
          numFmt: "#,##0.00",
          font: { size, name: "Times New Roman", bold },
          alignment: { vertical: "middle", horizontal, wrapText: true },
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
      row_number++;
    }
    worksheet.mergeCells(`A${row_number}`, `D${row_number}`);
    worksheet.mergeCells(`A${row_number + 1}`, `F${row_number + 1}`);
    const itogo_stringCell = worksheet.getCell(`A${row_number}`);
    const itogoCell = worksheet.getCell(`E${row_number}`);
    const summa_toCell = worksheet.getCell(`A${row_number + 1}`);
    itogo_stringCell.value = `${returnStringDate(new Date(from))} дан ${returnStringDate(new Date(to))}-гача бўлган  итого :`;
    itogoCell.value = summa_to;
    summa_toCell.value = `${returnStringDate(new Date(to))} гача бўлган чиқимлар жами : ${returnStringSumma(summa_to)}`;
    const css_array = [
      titleCell,
      summa_fromCell,
      periodCell,
      doc_dateCell,
      doc_numCell,
      clientCell,
      innCell,
      commentCell,
      rasxod_sumCell,
      itogo_stringCell,
      itogoCell,
      summa_toCell,
    ];
    css_array.forEach((element, index) => {
      let horizontal = "center";
      let bold = true;
      let size = 10;
      let fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFFFF" },
      };
      let border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      if (index === 1 || index === 2 || index === 9 || index === 11) horizontal = "left";
      if (index === 10) (size = 8), (horizontal = "right");
      // if (
      //   index === 9 ||
      //   index === 10 ||
      //   index === 0 ||
      //   index === 1 ||
      //   index === 2 ||
      //   index === 11
      // )
      //   (fill = {}), (border = {});
      Object.assign(element, {
        numFmt: "#,#00.00",
        font: { size, name: "Times New Roman", bold },
        alignment: { vertical: "middle", horizontal, wrapText: true },
        fill,
        border,
      });
    });
    worksheet.getRow(1).height = 50;
    worksheet.getRow(2).height = 35;
    worksheet.getRow(3).height = 30;
    worksheet.getColumn(1).width = 10;
    worksheet.getColumn(2).width = 13;
    worksheet.getColumn(3).width = 15;
    worksheet.getColumn(4).width = 20;
    worksheet.getColumn(5).width = 15;
    worksheet.getColumn(6).width = 15;
    worksheet.getColumn(7).width = 13;
    worksheet.getRow(itogoCell.row).height = 30;
    worksheet.getRow(summa_toCell.row).height = 30;
    const filePath = path.join(__dirname, "../../public/exports/" + file_name);
    await workbook.xlsx.writeFile(filePath);
    return res.download(filePath, (err) => {
      if (err) {
        throw new ErrorResponse(err, err.statusCode);
      }
    });
  } catch (error) {
    errorCatch(error, res);
  }
};

const exportRasxodByIdExcelData = async (req, res) => {
  try {
    const user_id = req.user.id;
    const account_number_id = req.query.account_number_id;
    const id = req.params.id;

    await getByIdaccount_numberService(user_id, account_number_id, null, req.i18n);

    const data = await getByIdRasxodService(user_id, account_number_id, id, null, req.i18n);

    const tasks = await getByGroupTasks([id]);

    const workbook = new ExcelJS.Workbook();
    const file_name = `rasxod_fio_${new Date().getTime()}.xlsx`;
    const worksheet = workbook.addWorksheet(`rasxod FIO`);

    worksheet.mergeCells(`A1`, `I1`);
    worksheet.getCell(`A1`).value = `ТАРҚАТУВ ВЕДМОСТИ ${data.doc_num}-№`;

    worksheet.getCell(`J1`).value = data.batalon_name;

    worksheet.mergeCells(`A2`, `J2`);
    worksheet.getCell(
      `A2`
    ).value = `Ўзбекистон Республикаси Миллий гвардияси Тошкент шаҳри бўйича бошқармаси  Оммавий тадбирларни ўтказишда фуқоролар хавфсизлигини таъминлашда иштирок этган харбий хизматчиларнинг мукофотлаш тўғрисида`;

    worksheet.getRow(3).values = [
      "№",
      "Фамилия ва исми шарифи",
      "Премия (100%)",
      "Моддий базани ривожлантириш учун (75%)",
      "I ва II гурух харажатлари учун (25%)",
      "Шахсий таркибга таксимланди",
      "Ягона ижтимоий солик (25%)",
      "Даромад солиғи (12%)",
      "Банк пластик картасига ўтказиб берилди",
      "Имзо",
    ];

    worksheet.columns = [
      {
        key: "order",
        widt: 10,
      },
      {
        key: "fio",
        width: 50,
      },
      {
        key: "summa",
        width: 20,
      },
      {
        key: "75",
        width: 25,
      },
      {
        key: "25",
        width: 25,
      },
      {
        key: "1/25",
        width: 25,
      },
      {
        key: "25/2",
        width: 25,
      },
      {
        key: "12",
        width: 25,
      },
      {
        key: "worker_summa",
        width: 25,
      },
      {
        key: "podpis",
        width: 20,
      },
    ];

    const total = {
      order: "Итого",
      fio: "",
      summa: 0,
      75: 0,
      25: 0,
      "1/25": 0,
      "25/2": 0,
      12: 0,
      worker_summa: 0,
      podpis: "",
    };

    let row_number = 4;

    tasks.forEach((task, index) => {
      const row = {
        order: index + 1,
        fio: task.fio,
        summa: Math.round(task.summa),
        75: Math.round(task.summa * 0.75),
        25: Math.round(task.summa * 0.25),
        "1/25": Math.round((task.summa * 0.25) / 1.25),
        "25/2": Math.round(((task.summa * 0.25) / 1.25) * 0.25),
        12: Math.round(((task.summa * 0.25) / 1.25) * 0.12),
        worker_summa: Math.round((task.summa * 0.25) / 1.25 - ((task.summa * 0.25) / 1.25) * 0.12),
        podpis: "",
      };

      worksheet.addRow(row);
      row_number++;

      total.summa += row.summa;
      total[75] += row[75];
      total[25] += row[25];
      total["1/25"] += row["1/25"];
      total["25/2"] += row["25/2"];
      total[12] += row[12];
      total.worker_summa += row.worker_summa;
    });

    worksheet.addRow(total);

    //css
    worksheet.eachRow((row, rowNumber) => {
      let bold = false;
      let size = 14;
      let horizontal = "center";

      if (rowNumber === 1) {
        worksheet.getRow(rowNumber).height = 20;
        bold = true;
      } else if (rowNumber === 2) {
        worksheet.getRow(rowNumber).height = 60;
        bold = true;
      } else if (rowNumber === 3) {
        bold = true;
      } else {
        size = 11;
        worksheet.getRow(rowNumber).height = 30;
      }

      if (rowNumber === row_number) {
        bold = true;
      }

      row.eachCell((cell, column) => {
        if (column > 2 && rowNumber > 3) {
          horizontal = "right";
        }

        if (column === 2 && rowNumber > 3) {
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

    const filePath = path.join(__dirname, "../../public/exports/" + file_name);

    await workbook.xlsx.writeFile(filePath);

    return res.download(filePath, (err) => {
      if (err) {
        throw new ErrorResponse(err, err.statusCode);
      }
    });
  } catch (error) {
    errorCatch(error, res);
  }
};

const exportRasxodByIdExcelData2 = async (req, res) => {
  try {
    const user_id = req.user.id;
    const account_number_id = req.query.account_number_id;
    const id = req.params.id;

    await getByIdaccount_numberService(user_id, account_number_id, null, req.i18n);

    const data = await getByIdRasxodService(user_id, account_number_id, id, null, req.i18n);

    const tasks = await getByGroupTasks([id]);

    const workbook = new ExcelJS.Workbook();
    const file_name = `rasxod_fio_${new Date().getTime()}.xlsx`;
    const worksheet = workbook.addWorksheet(`rasxod FIO`);

    worksheet.mergeCells(`A1`, `I1`);
    worksheet.getCell(`A1`).value = `ТАРҚАТУВ ВЕДМОСТИ ${data.doc_num}-№`;

    worksheet.getCell(`J1`).value = data.batalon_name;

    worksheet.mergeCells(`A2`, `J2`);
    worksheet.getCell(
      `A2`
    ).value = `Ўзбекистон Республикаси Миллий гвардияси Тошкент шаҳри бўйича бошқармаси  Оммавий тадбирларни ўтказишда фуқоролар хавфсизлигини таъминлашда иштирок этган харбий хизматчиларнинг мукофотлаш тўғрисида`;

    worksheet.getRow(3).values = [
      "№",
      "Фамилия ва исми шарифи",
      "Хисоб рақам",
      "Карта рақам",
      "Банк пластик картасига ўтказиб берилди",
      "Имзо",
    ];

    worksheet.columns = [
      {
        key: "order",
        widt: 10,
      },
      {
        key: "fio",
        width: 50,
      },
      {
        key: "xisob_raqam",
        width: 30,
      },
      {
        key: "karta_raqam",
        width: 30,
      },
      {
        key: "worker_summa",
        width: 25,
      },
      {
        key: "podpis",
        width: 20,
      },
    ];

    const total = {
      order: "Итого",
      fio: "",
      xisob_raqam: "",
      karta_raqam: "",
      worker_summa: 0,
      podpis: "",
    };

    let row_number = 4;

    tasks.forEach((task, index) => {
      const row = {
        order: index + 1,
        fio: task.fio,
        xisob_raqam: task.xisob_raqam,
        karta_raqam: task.account_number,
        worker_summa: Math.round((task.summa * 0.25) / 1.25 - ((task.summa * 0.25) / 1.25) * 0.12),
        podpis: "",
      };

      worksheet.addRow(row);
      row_number++;

      total.worker_summa += row.worker_summa;
    });

    worksheet.addRow(total);

    //css
    worksheet.eachRow((row, rowNumber) => {
      let bold = false;
      let size = 14;
      let horizontal = "center";

      if (rowNumber === 1) {
        worksheet.getRow(rowNumber).height = 20;
        bold = true;
      } else if (rowNumber === 2) {
        worksheet.getRow(rowNumber).height = 60;
        bold = true;
      } else if (rowNumber === 3) {
        bold = true;
      } else {
        size = 11;
        worksheet.getRow(rowNumber).height = 30;
      }

      if (rowNumber === row_number) {
        bold = true;
      }

      row.eachCell((cell, column) => {
        if (column > 2 && rowNumber > 3) {
          horizontal = "right";
        }

        if (column === 2 && rowNumber > 3) {
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

    const filePath = path.join(__dirname, "../../public/exports/" + file_name);

    await workbook.xlsx.writeFile(filePath);

    return res.download(filePath, (err) => {
      if (err) {
        throw new ErrorResponse(err, err.statusCode);
      }
    });
  } catch (error) {
    errorCatch(error, res);
  }
};

const forPdfData = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { from, to, account_number_id, batalon_id } = validationResponse(rasxodQueryValidation, req.query);
    await getByIdaccount_numberService(user_id, account_number_id, null, req.i18n);
    if (batalon_id) {
      await getByIdBatalonService(user_id, batalon_id, true, null, req.i18n);
    }
    const data = await getRasxodService(user_id, account_number_id, from, to, null, null, batalon_id);

    return res.success(req.i18n.t("getSuccess"), 200, null, data);
  } catch (error) {
    errorCatch(error, res);
  }
};

module.exports = {
  getPaymentRequest,
  createRasxod,
  getRasxod,
  getByIdRasxod,
  deeleteRasxod,
  updateRasxod,
  exportExcelData,
  exportRasxodByIdExcelData,
  exportRasxodByIdExcelData2,
  forPdfData,
};
