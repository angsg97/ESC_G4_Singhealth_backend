const QueryCollection = require("./general.model.js");

const TABLE = "tenant";
const ID = `${TABLE}_id`;
const COLUMNS = [
    "name",
    "phone",
    "email",
    "institution",
    "fnb",
    "floor",
    "unit"
];

const Tenant = new QueryCollection({
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


    findByInstitution: {
        path: `GET /institution/:institution`,
        query: "select_from_param_data",
        param: [{param_data: "institution"}],
        result: ["result_full"]

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

module.exports = Tenant;
