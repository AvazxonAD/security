const xlsx = require("xlsx");
const { db } = require("@db/index");

module.exports = async () => {
  const workbook = xlsx.readFile("./public/template/contract_edit.xlsx");

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

  const db_data = await db.query(`
        SELECT 
            d.id,
            d.doc_num, 
            TO_CHAR(d.doc_date, 'YYYY-MM-DD') AS doc_date, 
            d.result_summa::FLOAT 
        FROM contract  AS d 
        JOIN organization AS o ON o.id = d.organization_id
        LEFT JOIN gazna_numbers g ON g.id = d.gazna_number_id
        LEFT JOIN organ_account_numbers a ON a.id = d.organ_account_number_id
        WHERE d.isdeleted = false 
            AND d.user_id = 1
            AND EXTRACT(YEAR FROM d.doc_date) = 2025    
    `);

  let itogo_db = 0;
  for (let contract of db_data) {
    itogo_db += contract.result_summa;

    const check = excel_data.find(
      (item) => String(item.doc_num) === String(contract.doc_num)
    );

    if (
      !check ||
      Number(Math.round(contract.result_summa)) !==
        Number(Math.round(check.summa))
    ) {
      console.log(
        `Not : ${contract.doc_num} - ${contract.result_summa} != ${check.summa}`
      );
    }
  }

  let itogo_xlsx = 0;
  for (let contract of excel_data) {
    if (!contract.summa) {
      continue;
    }

    itogo_xlsx += Number(contract.summa);
  }

  console.log(`itogo_db: ${itogo_db}`);
  console.log(`itogo_xlsx: ${itogo_xlsx}`);
};
