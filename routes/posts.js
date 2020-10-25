const express = require("express");
const router = express.Router();

const Post = require("../models/Post");
const { ensureAuth } = require("../middleware/auth")

// @desc    Show create post page
// @route   GET /posts/create
router.get("/create", ensureAuth, (req, res) => {
    res.render("posts/create");
});

// @desc    Handle create post
// @route   POST /posts/create
router.post("/create", ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user._id
        await Post.create(req.body);
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.render("errors/500");
    }
});

module.exports = router;
