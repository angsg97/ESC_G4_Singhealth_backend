const QueryCollection = require("./general.model.js");

const TABLE = "audit";
const ID = `${TABLE}_id`;
const COLUMNS = {

    staff_id: {
        required: true
    },
    tenant_id: {
        required: true
    },
    time: {
        required: false,
        default: "Date.now()"
    },
    score: {
        required: true
    },
    fnb: {
        required: false,
        default: false
    }
};

const Audit = new QueryCollection(
  {
    name: TABLE,
    name_id: ID,
    columns: COLUMNS,
  },
  {
    create_audit: {
      path: "POST /",
      query: "insert_set_body",
      param: [{ body: null }],
      result: ["insert_id", "body"],
    },

    find_all_audits: {
      path: "GET /",
      query: "select_all",
      param: [{ none: null }],
      result: ["result_full"],
    },

    find_audit_by_audit_id: {
      path: `GET /:${ID}`,
      query: "select_from_param_id",
      param: [{ param_id: null }],
      result: ["result_first"],
    },

    find_audit_by_staff_id: {
      path: `GET /staff_id/:staff_id`,
      query: {
        query: "select_from_param_data",
        param: [{ param_data: "staff_id" }],
        result: ["result_full"],
      },
    },

    find_audit_by_tenant_id: {
      path: `GET /tenant_id/:tenant_id`,
      query: "select_from_param_data",
      param: [{ param_data: "tenant_id" }],
      result: ["result_full"],
    },

    find_audit_by_greater_than_time: {
        path: `GET /time/:time`,
        query: "select_from_data_param_greater_than",
        param: [{data: "time"}, {param_data: "time"}],
        result: ["result_full"]

    },


    update_audit_by_audit_id: {
      path: `PUT /:${ID}`,
      query: "update_from_param_id",
      param: [{ body: null }, { param_id: null }],
      result: ["param", "body"],
    },

    remove_audit_by_audit_id: {
      path: `DELETE /:${ID}`,
      query: "remove_from_param_id",
      param: [{ param_id: null }],
      result: [{ message: "successfully deleted" }, "param"],
    },
  }
);

module.exports = Audit;
