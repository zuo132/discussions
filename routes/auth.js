const express = require("express");
const router = express.Router();

const User = require("../models/User");

// @desc    Handle user sign up
// @route   POST /auth/signup
router.post("/signup", (req, res) => {
    if (req.isAuthenticated) res.redirect("/");
});

// @desc    Handle user log in
// @route   POST /auth/login
router.post("/login", (req, res) => {
    if (req.isAuthenticated) res.redirect("/");
});

// @desc    Handle user log out
// @route   GET /auth/logout
router.get("/logout", (req, res) => {
    res.redirect("/");
});

module.exports = router;
