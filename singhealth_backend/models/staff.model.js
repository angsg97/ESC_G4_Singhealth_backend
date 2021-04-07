const QueryCollection = require("../modeller/modeller.js");

const TABLE = "staff";
const ID = `${TABLE}_id`;
const COLUMNS = require("../model_columns/staff.columns");

const Staff = new QueryCollection(
  {
    name: TABLE,
    name_id: ID,
    columns: COLUMNS,
  },
  {


    find_all_staff: {
      path: "GET /",
      query: "select_all",
      param: [{ none: null }],
      result: ["result_full"],
    },

    find_staff_by_staff_id_param: {
      path: `GET /${ID}_param`,
      query: "select_from_param_id",
      param: [{ query_param_id: null }],
      result: ["result_first"],
    },

    find_staff_by_institution_param: {
      path: `GET /institution_param`,
      query: "select_from_param_data",
      param: [{ query_param_data: "institution" }],
      result: ["result_full"],
    },

    find_staff_by_staff_id: {
      path: `GET /:${ID}`,
      query: "select_from_param_id",
      param: [{ param_id: null }],
      result: ["result_first"],
    },


    find_staff_by_institution: {
      path: `GET /institution/:institution`,
      query: "select_from_param_data",
      param: [{ param_data: "institution" }],
      result: ["result_full"],
    },


    update_staff_by_staff_id_param: {
      path: `PUT /${ID}_param`,
      query: "update_from_param_id",
      param: [{ body: null }, { query_param_id: null }],
      result: ["query_id", "body"],
    },

    update_staff_by_staff_id: {
      path: `PUT /:${ID}`,
      query: "update_from_param_id",
      param: [{ body: null }, { param_id: null }],
      result: ["param", "body"],
    },

    remove_staff_by_staff_id_param: {
      path: `DELETE /${ID}_param`,
      query: "remove_from_param_id",
      param: [{ query_param_id: null }],
      result: [{ message: "successfully deleted" }, "query_id"],
      admin: true
    },

    remove_staff_by_staff_id: {
      path: `DELETE /:${ID}`,
      query: "remove_from_param_id",
      param: [{ param_id: null }],
      result: [{ message: "successfully deleted" }, "param"],
      admin: true
    },

    create_staff: {
        path: "POST /",
        query: "insert_set_body",
        param: [{body: null}],
        result: ["insert_id", "body"],
        admin: true

    },

  }
);

module.exports = Staff;
