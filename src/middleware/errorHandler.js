
const errorHandler = (err, req, res, next) => {
    let error = { ...err }
    error.message = err.message

    console.log(err.stack.red)

    return res.error(error.message, error.statusCode || 500);
}

module.exports = errorHandler