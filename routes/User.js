// Package
const express = require("express");

// Router
const router = express.Router();

// Controller
const { login, register, getUser, getMyProfile, updateMyProfile, uploadMyAvatar, deleteMyAvatar, getAllUsers, createUser, updateUser, deleteUser } = require("../controllers/User");

// Middleware
const checkAdmin = require("../middlewares/checkAdmin");
const checkAuth = require("../middlewares/checkAuth");

// Multer
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/avatars'); // Store avatars in the 'public/avatars' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filenames
    }
});

const upload = multer({ storage });

// Routes
router.post("/login", login);
router.post("/register", register);
router.get("/me", checkAuth, getMyProfile);
router.put("/me", checkAuth, updateMyProfile);
router.put("/me/avatar", checkAuth, upload.single('avatar'), uploadMyAvatar);
router.delete("/me/avatar", checkAuth, deleteMyAvatar);
router.get("/:id", checkAuth, checkAdmin, getUser);
router.get("/", checkAuth, checkAdmin, getAllUsers);
router.post("/", checkAuth, checkAdmin, createUser);
router.put("/:id", checkAuth, checkAdmin, updateUser);
router.delete("/:id", checkAuth, checkAdmin, deleteUser);

// Export
module.exports = router;