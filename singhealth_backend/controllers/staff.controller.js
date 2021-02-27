const Staff = require("../models/staff.model.js");

// Create and Save a new Staff
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Staff
    const staff = new Staff({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        institution: req.body.institution,
    });

    // Save Staff in the database
    Staff.create(staff, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Staff."
        });
        else res.send(data);
    });
};

// Retrieve all Staff from the database.
exports.findAll = (req, res) => {
    Staff.getAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Staff."
        });
        else res.send(data);
    });
};

// Find a single Staff with a staffId
exports.findOne = (req, res) => {
    Staff.findById(req.params.staffId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Staff with id ${req.params.staffId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Staff with id " + req.params.staffId
                });
            }
        } else res.send(data);
    });
};

// Update a Staff identified by the staffId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Staff.updateById(
        req.params.staffId,
        new Staff(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Staff with id ${req.params.staffId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Staff with id " + req.params.staffId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Staff with the specified staffId in the request
exports.delete = (req, res) => {
    Staff.remove(req.params.staffId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Staff with id ${req.params.staffId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Staff with id " + req.params.staffId
                });
            }
        } else res.send({ message: `Staff was deleted successfully!` });
    });
};

// Delete all Staff from the database.
exports.deleteAll = (req, res) => {
    Staff.removeAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all staff."
        });
        else res.send({ message: `All Staff were deleted successfully!` });
    });
};
