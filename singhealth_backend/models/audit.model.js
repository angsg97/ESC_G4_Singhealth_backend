const QueryCollection = require("../modeller/modeller.js");

const TABLE = "audit";
const ID = `${TABLE}_id`;
const COLUMNS = require("../model_columns/audit.columns");

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

    find_all_audits_append_tenant_data: {
      path: "GET /append_tenant_data",
      query: "select_all_join_table",
      param: [
          { data: "tenant" },
          { data: "audit.tenant_id" },
          { data: "tenant.tenant_id" }
      ],
      result: ["result_full"],
    },

    find_all_audits_append_staff_data: {
      path: "GET /append_staff_data",
      query: "select_all_join_table",
      param: [
          { data: "staff" },
          { data: "audit.staff_id" },
          { data: "staff.staff_id" }
      ],
      result: ["result_full"],
    },

    find_audit_by_audit_id_param: {
      path: `GET /${ID}_param`,
      query: "select_from_param_id",
      param: [{ query_param_id: null }],
      result: ["result_first"],
    },

    find_audit_by_staff_id_param: {
      path: `GET /staff_id_param`,
      query: "select_from_param_data",
      param: [{ query_param_data: "staff_id" }],
      result: ["result_first"],
    },

    find_audit_by_tenant_id_param: {
      path: `GET /tenant_id_param`,
      query: "select_from_param_data",
      param: [{ query_param_data: "tenant_id" }],
      result: ["result_first"],
    },

    find_audit_by_greater_than_time_param: {
        path: `GET /time_param`,
        query: "select_from_data_param_greater_than",
        param: [{data: "time"}, {query_param_data: "time"}],
        result: ["result_full"]

    },

    find_audit_by_audit_id: {
      path: `GET /:${ID}`,
      query: "select_from_param_id",
      param: [{ param_id: null }],
      result: ["result_first"],
    },

    find_audit_by_staff_id: {
      path: `GET /staff_id/:staff_id`,
      query: "select_from_param_data",
      param: [{ param_data: "staff_id" }],
      result: ["result_full"],
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

    update_audit_by_audit_id_param: {
      path: `PUT /${ID}_param`,
      query: "update_from_param_id",
      param: [{ body: null }, { query_param_id: null }],
      result: ["query_id", "body"],
    },

    update_audit_by_audit_id: {
      path: `PUT /:${ID}`,
      query: "update_from_param_id",
      param: [{ body: null }, { param_id: null }],
      result: ["param", "body"],
    },

    remove_audit_by_audit_id_param: {
      path: `DELETE /${ID}_param`,
      query: "remove_from_param_id",
      param: [{ query_param_id: null }],
      result: [{ message: "successfully deleted" }, "query_id"],
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
