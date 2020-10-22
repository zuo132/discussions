const express = require("express");
const router = express.Router();

// @desc    Landing page
// @route   GET /
router.get("/", (req, res) => {
    res.render("home");
});

// @desc    Log in page
// @route   GET /login
router.get("/login", (req, res) => {
    res.render("login")
})

// @desc    Sign up page
// @route   GET /signup
router.get("/signup", (req, res) => {
    res.render("signup")
})


module.exports = router;
