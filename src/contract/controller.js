const { ContractService } = require("./service");
const { AccountNumberService } = require(`@account_number/service`);
const { BatalonService } = require(`@batalon/service`);

exports.Controller = class {
  static async getByBatalonReport(req, res) {
    const { account_number_id, batalon_id, excel, from, to } = req.query;
    const user_id = req.user.id;

    const account_number = await AccountNumberService.getById({
      user_id,
      id: account_number_id,
    });
    if (account_number) {
      return res.error(req.i18n.t("accountNumberError"), 404);
    }

    const batalon = await BatalonService.getById({ user_id, id: batalon_id });
    if (!batalon) {
      return res.error(req.i18n.t("batalonNotFound"), 404);
    }

    const result = await ContractService.getByBatalonReport({
      user_id,
      ...req.query,
    });

    if (excel === "true") {
      const { file_name, file_path } =
        await ContractService.getByBatalonReportExcel({
          ...result,
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

    return res.success(req.i18n.t("getSuccess"), 200, null, result);
  }
};

const {
  contractCreateService,
  getcontractService,
  getByIdcontractService,
  contractUpdateService,
  deleteContractService,
  dataForExcelService,
  contractViewService,
} = require("./db");
const {
  contractValidation,
  conrtactQueryValidation,
  contractUpdateValidation,
} = require("../utils/validation");
const { validationResponse } = require("../utils/response.validation");
const { errorCatch } = require("../utils/errorCatch");
const { getByIdBatalonService, getBatalonService } = require("../batalon/db");
const {
  getByIdorganizationService,
} = require("../organization/organization.service");
const {
  getByIdaccount_numberService,
} = require("../spravochnik/account.number/account.number.service");
const { getByIdBxmService } = require("../spravochnik/bxm/db");
const { returnStringSumma } = require("../utils/return.summa");
const {
  returnStringDate,
  returnLocalDate,
} = require("../utils/date.functions");
const ExcelJs = require("exceljs");
const path = require("path");
const pg = require("pg");
const pool = require("../config/db");
const ErrorResponse = require("../utils/errorResponse");
const xlsx = require("xlsx");
const { BxmService } = require("../spravochnik/bxm/service");

exports.contractCreate = async (req, res) => {
  try {
    const user_id = req.user.id;
    const account_number_id = req.query.account_number_id;
    const { organ_account_number_id, gazna_number_id } = req.body;

    await getByIdaccount_numberService(
      user_id,
      account_number_id,
      null,
      req.i18n
    );

    const { error, value: data } = contractValidation.validate(req.body);
    if (error) {
      return res.error(
        req.i18n.t("validationError"),
        400,
        error.details[0].message
      );
    }

    const organization = await getByIdorganizationService(
      user_id,
      data.organization_id,
      null,
      req.i18n
    );

    if (organ_account_number_id) {
      const check = organization.account_numbers.find(
        (item) => item.id === organ_account_number_id
      );
      if (!check) {
        return res.error(req.i18n.t("accountNumberNotFound"), 404);
      }
    }

    if (gazna_number_id) {
      const check = organization.gazna_numbers.find(
        (item) => item.id === gazna_number_id
      );
      if (!check) {
        return res.error(req.i18n.t("gaznaNumberNotFound"), 404);
      }
    }

    for (let task of data.tasks) {
      await getByIdBatalonService(
        user_id,
        task.batalon_id,
        null,
        null,
        req.i18n
      );
      const bxm = await getByIdBxmService(user_id, task.bxm_id, req.i18n);
      task.bxm_summa = bxm.bxm_07;
    }

    const result = await contractCreateService({
      ...data,
      user_id,
      account_number_id,
    });

    return res.success(req.i18n.t("createSuccess"), 201, null, result);
  } catch (error) {
    errorCatch(error, res);
  }
};

exports.contractGet = async (req, res) => {
  try {
    const user_id = req.user.id;
    const {
      page,
      limit,
      search,
      from,
      to,
      account_number_id,
      organization_id,
      batalon_id,
    } = validationResponse(conrtactQueryValidation, req.query);

    await getByIdaccount_numberService(
      user_id,
      account_number_id,
      null,
      req.i18n
    );
    const offset = (page - 1) * limit;

    const { data, total, from_balance, to_balance } = await getcontractService(
      user_id,
      offset,
      limit,
      search,
      from,
      to,
      account_number_id,
      organization_id,
      batalon_id
    );

    for (let doc of data) {
      doc.result_summa = Math.round(doc.result_summa * 100) / 100;
      doc.remaining_balance = Math.round(doc.remaining_balance * 100) / 100;
      doc.remaining_summa = Math.round(doc.remaining_summa * 100) / 100;
    }

    const pageCount = Math.ceil(total / limit);
    const meta = {
      pageCount: pageCount,
      count: total,
      currentPage: page,
      nextPage: page >= pageCount ? null : page + 1,
      backPage: page === 1 ? null : page - 1,
      from_balance: returnStringSumma(Math.round(from_balance * 100) / 100),
      to_balance: returnStringSumma(Math.round(to_balance * 100) / 100),
    };

    return res.success(req.i18n.t("getSuccess"), 200, meta, data);
  } catch (error) {
    errorCatch(error, res);
  }
};

exports.contractGetById = async (req, res) => {
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
    const result = await getByIdcontractService(
      user_id,
      id,
      true,
      account_number_id,
      null,
      req.i18n
    );
    result.summa = Math.round(result.summa * 100) / 100;
    result.result_summa = Math.round(result.result_summa * 100) / 100;
    result.remaining_balance = Math.round(result.remaining_balance * 100) / 100;
    result.discount_money = Math.round(result.discount_money * 100) / 100;
    for (let task of result.tasks) {
      task.summa = Math.round(task.summa * 100) / 100;
      task.timemoney = Math.round(task.timemoney * 100) / 100;
      task.discount_money = Math.round(task.discount_money * 100) / 100;
      task.result_summa = Math.round(task.result_summa * 100) / 100;
    }

    return res.success(req.i18n.t("getSuccess"), 200, null, result);
  } catch (error) {
    errorCatch(error, res);
  }
};

exports.contractUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const user_id = req.user.id;
    const account_number_id = req.query.account_number_id;
    const { organ_account_number_id, gazna_number_id } = req.body;

    await getByIdaccount_numberService(
      user_id,
      account_number_id,
      null,
      req.i18n
    );

    const old_data = await getByIdcontractService(
      user_id,
      id,
      false,
      account_number_id,
      null,
      req.i18n
    );

    const data = validationResponse(contractUpdateValidation, req.body);

    let check_task = true;
    for (let task of old_data.tasks) {
      const new_task = data.tasks.find((item) => item.id === task.id);

      if (!new_task) {
        check_task = false;
      } else if (new_task) {
        const bxm = await BxmService.getByIdBxm({
          id: new_task.bxm_id,
          user_id,
        });

        new_task.task_discount_money = 0;
        new_task.task_result_summa = 0;
        new_task.task_summa =
          new_task.task_time *
          new_task.worker_number *
          Math.round(bxm.summa * 0.07);

        if (data.discount) {
          new_task.task_discount_money =
            new_task.task_summa * (data.discount / 100);
          new_task.task_result_summa =
            new_task.task_summa - new_task.task_discount_money;
        } else {
          new_task.task_result_summa = new_task.task_summa;
        }

        if (task.result_summa !== new_task.task_result_summa) {
          check_task = false;
        }
      }
    }

    if (!check_task) {
      const check_doc = await ContractService.checkDoc({ id });
      if (check_doc.length) {
        return res.error(req.i18n.t("docExists"), 400, { docs: check_doc });
      }
    }

    const organization = await getByIdorganizationService(
      user_id,
      data.organization_id,
      null,
      req.i18n
    );

    if (organ_account_number_id) {
      const check = organization.account_numbers.find(
        (item) => item.id === organ_account_number_id
      );
      if (!check) {
        return res.error(req.i18n.t("accountNumberNotFound"), 404);
      }
    }

    if (gazna_number_id) {
      const check = organization.gazna_numbers.find(
        (item) => item.id === gazna_number_id
      );
      if (!check) {
        return res.error(req.i18n.t("gaznaNumberNotFound"), 404);
      }
    }

    for (let task of data.tasks) {
      await getByIdBatalonService(
        user_id,
        task.batalon_id,
        null,
        null,
        req.i18n
      );
      const bxm = await getByIdBxmService(user_id, task.bxm_id, req.i18n);
      task.bxm_summa = bxm.bxm_07;

      if (task.id) {
        const check = old_data.tasks.find((item) => item.id === task.id);
        if (!check) {
          return res.error(req.i18n.t("taskNotFound"), 404);
        }
      }
    }

    const result = await contractUpdateService({
      ...data,
      user_id,
      id,
      old_data,
    });

    return res.success(req.i18n.t("updateSuccess"), 200, null, result);
  } catch (error) {
    errorCatch(error, res);
  }
};

