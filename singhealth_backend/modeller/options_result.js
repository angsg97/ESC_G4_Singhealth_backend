module.exports = (model) => {
    return {
        result_full: (req, res) => {
            return res;
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
