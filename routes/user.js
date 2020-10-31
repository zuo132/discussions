const express = require("express");
const router = express.Router();

const { ensureAuth } = require("../middleware/auth");
const Post = require("../models/Post");

// @desc    Show users own posts
// @route   GET /user/posts
router.get("/posts", ensureAuth, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user._id })
            .sort({ createdAt: "desc" })
            .lean();
        res.render("user/own_posts", { user: req.user, posts })
    } catch (error) {
        console.error(error);
        res.render("errors/500");
    }
});

module.exports = router;
