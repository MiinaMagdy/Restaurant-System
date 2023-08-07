const sendResponse = require("../utils/sendResponse");
const User = require("../models/User");

const checkAdmin = async (req, res, next) => {
    try {
        console.log(req.user);
        const user = await User.findById(req.user.id);
        if (!user)
            return sendResponse(res, 400, "No such user id found");

        if (user.role !== "admin")
            return sendResponse(res, 400, "You are not admin");

        next();
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
}

module.exports = checkAdmin;