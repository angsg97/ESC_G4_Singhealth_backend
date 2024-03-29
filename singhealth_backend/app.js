// require("dotenv").config();

if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");
var session = require("express-session");
var passport = require("passport");
var logger = require("morgan");
var fileUpload = require("express-fileupload");

var mongoose = require("mongoose");

// Set up MongoDB using credentials if not testing
if(process.env.NODE_ENV !== "test"){
  mongoose.connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    },
    (err) => {
      if (!err) {
        console.log("MongoDB has connected successfully");
      } else {
        console.log(err);
      }
    }
  );
}

// Setup passport using auth.js
require("./auth/auth");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// parse requests of content-type: file
app.use(fileUpload());

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// root route
app.get("/", (req, res) => {
  res.json({ message: "YAYYY IT WORKS!!!\nRoot Access Successful" });
});

// Set route paths based on paths in route_paths file
require(`./route_paths/route_paths`)(app, passport);

// Set Port to listen to if in production, otherwise run bin/www in dev
if(process.env.NODE_ENV === "production"){
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  })
}

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
  res.json({ error: err });
});

module.exports = app;