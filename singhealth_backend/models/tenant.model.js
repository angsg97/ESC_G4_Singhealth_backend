const QueryCollection = require("../modeller/modeller.js");

const TABLE = "tenant";
const ID = `${TABLE}_id`;
const COLUMNS = require("../model_columns/tenant.columns");

const Tenant = new QueryCollection(
  {
    name: TABLE,
    name_id: ID,
    columns: COLUMNS,
  },
  {


    find_all_tenant: {
      path: "GET /",
      query: "select_all",
      param: [{ none: null }],
      result: ["result_full"],
    },

    find_tenant_by_tenant_id_param: {
      path: `GET /${ID}_param`,
      query: "select_from_param_id",
      param: [{ query_param_id: null }],
      result: ["result_first"],
    },

    find_tenant_by_institution_param: {
      path: `GET /institution_param`,
      query: "select_from_param_data",
      param: [{ query_param_data: "institution" }],
      result: ["result_full"],
    },

    find_tenant_by_email_param: {
      path: `GET /email_param`,
      query: "select_from_param_data",
      param: [{ query_param_data: "email" }],
      result: ["result_full"],
    },

    find_tenant_by_tenant_id: {
      path: `GET /:${ID}`,
      query: "select_from_param_id",
      param: [{ param_id: null }],
      result: ["result_first"],
    },

    find_tenant_by_institution: {
      path: `GET /institution/:institution`,
      query: "select_from_param_data",
      param: [{ param_data: "institution" }],
      result: ["result_full"],
    },

    find_tenant_by_email: {
      path: `GET /email/:email`,
      query: "select_from_param_data",
      param: [{ param_data: "email" }],
      result: ["result_full"],
    },

    update_tenant_by_tenant_id_param: {
      path: `PUT /${ID}_param`,
      query: "update_from_param_id",
      param: [{ body: null }, { query_param_id: null }],
      result: ["query_id", "body"],
    },

    update_tenant_by_tenant_id: {
      path: `PUT /:${ID}`,
      query: "update_from_param_id",
      param: [{ body: null }, { param_id: null }],
      result: ["param", "body"],
    },

    remove_tenant_by_tenant_id_param: {
      path: `DELETE /${ID}_param`,
      query: "remove_from_param_id",
      param: [{ query_param_id: null }],
      result: [{ message: "successfully deleted" }, "query_id"],
      admin: true
    },

    remove_tenant_by_tenant_id: {
      path: `DELETE /:${ID}`,
      query: "remove_from_param_id",
      param: [{ param_id: null }],
      result: [{ message: "successfully deleted" }, "param"],
      admin: true
    },

    create_tenant: {
      path: "POST /",
      query: "insert_set_body",
      param: [{ body: null }],
      result: ["insert_id", "body"],
      admin: true
    },

  }
);

module.exports = Tenant;
