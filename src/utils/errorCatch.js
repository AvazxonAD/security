
const errorCatch = (error, res) => {
    console.log(error.stack.red);
    return res.error(error.message, error?.statusCode);
}

module.exports = { errorCatch }