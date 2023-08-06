// Package
const express = require("express");

// Router
const router = express.Router();

// Controller
const { login, register, getUser, getAllUsers, createUser, updateUser, deleteUser } = require("../controllers/User");

// Middleware
const checkAdmin = require("../middlewares/checkAdmin");
const checkAuth = require("../middlewares/checkAuth");

// Routes
router.post("/login", login);
router.post("/register", register);
// router.get("/:id", checkAuth, checkAdmin, getUser);
// router.get("/", checkAuth, checkAdmin, getAllUsers);
// router.post("/", checkAuth, checkAdmin, createUser);
// router.put("/:id", checkAuth, checkAdmin, updateUser);
// router.delete("/:id", checkAuth, checkAdmin, deleteUser);

// Export
module.exports = router;