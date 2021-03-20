var express = require('express');
var router = express.Router();
//require the general controller
const ImageController = require("../controllers/image.controller.js");

router.post("/", ImageController.request);

module.exports = router;
