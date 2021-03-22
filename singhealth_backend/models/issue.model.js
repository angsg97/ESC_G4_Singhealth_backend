const QueryCollection = require("./general.model.js");

const TABLE = "issue";
const ID = `${TABLE}_id`;
const COLUMNS = {
    audit_id: {
        required: true
    },
    category: {
        required: true
    },
    description: {
        required: true
    },
    due_date: {
        required: true
    },
    resolved: {
        required: false,
        default: false
    }
}

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

    find_issue_by_issue_id: {
      path: `GET /:${ID}`,
      query: "select_from_param_id",
      param: [{ param_id: null }],
      result: ["result_first"],
    },

    find_issue_by_audit_id: {
      path: `GET /audit_id/:audit_id`,
      query: {
        query: "select_from_param_data",
        param: [{ param_data: "audit_id" }],
        result: ["result_full"],
      },
    },

    update_issue_by_issue_id: {
      path: `PUT /:${ID}`,
      query: "update_from_param_id",
      param: [{ body: null }, { param_id: null }],
      result: ["param", "body"],
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
