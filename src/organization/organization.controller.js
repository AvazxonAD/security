const {
    organizationCreateService,
    getorganizationService,
    getByIdorganizationService,
    organizationUpdateService,
    deleteorganizationService,
    getByStrOrganizationService,
    excelDataOrganizationService
} = require("./organization.service");
const { organizationValidation, allQueryValidation } = require("../utils/validation");
const { resFunc } = require("../utils/resFunc");
const { validationResponse } = require("../utils/response.validation");
const { errorCatch } = require('../utils/errorCatch')
const ExcelJS = require('exceljs')
const path = require('path')

const organizationCreate = async (req, res) => {
    try {
        const user_id = req.user.id
        const data = validationResponse(organizationValidation, req.body)
        await getByStrOrganizationService(data.str, user_id)
        const result = await organizationCreateService({ ...data, user_id })
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const organizationGet = async (req, res) => {
    try {
        const user_id = req.user.id
        const { page, limit, search } = validationResponse(allQueryValidation, req.query)
        const offset = (page - 1) * limit
        const { data, total } = await getorganizationService(user_id, search, offset, limit)
        const pageCount = Math.ceil(total / limit);
        const meta = {
            pageCount: pageCount,
            count: total,
            currentPage: page,
            nextPage: page >= pageCount ? null : page + 1,
            backPage: page === 1 ? null : page - 1
        }
        resFunc(res, 200, data, meta)
    } catch (error) {
        errorCatch(error, res)
    }
}

const organizationGetById = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        const result = await getByIdorganizationService(user_id, id, true)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const organizationUpdate = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        const data = validationResponse(organizationValidation, req.body)
        const oldData = await getByIdorganizationService(user_id, id)
        if (oldData.str !== data.str) {
            await getByStrOrganizationService(data.str, user_id)
        }
        const result = await organizationUpdateService({...data, id})
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const organizationDelete = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        await getByIdorganizationService(user_id, id)
        await deleteorganizationService(id)
        resFunc(res, 200, 'delete success true')
    } catch (error) {
        errorCatch(error, res)
    }
}

const excelDataOrganization = async (req, res) => {
    try {
        const user_id = req.user.id;
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Tashkilot Ma\'lumotlari');

        worksheet.columns = [
            { header: 'Tashkilot nomi', key: 'name', width: 30 },
            { header: 'Manzil', key: 'address', width: 50 },
            { header: 'STIR', key: 'str', width: 20 },
            { header: 'Bank nomi', key: 'bank_name', width: 50 },
            { header: 'MFO', key: 'mfo', width: 20 },
            { header: 'Hisob raqami', key: 'account_number', width: 30 },
            { header: 'G`azna1', key: 'treasury1', width: 30 },
            { header: 'G`azna2', key: 'treasury2', width: 30 }
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

        for (let col = 1; col <= worksheet.columns.length; col++) {
            worksheet.getColumn(col).alignment = { vertical: 'middle', horizontal: 'center' };
        }

        const {data, total} = await excelDataOrganizationService(user_id);
        for (let organizationData of data) {
            worksheet.addRow(organizationData);
        }

        const totalRow = worksheet.addRow(['Tashkilotlar soni ', `${total}`]);
        totalRow.font = { bold: true };
        totalRow.getCell(1).alignment = { horizontal: 'center' };

        const fileName = `organization_${Date.now()}.xlsx`;
        const filePath = path.join(__dirname, '../../public/exports', fileName);
        await workbook.xlsx.writeFile(filePath);

        return res.download(filePath, (err) => {
            if (err) throw new ErrorResponse(err, err.statusCode);
        });
    } catch (error) {
        errorCatch(error, res);
    }
};

const forPdfData = async (req, res) => {
    try {
        const user_id = req.user.id
        const {data, total} = await excelDataOrganizationService(user_id);
        resFunc(res, 200, {total, data})
    } catch (error) {
        errorCatch(error, res)
    }
}



module.exports = {
    organizationCreate,
    organizationGet,
    organizationGetById,
    organizationUpdate,
    organizationDelete,
    excelDataOrganization,
    forPdfData
};
