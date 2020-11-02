const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const methodOverride = require("method-override")

const connectDB = require("./config/db");

// Load config
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

const app = express();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Morgan
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Handlebars helpers
const { stripTags, formatDate, truncate } = require("./helpers/hbs");

// Handlebars
app.engine(
    ".hbs",
    exphbs({
        helpers: {
            stripTags,
            formatDate,
            truncate,
        },
        defaultLayout: "main",
        extname: ".hbs",
    })
);
app.set("view engine", ".hbs");

// Authentication middleware
const { auth } = require("./middleware/auth");
app.use(auth);

// Set express global var for handlebars
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated || null;
    res.locals.user = req.user || null;
    next();
});

// Method Override
app.use(
    methodOverride(function (req, res) {
        if (req.body && typeof req.body === "object" && "_method" in req.body) {
            // look in urlencoded POST bodies and delete it
            let method = req.body._method;
            delete req.body._method;
            return method;
        }
    })
);

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/posts", require("./routes/posts"));
app.use("/user", require("./routes/user"));

// Static folder
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);
