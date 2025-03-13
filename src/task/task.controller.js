const { resFunc } = require("../utils/resFunc");
const { errorCatch } = require('../utils/errorCatch');
const { getByIdTaskService, getByContractIdTaskService, getTaskService } = require('../task/task.service');
const { getByIdcontractService } = require('../contract/db')

const getTask = async (req, res) => {
    try {
        const user_id = req.user.id
        const batalon_id = req.query.batalon_id
        const birgada = req.query.birgada
        const data = await getTaskService(user_id, batalon_id, birgada)
        
        return res.success(req.i18n.t('getSuccess'), 200, null, data);
    } catch (error) {
        errorCatch(error, res)
    }
}

const getByIdTask = async (req, res) => {
    try {
        const user_id = req.user.id
        const task_id = req.params.id
        const task = await getByIdTaskService(user_id, task_id, true, null, req.i18n)
        
        return res.success(req.i18n.t('getSuccess'), 200, null, task);
    } catch (error) {
        errorCatch(error, res)
    }
}

const getByConrtactIdTask = async (req, res) => {
    try {
        const usr_id = req.user.id
        const contract_id = req.params.id
        const account_number_id = req.query.account_number_id
        await getByIdcontractService(usr_id, contract_id, false, account_number_id, null, req.i18n)
        const result = await getByContractIdTaskService(contract_id)
        
        return res.success(req.i18n.t('getSuccess'), 200, null, result);
    } catch (error) {
        errorCatch(error, res)
    }
}

module.exports = {
    getByIdTask,
    getByConrtactIdTask,
    getTask
}