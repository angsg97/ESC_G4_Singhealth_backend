module.exports = (model) => {
    return {
        result_full: (req, res) => {
            return res;
        },

        result_first: (req, res) => {
            return res[0];
        },

        param: (req, res) => {
            return req.params;
        },

        query_id: (req, res) => {
            return {[model.name_id]: req.query[model.name_id]}
        },

        body: (req, res) => {
            return req.body;
        },

        insert_id: (req, res) => {
            return {[model.name_id]: res.insertId};
        }

    }
}
