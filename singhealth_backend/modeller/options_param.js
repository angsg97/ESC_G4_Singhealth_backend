module.exports = (model) => {
    return {
        none: (req, data) => {
            return {
                value: ""
            };
        },

        data: (req, data) => {
            return {
                value: data
            }
        },

        body: (req, data) => {
            let returnObject = {}
            for(let property in model.columns){
                returnObject[property] = req.body[property];
            }
            return {
                value: returnObject
            }
        },

        query_param_id: (req, data) => {
            if(req.query[model.name_id] === undefined){
                return {
                    error: model.name_id
                }
            }
            return {
                value: req.query[model.name_id]
            }
        },

        query_param_data: (req, data) => {
            if(req.query[data] === undefined){
                return {
                    error: data
                }
            }
            return {
                value: {[data]: req.query[data]}
            }
        },

        /*
        this type of option is never used
        but its here in case it becomes useful in the future
        query_param_value: (req, data) => {
            if(req.query[data] === undefined){
                return {
                    error: data
                }
            }
            return {
                value: req.query[data]
            }
        },
        */

        query_param_value_parse_int: (req, data) => {
            if(req.query[data] === undefined){
                return {
                    error: data
                }
            }
            return {
                value: parseInt(req.query[data])
            }
        },

        param_id: (req, data) => {
            return {
                value: req.params[model.name_id]
            }
        },

        param_data: (req, data) => {
            return {
                value: {[data]: req.params[data]}
            }
        },

        /*
        this type of option is never used
        but its here in case it becomes useful in the future
        param_value: (req, data) => {
            return {
                value: req.params[data]
            }
        },
        */

        param_value_parse_int: (req, data) => {
            return {
                value: parseInt(req.params[data])
            }
        }
    }
}
