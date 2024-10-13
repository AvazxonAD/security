const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse.js');
const { errorCatch } = require('../utils/errorCatch.js');

module.exports = (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            throw new ErrorResponse('Token was not provided correctly', 403);
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            throw new ErrorResponse("You are not logged in", 403);
        }
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (decoded.exp && decoded.exp < currentTimestamp) {
            throw new ErrorResponse("Token has expired", 403);
        }
        req.user = decoded;
        next();
    } catch (err) {
        errorCatch(err, res);
    }
}
