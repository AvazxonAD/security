const resFunc = (res, status, data, meta) => {
    return res.success("success", status, meta, data);
}

module.exports = {
    resFunc
}