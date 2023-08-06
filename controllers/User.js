// Package
const sendResponse = require("../utils/sendResponse");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Model
const User = require("../models/User");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return sendResponse(res, 400, "User not found");
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Wrong password" });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return sendResponse(res, 200, "Login successfully", { user, token });
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
}

const register = async (req, res) => {
    try {
        if (req.body.password !== req.body.confirmPassword)
            return sendResponse(res, 400, "Password and confirm password not match");

        let founded = await User.findOne({ email: req.body.email });
        if (founded)
            return sendResponse(res, 400, "Email already exists");

        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = await new User(req.body).save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return sendResponse(res, 200, "Register successfully", { user, token });
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user)
            return sendResponse(res, 400, "No such user id found");
        return sendResponse(res, 200, "Get user successfully", user);
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
}

const getAllUsers = async (req, res) => {

}

const createUser = async (req, res) => {

}

const updateUser = async (req, res) => {

}

const deleteUser = async (req, res) => {

}

// Export
module.exports = { login, register, getUser, getAllUsers, createUser, updateUser, deleteUser };