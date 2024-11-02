const { resFunc } = require("../utils/resFunc");
const { errorCatch } = require('../utils/errorCatch');
const { getByIdTaskService, getByContractIdTaskService } = require('../task/task.service');
const { getByIdcontractService } = require('../contract/contract.service')

const getByIdTask = async (req, res) => {
    try {
        const user_id = req.user.id
        const task_id = req.params.id
        const task = await getByIdTaskService(user_id, task_id, true)
        resFunc(res, 200, task)
    } catch (error) {
        errorCatch(error, res)
    }
}

const getByConrtactIdTask = async (req, res) => {
    try {
        const usr_id = req.user.id
        const contract_id = req.params.id
        const account_number_id = req.query.account_number_id
        await getByIdcontractService(usr_id, contract_id, false, account_number_id)
        const result = await getByContractIdTaskService(contract_id)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

module.exports = {
    getByIdTask,
    getByConrtactIdTask
}