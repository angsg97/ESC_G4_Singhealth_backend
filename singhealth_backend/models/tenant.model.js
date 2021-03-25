const QueryCollection = require("../modeller/modeller.js");

const TABLE = "tenant";
const ID = `${TABLE}_id`;
const COLUMNS = {
    name: {
        required: true,
        type: "plain text"
    },
    phone: {
        required: true,
        type: "phone"
    },
    email: {
        required: true,
        type: "email"
    },
    institution: {
        required: true,
        type: "plain text"
    },
    fnb: {
        required: false,
        default: false,
        type: "boolean"
    },
    unit: {
        required: true,
        type: "unit"
    },
    image_logo: {
        required: false,
        default: "",
        type: "url"
    },
    image_location: {
        required: false,
        default: "",
        type: "url"
    },
    contract_date: {
        required: true,
        type: "timestamp"
    }
};

const Tenant = new QueryCollection(
  {
    name: TABLE,
    name_id: ID,
    columns: COLUMNS,
  },
  {
    create_tenant: {
      path: "POST /",
      query: "insert_set_body",
      param: [{ body: null }],
      result: ["insert_id", "body"],
    },

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

    update_tenant_by_param_tenant_id: {
      path: `PUT /${ID}_param`,
      query: "update_from_param_id",
      param: [{ body: null }, { query_param_id: null }],
      result: ["query_id", "body"],
    },

    update_tenant_by_tenant_id_param: {
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
    },

    remove_tenant_by_tenant_id: {
      path: `DELETE /:${ID}`,
      query: "remove_from_param_id",
      param: [{ param_id: null }],
      result: [{ message: "successfully deleted" }, "param"],
    },
  }
);

module.exports = Tenant;
