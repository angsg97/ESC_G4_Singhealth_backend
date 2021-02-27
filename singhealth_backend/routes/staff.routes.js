module.exports = app => {
  const staff = require("../controllers/staff.controller.js");

  // Create a new Staff
  app.post("/staff", staff.create);

  // Retrieve all Staff
  app.get("/staff", staff.findAll);

  // Retrieve a single Staff with staffId
  app.get("/staff/:staffId", staff.findOne);

  // Update a Staff with staffId
  app.put("/staff/:staffId", staff.update);

  // Delete a Staff with staffId
  app.delete("/staff/:staffId", staff.delete);

  // Create a new Staff
  app.delete("/staff", staff.deleteAll);
};
