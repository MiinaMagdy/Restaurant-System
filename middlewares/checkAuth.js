const jwt = require("jsonwebtoken");
require("dotenv").config();

const key = process.env.JWT_SECRET;

const User = require("../models/User")
const sendResponse = require("../utils/sendResponse")

const checkAuth = async (req, res, next) => {
    console.log("Check Auth");
    try {
        const token = req.headers["authorization"].split(' ')[1];
        const decoded = jwt.verify(token, key);
        req.user = await User.findById(decoded.id);
        console.log(req.user);

        if (!req.user)
            return sendResponse(res, 400, "the logged in user is deleted");
        next();
    } catch (err) {
        return sendResponse(res, 401, "Authentication is failed");
    }
}

module.exports = checkAuth;