exports.contractDelete = async (req, res) => {
  try {
    const user_id = req.user.id;
    const id = req.params.id;
    const account_number_id = req.query.account_number_id;
    await getByIdcontractService(
      user_id,
      id,
      false,
      account_number_id,
      null,
      req.i18n
    );

    const check_doc = await ContractService.checkDoc({ id });
    if (check_doc.length) {
      return res.error(req.i18n.t("docExists"), 400, { docs: check_doc });
    }

    await deleteContractService(id);

    return res.success(req.i18n.t("deleteSuccess"), 200);
  } catch (error) {
    errorCatch(error, res);
  }
};

exports.exportExcelData = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { from, to, account_number_id } = validationResponse(
      conrtactQueryValidation,
      req.query
    );
    const { data, total } = await dataForExcelService(
      user_id,
      account_number_id,
      from,
      to
    );

    const contractBook = new ExcelJs.Workbook();
    const contractSheet = contractBook.addWorksheet("Shartnomalar");
    contractSheet.columns = [
      { header: "N_", key: "doc_num", width: 10 },
      { header: "Hamkor tashkilot", key: "organization_name", width: 40 },
      { header: "Shartnoma sanasi", key: "doc_date", width: 20 },
      { header: "Amal qilish muddati", key: "period", width: 20 },
      { header: "Manzil", key: "adress", width: 40 },
      { header: "Boshlanish vaqti", key: "start_date", width: 20 },
      { header: "Tugallash sanasi", key: "end_date", width: 20 },
      { header: "Chegirma %", key: "discount", width: 20 },
      { header: "Chegirma summa", key: "discount_money", width: 20 },
      { header: "Summa", key: "summa", width: 20 },
      { header: "Umumiy summa", key: "result_summa", width: 20 },
      { header: "Debit", key: "debit", width: 20 },
      { header: "Kredit", key: "kridit", width: 20 },
      { header: "Qolgan summa", key: "remaining_summa", width: 20 },
      { header: "Xisob raqam", key: "account_number", width: 25 },
      { header: "Xodimlar soni", key: "all_worker_number", width: 20 },
      { header: "Topshiriq vaqti", key: "all_task_time", width: 20 },
    ];
    const headerRow = contractSheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" },
    };
    headerRow.alignment = { horizontal: "center" };
    headerRow.height = 30;
    contractSheet.columns.forEach((column) => {
      column.alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
    });
    headerRow.eachCell((cell) => {
      cell.border = {
        top: { style: "thin", color: { argb: "FF000000" } },
        left: { style: "thin", color: { argb: "FF000000" } },
        bottom: { style: "thin", color: { argb: "FF000000" } },
        right: { style: "thin", color: { argb: "FF000000" } },
      };
    });
    for (let contract of data) {
      contractSheet.addRow({
        doc_num: contract.doc_num,
        organization_name: contract.organization_name,
        doc_date: returnLocalDate(new Date(contract.doc_date)),
        period: returnLocalDate(new Date(contract.period)),
        adress: contract.adress,
        start_date: `${returnLocalDate(new Date(contract.start_date))} ${
          contract.start_time
        }`,
        end_date: `${returnLocalDate(new Date(contract.end_date))} ${
          contract.end_time
        }`,
        discount: contract.discount,
        discount_money: contract.discount_money,
        summa: contract.summa,
        result_summa: contract.result_summa,
        debit: contract.debit,
        kridit: contract.kridit,
        remaining_summa: contract.remaining_summa,
        account_number: contract.account_number,
        all_worker_number: contract.all_worker_number,
        all_task_time: contract.all_task_time,
      });
    }
    const totalRow = contractSheet.addRow([
      "Barcha",
      "shartnomalar",
      "Soni",
      `${total}`,
    ]);
    totalRow.font = { bold: true };
    totalRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" },
    };
    totalRow.alignment = { horizontal: "center" };
    totalRow.eachCell((cell) => {
      cell.border = {
        top: { style: "thin", color: { argb: "FF000000" } },
        left: { style: "thin", color: { argb: "FF000000" } },
        bottom: { style: "thin", color: { argb: "FF000000" } },
        right: { style: "thin", color: { argb: "FF000000" } },
      };
      cell.alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
    });
    const fileName = `contracts.${Date.now()}.xlsx`;
    const filePath = path.join(__dirname, "../../public/exports", fileName);

    await contractBook.xlsx.writeFile(filePath);
    return res.download(filePath, (err) => {
      if (err) throw new ErrorResponse(err, err.statusCode);
    });
  } catch (error) {
    errorCatch(error, res);
  }
};

