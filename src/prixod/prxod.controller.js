const { db } = require("@db/index");
const xlsx = require("xlsx");

const {
  prixodValidation,
  prixodQueryValidation,
} = require("../utils/validation");
const { validationResponse } = require("../utils/response.validation");
const { errorCatch } = require("../utils/errorCatch");
const ErrorResponse = require("../utils/errorResponse");
const { getByIdcontractService } = require("../contract/db");
const {
  getByIdaccount_numberService,
} = require("../spravochnik/account.number/account.number.service");
const ExcelJS = require("exceljs");
const path = require("path");
const { returnStringSumma } = require("../utils/return.summa");
const { returnStringDate } = require("../utils/date.functions");
const {
  prixodCreateService,
  getPrixodService,
  getByIdPrixodService,
  updatePrixodService,
  deletePrixodService,
  PrixodService,
} = require("./service");
const { OrganizationService } = require("@organization/service");

exports.Controler = class {
  static async import(req, res) {
    const user_id = req.user.id;
    const workbook = xlsx.readFile(req.file.path);

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const excel_data = xlsx.utils.sheet_to_json(sheet).map((row, index) => {
      const newRow = {};
      for (const key in row) {
        if (Object.prototype.hasOwnProperty.call(row, key)) {
          newRow[key] = row[key];
        }
      }

      return newRow;
    });

    const not_contracts = [];

    await db.transaction(async (client) => {
      for (let contract of excel_data) {
        const db_data = await client.query(
          `--sql
            SELECT * 
            FROM contract 
            WHERE doc_num = $1
              AND EXTRACT(YEAR FROM doc_date) = EXTRACT(YEAR FROM CURRENT_DATE)
              AND isdeleted = false
              AND user_id = $2
        `,
          [String(contract.doc_num), user_id]
        );

        contract.contract = db_data.rows[0];

        if (!contract.contract) {
          console.log(contract.doc_num, user_id);
          not_contracts.push(contract);
        }

        if (contract.contract && contract.prixod && contract.prixod > 0) {
          await client.query(
            `--sql
              INSERT INTO prixod (
                user_id,
                organization_id,
                contract_id,
                opisanie,
                doc_num,
                doc_date,
                summa,
                account_number_id,
                organ_account_number_id, 
                organ_gazna_number_id
              ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *  
              `,
            [
              contract.contract.user_id,
              contract.contract.organization_id,
              contract.contract.id,
              "",
              contract.contract.doc_num,
              contract.contract.doc_date,
              contract.prixod,
              contract.contract.account_number_id,
              null,
              null,
            ]
          );
        }
      }
    });

    return res.send({ not_contracts, excel_data });
  }
};

exports.prixodCreate = async (req, res) => {
  try {
    const user_id = req.user.id;
    const account_number_id = req.query.account_number_id;
    const { organization_id, organ_account_number_id, organ_gazna_number_id } =
      req.body;

    await getByIdaccount_numberService(
      user_id,
      account_number_id,
      null,
      req.i18n
    );

    const data = validationResponse(prixodValidation, req.body);

    const organization = await OrganizationService.getById({
      user_id,
      id: organization_id,
    });
    if (!organization) {
      return res.error(req.i18n.t("organizationNotFound"), 404);
    }

    if (organ_account_number_id) {
      const check = organization.account_numbers.find(
        (item) => item.id === organ_account_number_id
      );
      if (!check) {
        return res.error(req.i18n.t("accountNumberNotFound"), 404);
      }
    }

    if (organ_gazna_number_id) {
      const check = organization.gazna_numbers.find(
        (item) => item.id === organ_gazna_number_id
      );
      if (!check) {
        return res.error(req.i18n.t("gaznaNumberNotFound"), 404);
      }
    }

    const contract = await getByIdcontractService(
      user_id,
      data.contract_id,
      false,
      account_number_id,
      data.organization_id,
      req.i18n
    );

    // if (contract.remaining_balance < data.summa) {
    //   throw new ErrorResponse(req.i18n.t("prixodSummaError"), 400);
    // }

    const prixod = await prixodCreateService({
      ...data,
      account_number_id,
      user_id,
    });

    return res.success(req.i18n.t("createSuccess"), 201, null, prixod);
  } catch (error) {
    errorCatch(error, res);
  }
};

