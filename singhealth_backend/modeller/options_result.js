module.exports = (model) => {
    return {
        result_full: (req, res) => {
            return res;
        },

        result_full_split_audit_staff: (req, res) => {
            var returnObject = {};
            for(let i in res){

                let audit = res[i];

                let auditObject = {};
                let auditColumns = require("../model_columns/audit.columns");
                for(let audit_property of Object.keys(auditColumns)){
                    auditObject[audit_property] = audit[audit_property];
                }

                let foreignObject = {};
                let foreignColumns = require("../model_columns/staff.columns");
                for(let foreign_property of Object.keys(foreignColumns)){
                    foreignObject[foreign_property] = audit[foreign_property];
                }

                returnObject[i] = {
                    audit: auditObject,
                    staff: foreignObject
                };

            }
            return returnObject;
        },

        result_full_split_audit_tenant: (req, res) => {
            var returnObject = {};
            for(let i in res){

                let audit = res[i];

                let auditObject = {};
                let auditColumns = require("../model_columns/audit.columns");
                for(let audit_property of Object.keys(auditColumns)){
                    auditObject[audit_property] = audit[audit_property];
                }

                let foreignObject = {};
                let foreignColumns = require("../model_columns/tenant.columns");
                for(let foreign_property of Object.keys(foreignColumns)){
                    foreignObject[foreign_property] = audit[foreign_property];
                }

                returnObject[i] = {
                    audit: auditObject,
                    tenant: foreignObject
                };

            }
            return returnObject;
        },

        result_first: (req, res) => {
            return res[0];
        },

        param: (req, res) => {
            if(req.params[model.name_id] !== undefined){
                req.params[model.name_id] = parseInt(req.params[model.name_id]);
            }
            return req.params;
        },

        query_id: (req, res) => {
            return {[model.name_id]: parseInt(req.query[model.name_id])}
        },

        body: (req, res) => {
            return req.body;
        },

        insert_id: (req, res) => {
            return {[model.name_id]: parseInt(res.insertId)};
        }

    }
}
