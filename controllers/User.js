// Package
const sendResponse = require("../utils/sendResponse");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();

// Secret key
const key = process.env.JWT_SECRET

// Model
const User = require("../models/User");

const login = async (req, res) => {
    console.log("Login");
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return sendResponse(res, 400, "User not found");
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Wrong password" });
        const token = jwt.sign({ id: user._id }, key, { expiresIn: "1d" });
        return sendResponse(res, 200, "Login successfully", { token, name: user.fullname, role: user.role });
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
}

const register = async (req, res) => {
    console.log("Register");
    try {
        let founded = await User.findOne({ email: req.body.email });
        if (founded)
            return sendResponse(res, 400, "Email already exists");

        req.body.role = "client";
        req.body.activated = false;
        if (req.body.password !== req.body.confirmPassword)
            return sendResponse(res, 400, "Password and confirm password not match");

        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = await new User(req.body).save();
        const token = jwt.sign({ id: user._id }, key, { expiresIn: "1d" });
        return sendResponse(res, 200, "Register successfully", { user, token });
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
}

const getUser = async (req, res) => {
    console.log("Get User id");
    try {
        const user = await User.findById(req.params.id);
        if (!user)
            return sendResponse(res, 400, "No such user id found");
        return sendResponse(res, 200, "Get user successfully", user);
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
}

const getMyProfile = async (req, res) => {
    console.log("Get my Profile")
    try {
        return sendResponse(res, 200, "Get user successfully", req.user);
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
}

const updateMyProfile = async (req, res) => {
    console.log("Update my Profile")
    try {
        // allow user to update only these fields
        let allowed = ['fullname', 'password', 'newPassword', 'confirmPassword', 'address', 'phone', 'gender'];
        for (let key in req.body) {
            if (!allowed.includes(key))
                return sendResponse(res, 400, `Can't update ${key}`);
        }
        // if user want to update password
        if (req.body.password) {
            let match = await bcrypt.compare(req.body.password, req.user.password);
            if (!match)
                return sendResponse(res, 400, "Old password is wrong");
            if (!req.body.newPassword || !req.body.confirmPassword)
                return sendResponse(res, 400, "Please enter new password");
            // if user want to update password
            if (req.body.newPassword !== req.body.confirmPassword)
                return sendResponse(res, 400, "Password and confirm password not match");
            if (req.body.newPassword.length < 6)
                return sendResponse(res, 400, "Password must be at least 6 characters");
            req.body.password = await bcrypt.hash(req.body.newPassword, 10);
        }
        else if (req.body.newPassword || req.body.confirmPassword)
            return sendResponse(res, 400, "Please enter old password");
        // Update the user
        const newUser = await User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true });
        return sendResponse(res, 200, "Update user successfully", newUser);
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
}

const uploadMyAvatar = async (req, res) => {
    console.log("upload my Avatar")
    try {
        // delete old avatar
        if (req.user.avatar !== "defaultAvatar.png") {
            fs.unlinkSync('public/images/avatars/' + req.user.avatar, (err) => {
                if (err) {
                    return sendResponse(res, 500, err.message);
                }
            });
        }
        console.log(req.file);
        req.user.avatar = req.file.filename;
        await req.user.save();
        return sendResponse(res, 200, "Update avatar successfully", req.user);
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
}

const deleteMyAvatar = async (req, res) => {
    console.log("delete my Avatar")
    try {
        // delete old avatar
        if (req.user.avatar !== "defaultAvatar.png") {
            fs.unlinkSync('public/images/avatars/' + req.user.avatar, (err) => {
                if (err) {
                    return sendResponse(res, 500, err.message);
                }
            });
        }
        req.user.avatar = "defaultAvatar.png";
        await req.user.save();
        return sendResponse(res, 200, "Delete avatar successfully", req.user);
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
}

const getAllUsers = async (req, res) => {
    console.log("Get all users");
    try {
        const users = await User.find({});
        if (!users || users.length === 0)
            return sendResponse(res, 400, "No users found");
        return sendResponse(res, 200, "Get all users successfully", users);
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
}

const createUser = async (req, res) => {
    console.log("Create User");
    try {
        let founded = await User.findOne({ email: req.body.email });
        if (founded)
            return sendResponse(res, 400, "Email already exists");

        if (req.body.password !== req.body.confirmPassword)
            return sendResponse(res, 400, "Password and confirm password not match");
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = await new User(req.body).save();
        return sendResponse(res, 200, "Register successfully", { user});
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
}

const updateUser = async (req, res) => {
    console.log("Update User id")
    try {
        const user = await User.findOne({_id: req.params.id, 'role': { $ne: 'admin' }});
        if (!user)
            return sendResponse(res, 400, "No such user id found");
        // admin can update role and activated only
        let allowed = ['role', 'activated'];
        for (let key in req.body) {
            if (!allowed.includes(key))
                return sendResponse(res, 400, `Can't update ${key}`);
        }

        if (req.body.role !== 'client')
            req.body.activated = true;

        const newUser = await User.findOneAndUpdate({_id: req.params.id, 'role': { $ne: 'admin' }}, req.body, { new: true, runValidators: true });
        return sendResponse(res, 200, "Update user successfully", newUser);
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
}

const deleteUser = async (req, res) => {
    console.log("Delete User id")
    try {
        const user = await User.findById(req.params.id);
        if (!user)
            return sendResponse(res, 400, "No such user id found");

        if (user.role === 'admin')
            return sendResponse(res, 402, "Admin must not be deleted");
        await User.findByIdAndDelete(req.params.id);
        return sendResponse(res, 200, "Delete user successfully");
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
}

// Export
module.exports = { login, register, getUser, getMyProfile, updateMyProfile, uploadMyAvatar, deleteMyAvatar, getAllUsers, createUser, updateUser, deleteUser };