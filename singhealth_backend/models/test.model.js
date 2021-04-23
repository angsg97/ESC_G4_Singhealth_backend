const QueryCollection = require("../modeller/modeller.js");

const TABLE = "staff";
const ID = `${TABLE}_id`;
const COLUMNS = require("../model_columns/staff.columns");

const TestStaff = new QueryCollection(
  {
    name: TABLE,
    name_id: ID,
    columns: COLUMNS,
  },
  {

      path_doesnt_have_a_slash: {
        path: "GET wheeeee",
        query: "select_all",
        param: [{ none: null }],
        result: ["result_full"],
      },

  }
);

module.exports = TestStaff;
