const mongoose = require("mongoose");

// role - fullname - email - password - phone - address - gender - createdAt - updatedAt
const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Fullname is required"],
        trim: true,
        maxLength: [50, "Fullname is up to 50 chars long"],
        minLength: [3, "Fullname is at least 3 chars long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Email is invalid"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password is at least 6 chars long"],
        match: [/^\S+$/, "Password is invalid"] // no whitespace allowed
    },
    role: {
        type: String,
        enum: ["admin", "chef", "staff", "delivery", "client"],
        default: "client"
    },
    phone: {
        type: String,
        trim: true,
        match: [/^01[0125][0-9]{8}$/, "Phone is invalid"]
    },
    address: {
        type: String,
        trim: true,
        maxLength: [100, "Address is up to 100 chars long"]
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'undefined'],
        default: 'undefined'
    },
    // TODO: avatar as binary data GridFS: https://www.mongodb.com/docs/manual/core/gridfs/
}, { timestamps: true } );

const User = mongoose.model("User", userSchema);

module.exports = User;