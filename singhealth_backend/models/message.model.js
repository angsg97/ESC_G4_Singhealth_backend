const QueryCollection = require("./general.model.js");

const TABLE = "message";
const ID = `${TABLE}_id`;
const COLUMNS = {
    issue_id: {
        required: true
    },
    staff_id: {
        required: true
    },
    tenant_id: {
        required: true
    },
    time: {
        required: false,
        default: Date.now()
    },
    from_staff: {
        required: false,
        default: false
    },
    tag: {
        required: false,
        default: ""
    },
    info: {
        required: false,
        default: ""
    },
    body: {
        required: false,
        default: ""
    },
    photo: {
        required: false,
        default: null
    }

};

//find message after certain time

const Message = new QueryCollection({
    name: TABLE,
    name_id: ID,
    columns: COLUMNS
}, {

    create_message: {
        path: "POST /",
        query: "insert_set_body",
        param: [{body: null}],
        result: ["insert_id", "body"]

    },

    find_all_messages: {
        path: "GET /",
        query: "select_all",
        param: [{none: null}],
        result: ["result_full"]


    },


    find_message_by_message_id: {
        path: `GET /:${ID}`,
        query: "select_from_param_id",
        param: [{param_id: null}],
        result: ["result_first"]

    },


    find_message_by_issue_id: {
        path: `GET /issue_id/:issue_id`,
        query: "select_from_param_data",
        param: [{param_data: "issue_id"}],
        result: ["result_full"]

    },

    update_message_by_message_id: {
        path: `PUT /:${ID}`,
        query: "update_from_param_id",
        param: [{body: null},{param_id: null}],
        result: ["param", "body"]

    },


    remove_message_by_message_id: {
        path: `DELETE /:${ID}`,
        query: "remove_from_param_id",
        param: [{param_id: null}],
        result: [{message: "successfully deleted"}, "param"]

    }
});

module.exports = Message;
