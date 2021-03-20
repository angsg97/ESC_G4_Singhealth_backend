// require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var mongoose = require("mongoose");
var dbConfig = require("./config/db.config.js");

// Set up MongoDB using credentials
const UserModel = require("./auth/auth.model");

mongoose.connect(
  dbConfig.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB has connected successfully");
    } else {
      console.log(err);
    }
  }
);
mongoose.set("useCreateIndex", true);

//mongoose.connection.on("error", (err) => console.log(err));

// Setup passport using auth.js
require("./auth/auth");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// root route
app.get("/", (req, res) => {
  res.json({ message: "YAYYY IT WORKS!!!\nRoot Access Successful" });
});

// TEMPORARY, add /login and /signup to routes
app.use("/", require("./routes/auth_route"));

// Set route paths based on paths in route_paths file
require(`./route_paths/route_paths`)(app, passport);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error:err});
});

module.exports = app;