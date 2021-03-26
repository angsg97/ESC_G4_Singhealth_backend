const QueryCollection = require("../modeller/modeller.js");

const TABLE = "message";
const ID = `${TABLE}_id`;
const COLUMNS = {
    issue_id: {
        required: true,
        type: "id"
    },
    staff_id: {
        required: true,
        type: "id"
    },
    tenant_id: {
        required: true,
        type: "id"
    },
    time: {
        required: false,
        default: "Date.now()",
        type: "timestamp"
    },
    from_staff: {
        required: false,
        default: false,
        type: "boolean"
    },
    tag: {
        required: false,
        default: "",
        type: "any text"
    },
    info: {
        required: false,
        default: "",
        type: "any text"
    },
    body: {
        required: false,
        default: "",
        type: "any text"
    },
    image: {
        required: false,
        default: "",
        type: "url"
    }

};

//find message after certain time

const Message = new QueryCollection(
  {
    name: TABLE,
    name_id: ID,
    columns: COLUMNS,
  },
  {
    create_message: {
      path: "POST /",
      query: "insert_set_body",
      param: [{ body: null }],
      result: ["insert_id", "body"],
    },

    find_all_messages: {
      path: "GET /",
      query: "select_all",
      param: [{ none: null }],
      result: ["result_full"],
    },

    find_message_by_message_id_param: {
      path: `GET /${ID}_param`,
      query: "select_from_param_id",
      param: [{ query_param_id: null }],
      result: ["result_first"],
    },

    find_message_by_issue_id_param: {
        path: `GET /issue_id_param`,
        query: "select_from_param_data",
        param: [{query_param_data: "issue_id"}],
        result: ["result_full"]
    },

    find_message_by_greater_than_time_and_issue_id_param: {
        path: `GET /time_issue_id_param`,
        query: "select_from_data_param_greater_than_and_param_data",
        param: [{data: "time"}, {query_param_value_parse_int: "time"}, {query_param_data: "issue_id"}],
        result: ["result_full"]
    },

    find_message_by_greater_than_time_and_staff_id_param: {
        path: `GET /time_staff_id_param`,
        query: "select_from_data_param_greater_than_and_param_data",
        param: [{data: "time"}, {query_param_value_parse_int: "time"}, {query_param_data: "staff_id"}],
        result: ["result_full"]
    },

    find_message_by_greater_than_time_and_tenant_id_param: {
        path: `GET /time_tenant_id_param`,
        query: "select_from_data_param_greater_than_and_param_data",
        param: [{data: "time"}, {query_param_value_parse_int: "time"}, {query_param_data: "tenant_id"}],
        result: ["result_full"]
    },

    find_message_by_message_id: {
      path: `GET /:${ID}`,
      query: "select_from_param_id",
      param: [{ param_id: null }],
      result: ["result_first"],
    },

    find_message_by_issue_id: {
        path: `GET /issue_id/:issue_id`,
        query: "select_from_param_data",
        param: [{param_data: "issue_id"}],
        result: ["result_full"]
    },

    find_message_by_greater_than_time_and_issue_id: {
        path: `GET /time/:time/issue_id/:issue_id`,
        query: "select_from_data_param_greater_than_and_param_data",
        param: [{data: "time"}, {param_value_parse_int: "time"}, {param_data: "issue_id"}],
        result: ["result_full"]
    },

    find_message_by_greater_than_time_and_staff_id: {
        path: `GET /time/:time/staff_id/:staff_id`,
        query: "select_from_data_param_greater_than_and_param_data",
        param: [{data: "time"}, {param_value_parse_int: "time"}, {param_data: "staff_id"}],
        result: ["result_full"]
    },

    find_message_by_greater_than_time_and_tenant_id: {
        path: `GET /time/:time/tenant_id/:tenant_id`,
        query: "select_from_data_param_greater_than_and_param_data",
        param: [{data: "time"}, {param_value_parse_int: "time"}, {param_data: "tenant_id"}],
        result: ["result_full"]
    },

    update_message_by_message_id_param: {
      path: `PUT /${ID}_param`,
      query: "update_from_param_id",
      param: [{ body: null }, { query_param_id: null }],
      result: ["query_id", "body"],
    },

    update_message_by_message_id: {
      path: `PUT /:${ID}`,
      query: "update_from_param_id",
      param: [{ body: null }, { param_id: null }],
      result: ["param", "body"],
    },

    remove_message_by_message_id_param: {
      path: `DELETE /${ID}_param`,
      query: "remove_from_param_id",
      param: [{ query_param_id: null }],
      result: [{ message: "successfully deleted" }, "query_id"],
    },

    remove_message_by_message_id: {
      path: `DELETE /:${ID}`,
      query: "remove_from_param_id",
      param: [{ param_id: null }],
      result: [{ message: "successfully deleted" }, "param"],
    },
  }
);

module.exports = Message;
