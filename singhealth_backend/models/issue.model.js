const QueryCollection = require("./general.model.js");

const TABLE = "issue";
const ID = `${TABLE}_id`;
const COLUMNS = [
    "category",
    "description",
    "resolved",
    "duedate",
    "initialPhoto",
    "responsePhoto",
    "audit_id"
];

const Issue = new QueryCollection({
    name: TABLE,
    name_id: ID,
    columns: COLUMNS
}, {

    create: {
        path: "POST /",
        query: "insert_set_body",
        param: [{body: null}],
        result: ["insert_id", "body"]

    },

    findAll: {
        path: "GET /",
        query: "select_all",
        param: [{none: null}],
        result: ["result_full"]


    },


    findById: {
        path: `GET /:${ID}`,
        query: "select_from_param_id",
        param: [{param_id: null}],
        result: ["result_first"]

    },


    findByAuditId: {
        path: `GET /audit_id/:audit_id`,
        query: {
            query: "select_from_param_data",
            param: [{param_data: "audit_id"}],
            result: ["result_full"]
        }
    },


    updateById: {
        path: `PUT /:${ID}`,
        query: "update_from_param_id",
        param: [{body: null},{param_id: null}],
        result: ["param", "body"]

    },


    removeById: {
        path: `DELETE /:${ID}`,
        query: "remove_from_param_id",
        param: [{param_id: null}],
        result: [{message: "successfully deleted"}, "param"]

    }
});

module.exports = Issue;
