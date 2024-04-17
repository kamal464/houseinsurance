// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const { verifyToken } = require("../Middleware/authMiddleware");

// Signup route with verifyToken middleware
router.post("/signup",  authController.signup);

// Login route with verifyToken middleware
router.post("/login",  authController.login);

module.exports = router;
