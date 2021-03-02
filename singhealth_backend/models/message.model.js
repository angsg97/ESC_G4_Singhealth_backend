const QueryCollection = require("./general.model.js");


const TABLE = "message";
const ID = `${TABLE}_id`;
const COLUMNS = [
    "tag",
    "staff_id",
    "tenant_id",
    "issue_id",
    "fromAuditor",
    "time",
    "body",
    "info"
];

const Message = new QueryCollection({
    name: "message"
}, {

    create: {
        type: "post",
        path: "/",
        query: `INSERT INTO ${TABLE} SET ?`,
        param: (req) => {
            return QueryCollection.filterColumns(COLUMNS, req.body);
        },
        resultReturn: (param, res, result) => {
            result(null, {[ID]: res.insertId, ...param});

        }
    },


    findAll: {
        type: "get",
        path: "/",
        query: `SELECT * FROM ${TABLE}`,
        param: (req) => {
            return "";
        },
        resultReturn: (param, res, result) => {
            result(null, res);
        }
    },


    findById: {
        type: "get",
        path: `/:${ID}`,
        query: `SELECT * FROM ${TABLE} WHERE ${ID} = ?`,
        param: (req) => {
            return req.params[ID];
        },
        resultReturn: (param, res, result) => {
            //not found
            if (!res.length) {
                result({kind: "id_not_found"}, null);
                return;
            }
            result(null, res[0]);
        }
    },

    findByIssueId: {
        type: "get",
        path: `/?issue_id`,
        query: `SELECT * FROM ${TABLE} WHERE issue_id = ?`,
        param: (req) => {
            return req.query.issue_id;
        },
        resultReturn: (param, res, result) => {
            //not found
            if (!res.length) {
                result({
                    kind: "id_not_found",
                    type: "issue_id"
                }, null);
                return;
            }
            result(null, res[0]);
        }
    },


    updateById: {
        type: "put",
        path: `/:${ID}`,
        query: `UPDATE ${TABLE} SET ? WHERE ${ID} = ?`,
        param: (req) => {
            return [QueryCollection.filterColumns(COLUMNS, req.body),
                req.params[ID]];
        },
        resultReturn: (param, res, result) => {
            //nothing changed
            if (res.affectedRows == 0) {
                result({ kind: "id_not_found" }, null);
                return;
            }
            result(null, {[ID]: res.insertId, ...param[0]});
        }
    },


    removeById: {
        type: "delete",
        path: `/:${ID}`,
        query: `DELETE FROM ${TABLE} WHERE ${ID} = ?`,
        param: (req) => {
            return req.params[ID];
        },
        resultReturn: (param, res, result) => {
            //nothing changed
            if (res.affectedRows == 0) {
                result({ kind: "id_not_found" }, null);
                return;
            }
            result(null, `deleted ${ID} ${param} from ${TABLE}`);
        }
    }

});

module.exports = Message;
