var express = require('express');
var router = express.Router();

// Require controller module
const staff_controller = require('../controllers/staff.controller');

/// STAFF ROUTES ///

// Create a new Staff
router.post("/", staff_controller.create);

// Retrieve all Staff
router.get("/", staff_controller.findAll);

// Retrieve a single Staff with staffId
router.get("/:staffId", staff_controller.findOne);

// Update a Staff with staffId
router.put("/:staffId", staff_controller.update);

// Delete a Staff with staffId
router.delete("/:staffId", staff_controller.delete);

// Create a new Staff
router.delete("/", staff_controller.deleteAll);

module.exports = router;