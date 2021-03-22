module.exports = (model) => {
    return {
        none: (req, data) => {
            return "";
        },

        data: (req, data) => {
            return data;
        },

        body: (req, data) => {
            return QueryCollection.filterColumns(this.columns, req.body);
        },

        param_id: (req, data) => {
            return req.params[this.name_id];
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
