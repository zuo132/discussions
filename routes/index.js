const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

const { ensureGuest } = require("../middleware/auth");

// @desc    Landing page
// @route   GET /
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find({}, null, { limit: 10 })
            .populate("user")
            .sort({ createAT: "desc" })
            .lean();
            
        res.render("home", { posts });
    } catch (error) {
        console.error(error);
        res.render("errors/500");
    }
});

// @desc    Log in page
// @route   GET /login
router.get("/login", ensureGuest, (req, res) => {
    res.render("login");
});

// @desc    Sign up page
// @route   GET /signup
router.get("/signup", ensureGuest, (req, res) => {
    res.render("signup");
});

module.exports = router;
