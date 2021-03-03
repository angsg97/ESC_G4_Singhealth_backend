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
        type: "post",
        path: "/",
        query: {
            type: "insert_set_body",
            param: [{body: null}],
            result: ["insert_id", "body"]
        }
    },

    findAll: {
        type: "get",
        path: "/",
        query: {
            type: "select_all",
            param: [{none: null}],
            result: ["result_full"]

        }
    },


    findById: {
        type: "get",
        path: `/:${ID}`,
        query: {
            type: "select_from_param_id",
            param: [{param_id: null}],
            result: ["result_first"]
        }
    },


    findByInstitution: {
        type: "get",
        path: `/institution/:institution`,
        query: {
            type: "select_from_param_data",
            param: [{param_data: "institution"}],
            result: ["result_full"]
        }
    },

    findByNameAndPhone: {
        type: "get",
        path: `/name/:name/phone/:phone`,
        query: {
            type: "select_from_param_data",
            param: [{param_data: "name"}, {param_data: "phone"}],
            result: ["result_full"]
        }
    },

    updateById: {
        type: "put",
        path: `/:${ID}`,
        query: {
            type: "update_from_param_id",
            param: [{body: null},{param_id: null}],
            result: ["param", "body"]
        }
    },


    removeById: {
        type: "delete",
        path: `/:${ID}`,
        query: {
            type: "remove_from_param_id",
            param: [{param_id: null}],
            result: [{message: "successfully deleted"}, "param"]
        }
    }
});

module.exports = Issue;
