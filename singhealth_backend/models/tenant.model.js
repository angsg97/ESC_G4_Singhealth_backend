const sql = require("./db.js");

// constructor
const Tenant = function(tenant) {
    this.id = tenant.id;
    this.name = tenant.name;
    this.phone = tenant.phone;
    this.email = tenant.email;
    this.institution = tenant.institution;
    this.fnb = tenant.fnb;
    this.floor = tenant.floor;
    this.unit = tenant.unit;
};

module.exports = Tenant;