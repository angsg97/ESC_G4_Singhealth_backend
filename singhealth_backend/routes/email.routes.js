var express = require('express');
var router = express.Router();
//require the general controller
const EmailController = require("../controllers/email.controller.js");

router.post("/", EmailController.request);

module.exports = router;
