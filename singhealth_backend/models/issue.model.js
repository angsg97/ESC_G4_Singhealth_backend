const QueryCollection = require("../modeller/modeller.js");

const TABLE = "issue";
const ID = `${TABLE}_id`;
const COLUMNS = require("../model_columns/issue.columns");

const Issue = new QueryCollection(
  {
    name: TABLE,
    name_id: ID,
    columns: COLUMNS,
  },
  {
    create_issue: {
      path: "POST /",
      query: "insert_set_body",
      param: [{ body: null }],
      result: ["insert_id", "body"],
    },

    find_all_issues: {
      path: "GET /",
      query: "select_all",
      param: [{ none: null }],
      result: ["result_full"],
    },

    find_issue_by_issue_id_param: {
      path: `GET /${ID}_param`,
      query: "select_from_param_id",
      param: [{ query_param_id: null }],
      result: ["result_first"],
    },

    find_issue_by_audit_id_param: {
      path: `GET /audit_id_param`,
      query: "select_from_param_data",
      param: [{ query_param_data: "audit_id" }],
      result: ["result_full"],

    },

    find_issue_by_issue_id: {
      path: `GET /:${ID}`,
      query: "select_from_param_id",
      param: [{ param_id: null }],
      result: ["result_first"],
    },

    find_issue_by_audit_id: {
      path: `GET /audit_id/:audit_id`,
      query: "select_from_param_data",
      param: [{ param_data: "audit_id" }],
      result: ["result_full"],

    },

    update_issue_by_issue_id_param: {
      path: `PUT /${ID}_param`,
      query: "update_from_param_id",
      param: [{ body: null }, { query_param_id: null }],
      result: ["query_id", "body"],
    },

    update_issue_by_issue_id: {
      path: `PUT /:${ID}`,
      query: "update_from_param_id",
      param: [{ body: null }, { param_id: null }],
      result: ["param", "body"],
    },

    remove_issue_by_issue_id_param: {
      path: `DELETE /${ID}_param`,
      query: "remove_from_param_id",
      param: [{ query_param_id: null }],
      result: [{ message: "successfully deleted" }, "query_id"],
    },

    remove_issue_by_issue_id: {
      path: `DELETE /:${ID}`,
      query: "remove_from_param_id",
      param: [{ param_id: null }],
      result: [{ message: "successfully deleted" }, "param"],
    },
  }
);

module.exports = Issue;
