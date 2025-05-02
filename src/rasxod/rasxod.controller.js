const {
  paymentRequestValidation,
  rasxodValidation,
  rasxodQueryValidation,
} = require("../utils/validation");
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
} = require("./rasxod.service");
const {
  getByIdaccount_numberService,
} = require("../spravochnik/account.number/account.number.service");
const { getByIdBatalonService } = require("../batalon/db");
const { getByIdTaskService } = require("./rasxod.service");
const { returnStringSumma } = require("../utils/return.summa");
const ExcelJS = require("exceljs");
const { returnStringDate } = require("../utils/date.functions");
const path = require("path");
const { RasxodService } = require("./service");

const getPaymentRequest = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { account_number_id, batalon_id, to, from } = validationResponse(
      paymentRequestValidation,
      req.query
    );
    await getByIdaccount_numberService(
      user_id,
      account_number_id,
      null,
      req.i18n
    );
    await getByIdBatalonService(user_id, batalon_id, true, null, req.i18n);
    const { data, itogo } = await paymentRequestService(
      account_number_id,
      batalon_id,
      from,
      to
    );

    return res.success(req.i18n.t("getSuccess"), 200, { itogo }, data);
  } catch (error) {
    errorCatch(error, res);
  }
};

const createRasxod = async (req, res) => {
  try {
    const user_id = req.user.id;
    const account_number_id = req.query.account_number_id;
    const { batalon_account_number_id, batalon_gazna_number_id } = req.body;

    const data = validationResponse(rasxodValidation, req.body);
    data;

    await getByIdaccount_numberService(
      user_id,
      account_number_id,
      null,
      req.i18n
    );

    const batalon = await getByIdBatalonService(
      user_id,
      data.batalon_id,
      true,
      null,
      req.i18n
    );

    if (batalon_account_number_id) {
      const check = batalon.account_numbers.find(
        (item) => item.id === batalon_account_number_id
      );
      if (!check) {
        return res.error(req.i18n.t("accountNumberNotFound"), 404);
      }
    }

    if (batalon_gazna_number_id) {
      const check = batalon.gazna_numbers.find(
        (item) => item.id === batalon_gazna_number_id
      );
      if (!check) {
        return res.error(req.i18n.t("gaznaNumberNotFound"), 404);
      }
    }

    for (let task of data.tasks) {
      await getByIdTaskService(
        data.batalon_id,
        task.task_id,
        user_id,
        req.i18n
      );
    }

    const result = await createRasxodDocService({
      ...data,
      user_id,
      account_number_id,
    });

    return res.success(req.i18n.t("getSuccess"), 200, null, result);
  } catch (error) {
    errorCatch(error, res);
  }
};

const getRasxod = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { from, to, account_number_id, page, limit, batalon_id } =
      validationResponse(rasxodQueryValidation, req.query);
    await getByIdaccount_numberService(
      user_id,
      account_number_id,
      null,
      req.i18n
    );
    if (batalon_id) {
      await getByIdBatalonService(user_id, batalon_id, true, null, req.i18n);
    }
    const offset = (page - 1) * limit;
    const { total, data, summa_from, summa_to, summa } = await getRasxodService(
      user_id,
      account_number_id,
      from,
      to,
      offset,
      limit,
      batalon_id
    );
    const pageCount = Math.ceil(total / limit);
    const meta = {
      pageCount: pageCount,
      count: total,
      currentPage: page,
      nextPage: page >= pageCount ? null : page + 1,
      backPage: page === 1 ? null : page - 1,
      summa_from: returnStringSumma(summa_from),
      summa_to: returnStringSumma(summa_to),
      summa: returnStringSumma(summa),
    };

    return res.success(req.i18n.t("getSuccess"), 200, meta, data);
  } catch (error) {
    errorCatch(error, res);
  }
};

