module.exports = (model) => {
    return {
        insert_set_body: {
            query: `INSERT INTO ${model.name} SET ?`,
            check: []
        },

        select_all: {
            query: `SELECT * FROM ${model.name}`,
            check: []
        },

        select_from_param_id: {
            query: `SELECT * FROM ${model.name} WHERE ${model.name_id} = ?`,
            check: ["param_id_not_found"]
        },

        select_from_param_data: {
            query: `SELECT * FROM ${model.name} WHERE ?`,
            check: ["param_data_not_found"]
        },

        select_from_data_param_greater_than: {
            query: `SELECT * FROM ${model.name} WHERE ?? > ?`,
            check: ["param_data_not_found"]
        },

        select_from_data_param_lesser_than: {
            query: `SELECT * FROM ${model.name} WHERE ?? < ?`,
            check: ["param_data_not_found"]
        },

        select_from_data_param_greater_than_and_param_data: {
            query: `SELECT * FROM ${model.name} WHERE ?? > ? and ?`,
            check: ["param_data_not_found"]
        },

        select_from_data_param_lesser_than_and_param_data: {
            query: `SELECT * FROM ${model.name} WHERE ?? < ? and ?`,
            check: ["param_data_not_found"]
        },

        update_from_param_id: {
            query: `UPDATE ${model.name} SET ? WHERE ${model.name_id} = ?`,
            check: ["no_change"]
        },

        remove_from_param_id: {
            query: `DELETE FROM ${model.name} WHERE ${model.name_id} = ?`,
            check: ["no_change"]
        }
    }

}
