const mongoose = require('mongoose');

const cuisineSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, "Category is Mandatory"],
    },
	name: {
        type: String,
        required: [true, "Name is Mandatory"],
	},
    price: {
        type: Number,
        required: [true, "Price is Mandatory"],
    },
    image: {
        type: String,
        //required: [true, "Image is Mandatory"],
    },
    description: {
        type: String,
    },
    rate: {
        type: Number,
    },
    sells:{
        type: Number,
    },
}, { timestamps: true });

const cuisine = mongoose.model('cuisine', cuisineSchema);

module.exports = cuisine;