const getByIdRasxod = async (req, res) => {
  try {
    const user_id = req.user.id;
    const account_number_id = req.query.account_number_id;
    await getByIdaccount_numberService(
      user_id,
      account_number_id,
      null,
      req.i18n
    );
    const id = req.params.id;
    const data = await getByIdRasxodService(
      user_id,
      account_number_id,
      id,
      true,
      req.i18n
    );

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
    const { batalon_account_number_id, batalon_gazna_number_id } = req.body;

    const oldData = await getByIdRasxodService(
      user_id,
      account_number_id,
      id,
      null,
      req.i18n
    );

    const data = validationResponse(rasxodValidation, req.body);

    await getByIdaccount_numberService(
      user_id,
      account_number_id,
      null,
      req.i18n
    );

    const batalon = await getByIdBatalonService(
      user_id,
      data.batalon_id,
      true,
      null,
      req.i18n
    );

    if (batalon_account_number_id) {
      const check = batalon.account_numbers.find(
        (item) => item.id === batalon_account_number_id
      );
      if (!check) {
        return res.error(req.i18n.t("accountNumberNotFound"), 404);
      }
    }

    if (batalon_gazna_number_id) {
      const check = batalon.gazna_numbers.find(
        (item) => item.id === batalon_gazna_number_id
      );
      if (!check) {
        return res.error(req.i18n.t("gaznaNumberNotFound"), 404);
      }
    }

    for (let task of data.tasks) {
      const test = oldData.tasks.find((item) => item.task_id === task.task_id);
      if (!test || oldData.batalon_id !== data.batalon_id) {
        await getByIdTaskService(
          data.batalon_id,
          task.task_id,
          user_id,
          req.i18n
        );
      }
    }

    const result = await updateRasxodService({ ...data, id });

    return res.success(req.i18n.t("updateSuccess"), 200, null, result);
  } catch (error) {
    errorCatch(error, res);
  }
};

const exportExcelData = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { from, to, account_number_id, batalon_id } = validationResponse(
      rasxodQueryValidation,
      req.query
    );
    await getByIdaccount_numberService(
      user_id,
      account_number_id,
      null,
      req.i18n
    );

    if (!from || !to) {
      return res.error(req.i18n.t("dateRangeRequired"), 400);
    }

    if (batalon_id) {
      await getByIdBatalonService(user_id, batalon_id, true, null, req.i18n);
    }
    const { total, data, summa_from, summa_to } = await getRasxodService(
      user_id,
      account_number_id,
      from,
      to,
      null,
      null,
      batalon_id
    );
    const workbook = new ExcelJS.Workbook();
    const file_name = `rasxod_birgada_${new Date().getTime()}.xlsx`;
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
    titleCell.value = `Ҳамкор ташкилотлар учун қилинган чиқимлар`;
    periodCell.value = `${returnStringDate(
      new Date(from)
    )} дан ${returnStringDate(new Date(to))} гача бўлган чиқимлар`;
    summa_fromCell.value = `${returnStringDate(
      new Date(from)
    )} гача бўлган чиқимлар жами : ${returnStringSumma(summa_from)}`;
    doc_numCell.value = "Ҳужжат рақами";
    doc_dateCell.value = `Ҳужжат санаси`;
    clientCell.value = `Ҳамкор ташкилот`;
    innCell.value = `Ҳамкор инн`;
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
      const css_array = [
        doc_dateCell,
        doc_numCell,
        clientCell,
        innCell,
        commentCell,
        rasxod_sumCell,
      ];
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
    itogo_stringCell.value = `${returnStringDate(
      new Date(from)
    )} дан ${returnStringDate(new Date(to))}-гача бўлган  итого :`;
    itogoCell.value = summa_to;
    summa_toCell.value = `${returnStringDate(
      new Date(to)
    )} гача бўлган чиқимлар жами : ${returnStringSumma(summa_to)}`;
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
      if (index === 1 || index === 2 || index === 9 || index === 11)
        horizontal = "left";
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
    await workbook.xlsx.writeFile(filePath, {
      useStyles: true,
      useSharedStrings: true,
    });
    return res.download(filePath, (err) => {
      if (err) {
        throw new ErrorResponse(err, err.statusCode);
      }
    });
  } catch (error) {
    errorCatch(error, res);
  }
};

const exportRasoxBYId = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { account_number_id, excel } = req.query;
    await getByIdaccount_numberService(
      user_id,
      account_number_id,
      null,
      req.i18n
    );

    const id = req.params.id;

    const data = await getByIdRasxodService(
      user_id,
      account_number_id,
      id,
      true,
      req.i18n
    );

    const batalon = await getByIdBatalonService(
      user_id,
      data.batalon_id,
      true,
      null,
      req.i18n
    );

    if (excel !== "false") {
      const { file_name, file_path } =
        await RasxodService.getByBatalonReportExcel({
          ...data,
          contracts: data.tasks,
          batalon,
          ...req.query,
        });

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${file_name}"`
      );

      return res.sendFile(file_path);
    }

    return res.send(data);
  } catch (error) {
    errorCatch(error, res);
  }
};

const forPdfData = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { from, to, account_number_id, batalon_id } = validationResponse(
      rasxodQueryValidation,
      req.query
    );
    await getByIdaccount_numberService(
      user_id,
      account_number_id,
      null,
      req.i18n
    );
    if (batalon_id) {
      await getByIdBatalonService(user_id, batalon_id, true, null, req.i18n);
    }
    const data = await getRasxodService(
      user_id,
      account_number_id,
      from,
      to,
      null,
      null,
      batalon_id
    );

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
  exportRasoxBYId,
  forPdfData,
};
