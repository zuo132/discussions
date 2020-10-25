const User = require("../models/User");

let user;
let isAuthenticated;

module.exports = {
    auth: async (req, res, next) => {
        const url = req.originalUrl;
        if (url === "/auth/signup") {
            try {
                user = await User.findOne({
                    username: req.body.username,
                }).lean();

                if (user) {
                    res.render("signup", {
                        isUsernameUsed: true,
                        username: req.body.username,
                        password: req.body.password,
                    });
                    return next();
                }

                await User.create(req.body);
                if (!req.user) {
                    req.user = user;
                }
                isAuthenticated = true;
            } catch (error) {
                console.error(error);
                res.render("errors/500");
            }
        } else if (url === "/auth/login") {
            try {
                user = await User.findOne({
                    username: req.body.username,
                }).lean();
                if (!user) {
                    res.render("login", {
                        isUserNotFound: true,
                        username: req.body.username,
                        password: req.body.password,
                    });
                    return next();
                }
                if (req.body.password !== user.password) {
                    res.render("login", {
                        isPasswordIncorrect: true,
                        username: req.body.username,
                        password: req.body.password,
                    });
                    return next();
                }
                if (!req.user) {
                    req.user = user;
                }
                isAuthenticated = true;
            } catch (error) {
                console.error(error);
                res.render("errors/500");
            }
        } else if (url ==="/auth/logout") {
            user = null;
            isAuthenticated = false;
        }
        req.user = user;
        req.isAuthenticated = isAuthenticated;
        next();
    },

    ensureAuth: (req, res, next) => {
        if (req.isAuthenticated) {
            next();
        } else {
            res.redirect("/");
        }
    },

    ensureGuest: (req, res, next) => {
        if (req.isAuthenticated) {
            res.redirect("/");
        } else {
            next();
        }
    },
};