exports.getByIdPrixod = async (req, res) => {
  try {
    const user_id = req.user.id;
    const id = req.params.id;
    const { account_number_id } = req.query;

    await getByIdaccount_numberService(
      user_id,
      account_number_id,
      null,
      req.i18n
    );
    const data = await getByIdPrixodService(
      user_id,
      id,
      account_number_id,
      true,
      req.i18n
    );
    data.summa = Math.round(data.summa * 100) / 100;

    return res.success(req.i18n.t("getSuccess"), 200, null, data);
  } catch (error) {
    errorCatch(error, res);
  }
};

exports.getPrixod = async (req, res) => {
  try {
    const {
      page,
      limit,
      search,
      from,
      to,
      account_number_id,
      organization_id,
    } = validationResponse(prixodQueryValidation, req.query);

    const user_id = req.user.id;
    await getByIdaccount_numberService(
      user_id,
      account_number_id,
      null,
      req.i18n
    );
    const offset = (page - 1) * limit;
    const { data, total, from_balance, to_balance, summa } =
      await getPrixodService(
        user_id,
        from,
        to,
        offset,
        limit,
        account_number_id,
        search,
        organization_id
      );
    const pageCount = Math.ceil(total / limit);

    const meta = {
      pageCount: pageCount,
      count: total,
      currentPage: page,
      nextPage: page >= pageCount ? null : page + 1,
      backPage: page === 1 ? null : page - 1,
      from_balance: returnStringSumma(from_balance) || 0,
      to_balance: returnStringSumma(to_balance) || 0,
      summa: returnStringSumma(summa) || 0,
    };

    return res.success(req.i18n.t("getSuccess"), 200, meta, data);
  } catch (error) {
    errorCatch(error, res);
  }
};

exports.updatePrixod = async (req, res) => {
  try {
    const user_id = req.user.id;
    const id = req.params.id;
    const account_number_id = req.query.account_number_id;
    const { organization_id, organ_account_number_id, organ_gazna_number_id } =
      req.body;

    const data = validationResponse(prixodValidation, req.body);
    const oldData = await getByIdPrixodService(
      user_id,
      id,
      account_number_id,
      null,
      req.i18n
    );

    await getByIdaccount_numberService(
      user_id,
      account_number_id,
      null,
      req.i18n
    );

    const organization = await OrganizationService.getById({
      user_id,
      id: organization_id,
    });
    if (!organization) {
      return res.error(req.i18n.t("organizationNotFound"), 404);
    }

    if (organ_account_number_id) {
      const check = organization.account_numbers.find(
        (item) => item.id === organ_account_number_id
      );
      if (!check) {
        return res.error(req.i18n.t("accountNumberNotFound"), 404);
      }
    }

    if (organ_gazna_number_id) {
      const check = organization.gazna_numbers.find(
        (item) => item.id === organ_gazna_number_id
      );
      if (!check) {
        return res.error(req.i18n.t("gaznaNumberNotFound"), 404);
      }
    }

    const contract = await getByIdcontractService(
      user_id,
      data.contract_id,
      false,
      account_number_id,
      data.organization_id,
      req.i18n
    );

    const check_doc = await PrixodService.checkDocs({
      contract_id: contract.id,
    });

    if (check_doc.length && data.summa < contract.result_summa) {
      return res.error(req.i18n.t("docExists"), 400, { docs: check_doc });
    }

    // if (contract.remaining_balance + oldData.prixod_summa < data.summa) {
    //   throw new ErrorResponse(req.i18n.t("prixodSummaError"), 400);
    // }

    const result = await updatePrixodService({ ...data, id });

    return res.success(req.i18n.t("updateSuccess"), 200, null, result);
  } catch (error) {
    errorCatch(error, res);
  }
};

exports.deletePrixod = async (req, res) => {
  try {
    const user_id = req.user.id;
    const id = req.params.id;
    const account_number_id = req.query.account_number_id;

    await getByIdaccount_numberService(
      user_id,
      account_number_id,
      null,
      req.i18n
    );

    const doc = await getByIdPrixodService(
      user_id,
      id,
      account_number_id,
      true,
      req.i18n
    );

    const check_doc = await PrixodService.checkDocs({
      contract_id: doc.contract_id,
    });

    if (check_doc.length) {
      return res.error(req.i18n.t("docExists"), 400, { docs: check_doc });
    }

    await deletePrixodService(id);

    return res.success(req.i18n.t("deleteSuccess"), 200);
  } catch (error) {
    errorCatch(error, res);
  }
};

