const { resFunc } = require("../utils/resFunc");
const { errorCatch } = require('../utils/errorCatch');
const { getByIdTaskService } = require('../task/task.service');

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

module.exports = {
    getByIdTask
}