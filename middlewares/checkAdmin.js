const sendResponse = require("../utils/sendResponse");
const User = require("../models/User");

const checkAdmin = async (req, res, next) => {
    console.log("Check Admin");
    try {
        if (req.user.role !== "admin")
            return sendResponse(res, 400, "You are not admin");

        next();
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
}

module.exports = checkAdmin;