exports.contractView = async (req, res) => {
  try {
    const user_id = req.user.id;
    const account_number_id = req.query.account_number_id;
    const id = req.params.id;
    await getByIdcontractService(
      user_id,
      id,
      false,
      account_number_id,
      null,
      req.i18n
    );
    const result = await contractViewService(user_id, account_number_id, id);

    return res.success(req.i18n.t("getSuccess"), 200, null, result);
  } catch (error) {
    errorCatch(error, res);
  }
};

exports.conntractViewExcel = async (req, res) => {
  try {
    const user_id = req.user.id;
    const account_number_id = req.query.account_number_id;
    const id = req.params.id;
    const { contract, prixods, rasxod_fios, rasxods } =
      await contractViewService(user_id, account_number_id, id);
    const workbook = new ExcelJs.Workbook();
    const fileName = `contract_${new Date().getTime()}.xlsx`;
    const worksheet = workbook.addWorksheet("contract");
    worksheet.pageSetup.margins.left = 0;
    worksheet.pageSetup.margins.header = 0;
    worksheet.pageSetup.margins.footer = 0;
    worksheet.pageSetup.margins.right = 0;
    worksheet.mergeCells(`A1`, "K1");
    const title = worksheet.getCell(`A1`);
    title.value = `${contract.doc_num}  шартнома таҳлили`;
    worksheet.mergeCells(`A2`, "C2");
    const contract_date = worksheet.getCell(`A2`);
    contract_date.value = returnStringDate(new Date(contract.doc_date));
    worksheet.mergeCells(`D2`, "G2");
    const organization = worksheet.getCell(`D2`);
    organization.value = `Буюртмачи`;
    worksheet.mergeCells(`H2`, "K2");
    const doer = worksheet.getCell(`H2`);
    doer.value = "Бажарувчи";
    worksheet.mergeCells(`A3`, "C3");
    const address = worksheet.getCell(`A3`);
    address.value = "Манзил";
    worksheet.mergeCells(`D3`, "G3");
    const organization_name = worksheet.getCell(`D3`);
    organization_name.value = `${contract.organization_name}`;
    worksheet.mergeCells(`H3`, "K3");
    const doer_name = worksheet.getCell(`H3`);
    doer_name.value = `${contract.doer}`;
    worksheet.mergeCells(`A4`, "C4");
    const inn = worksheet.getCell(`A4`);
    inn.value = "ИНН";
    worksheet.mergeCells(`D4`, "G4");
    const organization_str = worksheet.getCell(`D4`);
    organization_str.value = returnStringSumma(contract.organization_str);
    worksheet.mergeCells(`H4`, "K4");
    const doer_str = worksheet.getCell(`H4`);
    doer_str.value = returnStringSumma(contract.str);
    worksheet.mergeCells(`A5`, `C5`);
    const account_number = worksheet.getCell(`A5`);
    account_number.value = `Хисоб рақами`;
    worksheet.mergeCells(`D5`, "G5");
    const organization_account_number = worksheet.getCell(`D5`);
    organization_account_number.value = returnStringSumma(
      contract.organization_account_number
    );
    worksheet.mergeCells(`H5`, "K5");
    const doer_account_number = worksheet.getCell(`H5`);
    doer_account_number.value = returnStringSumma(contract.account_number);
    const css_array = [
      title,
      organization,
      doer,
      address,
      inn,
      account_number,
      contract_date,
      organization_name,
      organization_str,
      organization_account_number,
      doer_name,
      doer_str,
      doer_account_number,
    ];
    css_array.forEach((item, index) => {
      let size = 10;
      let bold = true;
      let horizontal = "center";
      if (index === 0) size = 14;
      if (index > 6) bold = false;
      Object.assign(item, {
        numFmt: "#,## ",
        font: {
          size,
          bold,
          color: { argb: "FF000000" },
          name: "Times New Roman",
        },
        alignment: { vertical: "middle", horizontal },
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

    worksheet.getRow(1).height = 30;
    const filePath = path.join(__dirname, "../../public/uploads/" + fileName);
    await workbook.xlsx.writeFile(filePath);
    return res.download(filePath, (err) => {
      if (err) throw new ErrorResponse(err, err.statusCode);
    });
  } catch (error) {
    errorCatch(error, res);
  }
};

exports.importDataDB = async (req, res) => {
  const oldDb = new pg.Pool({
    host: "localhost",
    port: 5433,
    password: "avazbek+1201",
    database: "milliy_gvardiya",
    user: "postgres",
  });
  const newDb = new pg.Pool({
    host: "localhost",
    port: 5433,
    password: "avazbek+1201",
    database: "gvardiyaV2",
    user: "postgres",
  });

  try {
    const old_data = await oldDb.query(`
            SELECT 
                c.id, 
                c.contractnumber, 
                c.contractdate, 
                c.address, 
                c.clientname, 
                c.tasktime, 
                c.discount,
                c.timemoney,
                (
                    SELECT ARRAY_AGG(ROW_TO_JSON(t))
                    FROM (
                        SELECT t.battalionname, t.workernumber, t.taskdate, t.tasktime 
                        FROM tasks t WHERE t.contract_id = c.id
                    ) t
                ) AS array1,
                (
                    SELECT ARRAY_AGG(ROW_TO_JSON(t))
                    FROM (
                        SELECT t.battalionname, t.workernumber, t.taskdate, t.tasktime 
                        FROM iib_tasks t WHERE t.contract_id = c.id
                    ) t
                ) AS array2  
            FROM contracts c WHERE user_id = 1
        `);

    const accountNumber = await newDb.query(`
            SELECT id FROM account_number 
            WHERE isdeleted = false AND user_id = 1
        `);
    if (!accountNumber.rows[0]) {
      throw new Error("Account number not found");
    }

    const client = await newDb.connect();
    try {
      await client.query("BEGIN");

      for (let contract of old_data.rows) {
        const organization = await client.query(
          `SELECT id FROM organization WHERE name = $1`,
          [contract.clientname.trim()]
        );
        if (!organization.rows[0]) {
          await client.query(
            `INSERT INTO organization(name, user_id) VALUES($1, $2)`,
            [contract.clientname.trim(), 1]
          );
        }
      }
      const bxm = await client.query(`SELECT * FROM bxm WHERE user_id = 1`);
      for (let contract of old_data.rows) {
        const organization = await client.query(
          `SELECT id FROM organization WHERE name = $1`,
          [contract.clientname.trim()]
        );
        const resultArray = [
          ...(contract.array1 || []),
          ...(contract.array2 || []),
        ];

        let allWorkerNumber = 0;
        let allTaskTime = 0;
        let summa = 0;

        resultArray.forEach((task) => {
          allTaskTime += task.tasktime;
          allWorkerNumber += task.workernumber;
          summa += task.tasktime * task.workernumber * contract.timemoney;
        });

        const discountMoney = contract.discount
          ? summa * (contract.discount / 100)
          : 0;
        const resultSumma = summa - discountMoney;

        const contractResult = await client.query(
          `
                    INSERT INTO contract(
                        doc_num, doc_date, adress, discount, summa, organization_id, 
                        account_number_id, user_id, all_worker_number, all_task_time, 
                        discount_money, result_summa
                    ) 
                    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
                    RETURNING id
                `,
          [
            contract.contractnumber,
            contract.contractdate,
            contract.address,
            contract.discount || 0,
            summa,
            organization.rows[0].id,
            accountNumber.rows[0].id,
            1,
            allWorkerNumber,
            allTaskTime,
            discountMoney,
            resultSumma,
          ]
        );

        for (let task of resultArray) {
          const taskSumma =
            task.tasktime * task.workernumber * contract.timemoney;
          const taskDiscountMoney = taskSumma * (contract.discount / 100);
          const taskResultSumma = taskSumma - taskDiscountMoney;

          const batalon = await client.query(
            `
                        SELECT id FROM batalon WHERE name = $1 AND isdeleted = false
                    `,
            [task.battalionname]
          );
          if (!batalon.rows[0]) {
            throw new Error("Batalon not found");
          }

          await client.query(
            `
                        INSERT INTO task(
                            contract_id, batalon_id, task_time, worker_number, summa, 
                            user_id, task_date, discount_money, result_summa
                        ) 
                        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
                    `,
            [
              contractResult.rows[0].id,
              batalon.rows[0].id,
              task.tasktime,
              task.workernumber,
              taskSumma,
              1,
              task.taskdate,
              taskDiscountMoney,
              taskResultSumma,
            ]
          );
        }
      }
      await client.query("COMMIT");
      res.send("Data imported successfully");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error importing data", error: error.message });
  } finally {
    await oldDb.end();
    await newDb.end();
  }
};

exports.importData = async (req, res) => {
  const workbook = xlsx.readFile(req.file.path);

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  let result_summa = 0;
  let task_result_summa = 0;

  const data = xlsx.utils.sheet_to_json(sheet);

  const batalons = await getBatalonService(1);
  for (let doc of data) {
    doc.timeMoney = doc.summa / (doc.worker * doc.time);
    doc.client = doc.client.replace(/\(.*?\)/, "").trim();
    doc.client = doc.client.replace(/["\\]/g, "").trim();

    if (doc.doc_num <= 600) {
      result_summa += doc.summa;
    }

    doc.tasks = [];

    for (let batalon of batalons) {
      const key = batalon.name;
      if (doc[key]) {
        const task = {
          worker_number: doc[key],
          batalon_id: batalon.id,
          task_time: doc.time,
          timeMoney: doc.timeMoney,
          summa: doc.time * doc[key] * doc.timeMoney,
          result_summa: doc.time * doc[key] * doc.timeMoney,
        };

        if (!task.result_summa) {
          console.log(doc);
        }

        if (doc.doc_num <= 600) {
          task_result_summa += task.result_summa;
        }

        doc.tasks.push(task);
      }
    }

    const organization = await pool.query(
      `SELECT id FROM organization WHERE name ILIKE '%' || $1 || '%'`,
      [doc.client]
    );

    if (!organization.rows[0]) {
      const organ = await pool.query(
        `INSERT INTO organization(name) VALUES($1) RETURNING id`,
        [doc.client]
      );

      doc.organ_id = organ.rows[0].id;
    } else {
      doc.organ_id = organization.rows[0].id;
    }

    const client = await pool.connect();
    await client.query("BEGIN");

    const docDate = doc.doc_date ? new Date(doc.doc_date) : new Date();

    const validDate =
      docDate.getTime() && docDate.toString() !== "Invalid Date"
        ? docDate
        : new Date();

    try {
      const contract = await pool.query(
        `
                INSERT INTO contract(
                    doc_num, 
                    doc_date,
                    summa, 
                    organization_id, 
                    account_number_id,
                    user_id,
                    all_worker_number,
                    all_task_time,
                    result_summa
                ) 
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id    
            `,
        [
          doc.doc_num,
          validDate,
          doc.summa,
          doc.organ_id,
          2,
          1,
          doc.worker_number,
          doc.worker_number * doc.time,
          doc.summa,
        ]
      );

      for (let task of doc.tasks) {
        await pool.query(
          `
                    INSERT INTO 
                    task(contract_id, batalon_id, task_time, worker_number, summa, user_id, result_summa, time_money) 
                    VALUES($1, $2, $3, $4, $5, $6, $7, $8)    
                `,
          [
            contract.rows[0].id,
            task.batalon_id,
            task.task_time,
            task.worker_number,
            task.summa,
            1,
            task.result_summa,
            task.timeMoney,
          ]
        );
      }
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      console.log(error);
      return res.send(error.message);
    } finally {
      client.release();
    }
  }

  return res.success(
    req.i18n.t("getSuccess"),
    200,
    { result_summa, task_result_summa },
    data
  );
};
