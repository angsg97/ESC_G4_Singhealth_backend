const QueryCollection = require("../modeller/modeller.js");

const TABLE = "staff";
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
    }
};

const Staff = new QueryCollection(
  {
    name: TABLE,
    name_id: ID,
    columns: COLUMNS,
  },
  {
    create_staff: {
        path: "POST /",
        query: "insert_set_body",
        param: [{body: null}],
        result: ["insert_id", "body"],

    },

    find_all_staff: {
      path: "GET /",
      query: "select_all",
      param: [{ none: null }],
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

    find_staff_by_name_and_phone: {
      path: `GET /name/:name/phone/:phone`,
      query: "select_from_param_data",
      param: [{ param_data: "name" }, { param_data: "phone" }],
      result: ["result_full"],
    },

    update_staff_by_staff_id: {
      path: `PUT /:${ID}`,
      query: "update_from_param_id",
      param: [{ body: null }, { param_id: null }],
      result: ["param", "body"],
    },

    remove_staff_by_staff_id: {
      path: `DELETE /:${ID}`,
      query: "remove_from_param_id",
      param: [{ param_id: null }],
      result: [{ message: "successfully deleted" }, "param"],
    },
  }
);

module.exports = Staff;