exports.exportExcelData = async (req, res) => {
  try {
    const { search, from, to, account_number_id, organization_id } =
      validationResponse(prixodQueryValidation, req.query);
    const user_id = req.user.id;
    await getByIdaccount_numberService(
      user_id,
      account_number_id,
      null,
      req.i18n
    );
    const { data, total, from_balance, to_balance, summa } =
      await getPrixodService(
        user_id,
        from,
        to,
        null,
        null,
        account_number_id,
        search,
        organization_id
      );
    const workbook = new ExcelJS.Workbook();
    const file_name = `prixod_${new Date().getTime()}.xlsx`;
    const worksheet = workbook.addWorksheet(`prixod_docs_${total}`);
    worksheet.pageSetup.margins.left = 0.5;
    worksheet.pageSetup.margins.header = 0.5;
    worksheet.pageSetup.margins.footer = 0.5;
    worksheet.pageSetup.margins.right = 0.5;
    worksheet.mergeCells(`A1`, "F1");
    worksheet.mergeCells(`A2`, "F2");
    worksheet.mergeCells(`A3`, "F3");
    const titleCell = worksheet.getCell("A1");
    const summa_fromCell = worksheet.getCell("A2");
    const prixodCell = worksheet.getCell("A3");
    const doc_numCell = worksheet.getCell("A4");
    const doc_dateCell = worksheet.getCell("B4");
    const clientCell = worksheet.getCell("C4");
    const innCell = worksheet.getCell("D4");
    const prixod_sumCell = worksheet.getCell("E4");
    const prixod_dateCell = worksheet.getCell("F4");
    titleCell.value = `Оммавий тадбирлардан тушган тушумлар`;
    prixodCell.value = `${returnStringDate(
      new Date(from)
    )} дан ${returnStringDate(new Date(to))} гача бўлган тушумлар`;
    summa_fromCell.value = `${returnStringDate(
      new Date(from)
    )} гача бўлган тушумлар жами : ${returnStringSumma(from_balance)}`;
    doc_numCell.value = "Шартнома рақами";
    doc_dateCell.value = `Шартнома санаси`;
    clientCell.value = `Ҳамкор ташкилот`;
    innCell.value = `Ҳамкор инн`;
    prixod_sumCell.value = `Тўланган пул маблағи`;
    prixod_dateCell.value = `Тўланган пул санаси`;
    let row_number = 5;
    for (let prixod of data) {
      const doc_numCell = worksheet.getCell(`A${row_number}`);
      const doc_dateCell = worksheet.getCell(`B${row_number}`);
      const clientCell = worksheet.getCell(`C${row_number}`);
      const innCell = worksheet.getCell(`D${row_number}`);
      const prixod_sumCell = worksheet.getCell(`E${row_number}`);
      const prixod_dateCell = worksheet.getCell(`F${row_number}`);
      doc_numCell.value = prixod.contract_doc_num;
      doc_dateCell.value = returnStringDate(new Date(prixod.contract_doc_date));
      clientCell.value = prixod.organization_name;
      innCell.value = prixod.organization_str;
      prixod_sumCell.value = prixod.prixod_summa;
      prixod_dateCell.value = returnStringDate(new Date(prixod.prixod_date));
      const css_array = [
        doc_dateCell,
        doc_numCell,
        clientCell,
        innCell,
        prixod_dateCell,
        prixod_sumCell,
      ];
      css_array.forEach((element, index) => {
        let horizontal = "center";
        let bold = true;
        let size = 8;
        if (index === 2) horizontal = "left";
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
    itogoCell.value = summa;
    summa_toCell.value = `${returnStringDate(
      new Date(to)
    )} гача бўлган тушумлар жами : ${returnStringSumma(to_balance)}`;
    const css_array = [
      titleCell,
      summa_fromCell,
      prixodCell,
      doc_dateCell,
      doc_numCell,
      clientCell,
      innCell,
      prixod_dateCell,
      prixod_sumCell,
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
      if (
        index === 9 ||
        index === 10 ||
        index === 0 ||
        index === 1 ||
        index === 2 ||
        index === 11
      )
        (fill = {}), (border = {});
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

exports.forPdfData = async (req, res) => {
  try {
    const { search, from, to, account_number_id, organization_id } =
      validationResponse(prixodQueryValidation, req.query);
    const user_id = req.user.id;
    await getByIdaccount_numberService(
      user_id,
      account_number_id,
      null,
      req.i18n
    );
    const data = await getPrixodService(
      user_id,
      from,
      to,
      null,
      null,
      account_number_id,
      search,
      organization_id
    );

    return res.success(req.i18n.t("getSuccess"), 200, null, data);
  } catch (error) {
    errorCatch(error, res);
  }
};
