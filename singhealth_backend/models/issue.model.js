const sql = require("./db.js");

// constructor
const Issue = function(issue) {
    this.id = issue.id;
    this.category = issue.category;
    this.description = issue.description;
    this.resolved = issue.resolved;
    this.duedate = issue.duedate;
    this.initialPhoto = issue.initialPhoto;
    this.responsePhoto = issue.responsePhoto;
    this.audit = issue.audit;
};

module.exports = Issue;