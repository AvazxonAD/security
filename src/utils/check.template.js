const ErrorResponse = require('../utils/errorResponse')
const checkTemplateString = (string, arrray) => {
    try {
        for(let str of arrray){
            if(!string.includes(str)){
                throw new ErrorResponse(`The required part was not provided: ${str}`, 400)
            }
        }
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}


module.exports = { checkTemplateString }