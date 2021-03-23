module.exports = (model) => {
    return {
        param_id_not_found: (res, result, param) => {
            //not found
            if (!res.length) {
                result({
                    kind: "id_not_found"
                }, null);
                return false;
            }
            return true;
        },

        param_data_not_found: (res, result, param) => {
            //not found
            if (!res.length) {
                result({
                    kind: "not_found",
                    type: param
                }, null);
                return false;
            }
            return true;
        },

        no_change: (res, result, param) => {
            if (res.affectedRows == 0) {
                result({
                    kind: "not_found",
                    type: param
                }, null);
                return false;
            }
            return true;
        }
    }
}
