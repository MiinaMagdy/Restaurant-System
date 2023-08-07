const jwt = require("jsonwebtoken");
require("dotenv").config();

const key = process.env.JWT_SECRET;

const sendResponse = require("../utils/sendResponse")

const checkAuth = (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(' ')[1];
        const decoded = jwt.verify(token, key);
        req.user = decoded;
        next();
    } catch (err) {
        return sendResponse(res, 401, "Authentication is failed");
    }
}

module.exports = checkAuth;