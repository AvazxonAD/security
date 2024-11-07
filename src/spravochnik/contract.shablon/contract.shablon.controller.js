const {
    createContractTemplateService,
    getContractTemplatesService,
    getContractTemplateByIdService,
    updateContractTemplateService,
    deleteContractTemplateService
} = require("./contract.shablon.service");
const { contractTemplateValidation } = require("../../utils/validation");
const { resFunc } = require("../../utils/resFunc");
const { validationResponse } = require("../../utils/response.validation");
const { errorCatch } = require('../../utils/errorCatch')
const { checkTemplateString } = require('../../utils/check.template')

const templateCreate = async (req, res) => {
    try {
        const user_id = req.user.id
        const data = validationResponse(contractTemplateValidation, req.body)
        checkTemplateString(data.main_section, [ '${contract_number}', '${doc_date}', '${ijrochi}', '${client.name}', '${raxbar}' ])
        checkTemplateString(data.section_1, [ '${start_date}', '${end_date}', '${start_time}', '${end_time}', '${address}' ])
        checkTemplateString(data.section_2, ['${summa}'])
        const result = await createContractTemplateService({ ...data, user_id })
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const templateGet = async (req, res) => {
    try {
        const user_id = req.user.id
        const result = await getContractTemplatesService(user_id)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const templateGetById = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        const result = await getContractTemplateByIdService(user_id, id, true)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const templateUpdate = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        const data = validationResponse(contractTemplateValidation, req.body)
        await getContractTemplateByIdService(user_id, id)
        checkTemplateString(data.main_section, [ '${contract_number}', '${doc_date}', '${ijrochi}', '${client.name}', '${ijrochi}', '${raxbar}' ])
        checkTemplateString(data.section_1, [ '${start_date}', '${end_date}', '${start_time}', '${end_time}', '${address}' ])
        checkTemplateString(data.section_2, ['${summa}'])
        const result = await updateContractTemplateService({ ...data, id })
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const templateDelete = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        await getContractTemplateByIdService(user_id, id)
        await deleteContractTemplateService(id)
        resFunc(res, 200, 'delete success true')
    } catch (error) {
        errorCatch(error, res)
    }
}

module.exports = {
    templateCreate,
    templateGet,
    templateGetById,
    templateUpdate,
    templateDelete
};
