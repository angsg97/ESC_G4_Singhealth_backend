const QueryCollection = require("./general.model.js");

const TABLE = "tenant";
const ID = `${TABLE}_id`;
const COLUMNS = {
    name: {
        required: true
    },
    phone: {
        required: true
    },
    email: {
        required: true
    },
    institution: {
        required: true
    },
    fnb: {
        required: false,
        default: false
    },
    unit: {
        required: true
    }
};

const Tenant = new QueryCollection({
    name: TABLE,
    name_id: ID,
    columns: COLUMNS
}, {

    create_tenant: {
        path: "POST /",
        query: "insert_set_body",
        param: [{body: null}],
        result: ["insert_id", "body"]
    },

    find_all_tenant: {
        path: "GET /",
        query: "select_all",
        param: [{none: null}],
        result: ["result_full"]

    },


    find_tenant_by_tenant_id: {
        path: `GET /:${ID}`,
        query: "select_from_param_id",
        param: [{param_id: null}],
        result: ["result_first"]

    },


    find_tenant_by_institution: {
        path: `GET /institution/:institution`,
        query: "select_from_param_data",
        param: [{param_data: "institution"}],
        result: ["result_full"]

    },

    update_tenant_by_tenant_id: {
        path: `PUT /:${ID}`,
        query: "update_from_param_id",
        param: [{body: null},{param_id: null}],
        result: ["param", "body"]

    },


    remove_tenant_by_tenant_id: {
        path: `DELETE /:${ID}`,
        query: "remove_from_param_id",
        param: [{param_id: null}],
        result: [{message: "successfully deleted"}, "param"]

    }
});

module.exports = Tenant;
