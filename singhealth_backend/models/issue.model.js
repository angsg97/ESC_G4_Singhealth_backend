const QueryCollection = require("./general.model.js");

const TABLE = "issue";
const ID = `${TABLE}_id`;
const COLUMNS = [
    "category",
    "description",
    "resolved",
    "duedate",
    "initialPhoto",
    "responsePhoto",
    "audit_id"
];

const Issue = new QueryCollection({
    name: "issue"
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

    findByAuditId: {
        type: "get",
        path: `/?audit_id`,
        query: `SELECT * FROM ${TABLE} WHERE audit_id = ?`,
        param: (req) => {
            return req.query.audit_id;
        },
        resultReturn: (param, res, result) => {
            //not found
            if (!res.length) {
                result({
                    kind: "not_found",
                    type: "audit_id"
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

module.exports = Issue;
