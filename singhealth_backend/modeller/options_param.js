module.exports = (model) => {
    return {
        none: (req, data) => {
            return "";
        },

        data: (req, data) => {
            return data;
        },

        body: (req, data) => {
            let returnObject = {}
            for(let property in model.columns){
                returnObject[property] = req.body[property];
            }
            return returnObject;
        },

        query_param_id: (req, data) => {
            console.log("QUERY PARAM ID", req.query)
            return req.query[model.name_id];
        },
        
        query_param_data: (req, data) => {
            return {[data]: req.query[data]};
        },

        param_id: (req, data) => {
            return req.params[model.name_id];
        },

        param_data: (req, data) => {
            return {[data]: req.params[data]};
        },

        param_value: (req, data) => {
            return req.params[data];
        },

        param_value_parse_int: (req, data) => {
            return parseInt(req.params[data]);
        }
    }
}
