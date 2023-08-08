const sendResponse = require("../utils/sendResponse");
const cuisine = require("../models/Cuisine");

module.exports = async (req, res, next) => {
        try {
                const cuisineId = req.params.id;
                const cuisine = await cuisine.findById(cuisineId);
                if (!cuisine) return sendResponse(res, 404, "Cuisine is not found");
                if (cuisine.user.toString() !== req.user._id) return sendResponse(res, 403, "Access denied");
                next();
        } catch(err) {
                return sendResponse(res, 500, err.message);
        }
}