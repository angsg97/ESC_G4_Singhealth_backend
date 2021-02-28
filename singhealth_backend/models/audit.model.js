const sql = require("./db.js");

// constructor
const Audit = function(audit) {
    this.id = audit.id;
    this.auditor = audit.auditor;
    this.tenant = audit.tenant;
    this.time = audit.time;
    this.score = audit.score;
    this.fnb = audit.fnb;
};

module.exports = Audit;