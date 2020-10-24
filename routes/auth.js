const express = require("express")
const router = express.Router();

const User = require("../models/User")

// @desc    Handle user sign up
// @route   GET /auth/signup
router.post("/signup", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (user) {
            return res.render("signup", {
                isUsernameUsed: true
            })
        }

        await User.create(req.body)
        res.redirect("/");
    } catch (error) {
        console.error(error)
        res.render("errors/500")
    }
})

module.exports = router;