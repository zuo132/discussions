const express = require("express");
const router = express.Router();

const Post = require("../models/Post");
const { ensureAuth } = require("../middleware/auth");

// @desc    Show create post page
// @route   GET /posts/create
router.get("/create", ensureAuth, (req, res) => {
    res.render("posts/create");
});

// @desc    Show posts from a user
// @route   GET /posts/:id
router.get("/:id", async (req, res) => {
    try {
        const posts = await Post.find({ user: req.params.id }, null, {
            limit: 10,
        })
            .populate("user")
            .sort({ createdAt: "desc" })
            .lean();
        res.render("home", { posts });
    } catch (error) {
        console.error(error);
        res.render("errors/500");
    }
});

// @desc    Show post details page
// @route   GET /posts/show/:id
router.get("/show/:id", async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id })
            .populate("user")
            .lean();
        res.render("posts/show", { post });
    } catch (error) {
        console.error(error);
        res.render("errors/500");
    }
});

// @desc    Handle create post
// @route   POST /posts/create
router.post("/create", ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user._id;
        await Post.create(req.body);
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.render("errors/500");
    }
});

module.exports = router;
