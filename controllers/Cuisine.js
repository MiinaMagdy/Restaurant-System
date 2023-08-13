// Models
const Cuisine = require('../models/Cuisine');

//utils
const sendResponse = require('../utils/sendResponse');

// Methods
// @desc    Get all cuisines with pagination and price filter
// @route   GET /api/v1/cuisines?page=1&limit=2&price=100
// @access  Public
exports.getCuisines = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const price = parseInt(req.query.price) || 1000000;
        const cuisines = await Cuisine.find({ price: { $lte: price } }).skip(skip).limit(limit);
        const count = await Cuisine.countDocuments({ price: { $lte: price } });
        sendResponse(res, 200, { cuisines, count });
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
}

// @desc    Get single cuisine
// @route   GET /api/v1/cuisines/:id
// @access  Public
exports.getCuisine = async (req, res) => {
    try {
    const cuisine = await Cuisine.findById(req.params.id);
    if(!cuisine) {
        return sendResponse(res, 404, `Cuisine not found with id of ${req.params.id}`);
    }
    sendResponse(res, 200, cuisine);
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
}

// @desc    Create new cuisine
// @route   POST /api/v1/cuisines
// @access  Private
exports.createCuisine = async (req, res) => {
    try {
    const cuisine = await Cuisine.create(req.body);
    
    sendResponse(res, 201,"cuisine created", cuisine);
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
}

// @desc    Update cuisine
// @route   POST /api/v1/cuisines/:id
// @access  Private
exports.updateCuisine = async (req, res) => {
    try {
    const cuisine = await Cuisine.findOne({ _id: req.params.id });
    if(!cuisine) {
        return sendResponse(res, 404, `Cuisine not found with id of ${req.params.id}`);
    }
    if(!req.body.name || !req.body.price || !req.body.category) {
        return sendResponse(res, 400, `Please provide name, price and category`);
    }
    const updated = cuisine.set(req.body);
    await updated.save();

    sendResponse(res, 200, cuisine);
    } catch (err) {
        sendResponse(res, 500, err.message);
    }
}

// @desc    Delete cuisine
// @route   DELETE /api/v1/cuisines/:id
// @access  Private
exports.deleteCuisine = async (req, res) => {
    try {
    const cuisine = await Cuisine.findByIdAndDelete(req.params.id);
    if(!cuisine) {
        return sendResponse(res, 404, `Cuisine not found with id of ${req.params.id}`);
    }

    sendResponse(res, 200, {});
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
}

// @desc    Upload photo for cuisine
// @route   PUT /api/v1/cuisines/:id/photo
// @access  Private
exports.cuisinePhotoUpload = async (req, res, next) => {
    try {
    const cuisine = await Cuisine.findOne({ _id: req.params.id });
    if(!cuisine) {
        return sendResponse(res, 404, `Cuisine not found with id of ${req.params.id}`);
    }
    if(!req.files) {
        return next(new Error(`Please upload a file`));
    }
    const {file} = req.files;
    // Make sure the image is a photo
    if(!file.mimetype.startsWith('image')) {
        return next(new Error(`Please upload an image file`));
    }
    // Check filesize
    if(file.size > process.env.MAX_FILE_UPLOAD) {
        return next(new Error(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`));
    }
    // Create custom filename
    file.name = `photo_${cuisine._id}${path.parse(file.name).ext}`;
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if(err) {
            console.error(err);
            return next(new Error(`Problem with file upload`));
        }
        await Cuisine.findByIdAndUpdate(req.params.id, { image: file.name });
        sendResponse(res, 200, file.name);
    });
    } catch (err) {
        next(err);
    }
}


