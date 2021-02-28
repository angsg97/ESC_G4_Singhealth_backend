const sql = require("./db.js");

// constructor
const Message = function(message) {
    this.id = message.id;
    this.tag = message.tag;
    this.auditor = message.auditor;
    this.tenant = message.tenant;
    this.issue = message.issue;
    this.fromAuditor = message.fromAuditor;
    this.time = message.time;
    this.body = message.body;
    this.info = message.info;
};

module.exports = Message;