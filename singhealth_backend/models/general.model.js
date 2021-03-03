//require a connection to the database
const sql = require("./db.js");

//the query collection holds the information for all the routes in the model
const QueryCollection = function(data, routes){

    //load the data to this object
    this.name = data.name;
    this.columns = data.columns;
    this.name_id = data.name_id,

    //load the routes this object
    this.routes = routes;

    //the query map has a list of the queries as well as an array of
    //check that are run after the query result is recieved
    this.queryMap = {
        insert_set_body: {
            query: `INSERT INTO ${this.name} SET ?`,
            check: []
        },

        select_all: {
            query: `SELECT * FROM ${this.name}`,
            check: []
        },

        select_from_param_id: {
            query: `SELECT * FROM ${this.name} WHERE ${this.name_id} = ?`,
            check: ["param_id_not_found"]
        },

        select_from_param_data: {
            query: `SELECT * FROM ${this.name} WHERE ?`,
            check: ["param_data_not_found"]
        },

        update_from_param_id: {
            query: `UPDATE ${this.name} SET ? WHERE ${this.name_id} = ?`,
            check: ["no_change"]
        },

        remove_from_param_id: {
            query: `DELETE FROM ${this.name} WHERE ${this.name_id} = ?`,
            check: ["no_change"]
        }

    }

    //the check map holds the names of the callback functions
    //for the check that are going to be run, referenced in the queryMap
    this.checkMap = {
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

    //the param map holds the types of paramets that can be passed into
    //the query at the appropriate locations
    this.paramMap = {
        none: (req, data) => {
            return "";
        },

        body: (req, data) => {
            return QueryCollection.filterColumns(this.columns, req.body);
        },

        param_id: (req, data) => {
            return req.params[this.name_id];
        },

        param_data: (req, data) => {
            return {[data]: req.params[data]};
        }
    }

    //the result map contains the available building blocks that
    //will be joined together in an object and returned as the result
    this.resultMap = {
        result_full: (req, res) => {
            return res;
        },

        result_first: (req, res) => {
            return res[0];
        },

        param: (req, res) => {
            return req.params;
        },

        body: (req, res) => {
            return req.body;
        },

        insert_id: (req, res) => {
            return {[this.name_id]: res.insertId};
        }

    }



    /*

    MODEL OVERVIEW

    create a model and pass in 2 objects: the model obect and the query object

    the model object should contain:
    {
        name: "", //the name of the table to reference
        name_id: "", //the name of the primary key
        columns: [], //an array of the names of the columns
    }


    the query object should contain an object with a bunch of individual
    query objects with the following format:

    create: {
        type: "post", //the type of request to make to call this route
        path: "/", //the path of the request
        query: {
            type: "insert_set_body", //the type of query
            param: [{body: null}], //the params to pass into the query
            result: ["insert_id", "body"] //the result to be returned
        }
    }

    this documentation kind of stinks right now, so I'll add more later.

    */


    //query wrapper function
    this.query = (queryType, req, result) => {

        //get the query model object
        let queryModel = this.routes[queryType].query;

        console.log(queryModel);
        console.log(this.queryMap);

        //check if the type is insert or update
        let isInsert = queryModel.type == "insert";
        let isUpdate = queryModel.type == "update";

        if(isInsert || isUpdate){

            //check if all the columns of the body are defined
            let missingColumns = [];

            for(let i = 0; i<this.columns.length; i++){
                var property = this.columns[i];

                if(req.body[property] === undefined){
                    missingColumns.push(property);
                }

            }

            //if its not all filled, then we need to get the values first
            if(missingColumns.length){
                result({
                    kind: "incomplete_body",
                    missing: missingColumns
                }, null);
                return;
            }

        }

        if(!(queryModel.type in this.queryMap)){
            result({
                message: `${queryModel.type} is not a valid query type`
            });
            return;
        }

        let queryString = this.queryMap[queryModel.type].query;
        let queryCheck = this.queryMap[queryModel.type].check
        let paramArray = [];
        let paramArrayData = [];

        for(var i = 0; i<queryModel.param.length; i++){

            let param = queryModel.param[i];
            let paramName = Object.keys(param)[0];
            let paramData = param[paramName];

            if(!(paramName in this.paramMap)){
                result({
                    message: `${paramName} is not a valid param type`
                });
                return;
            }

            paramArrayData.push(paramData);
            paramArray.push(this.paramMap[paramName](req, paramData));


        }

        console.log(queryString, paramArray);

        //sql query with the model query and parameters
        sql.query(queryString, paramArray, (err, res) => {

            //error
            if(err){
                console.log(`query error: ${this.name} ${queryType}: ${err}`);
                result(err, null);
                return;
            }

            //success
            console.log(`query success: ${this.name} ${queryType}`);

            //do result checks
            for(let i = 0; i<queryCheck.length; i++){

                let checkName = queryCheck[i];
                if(!(checkName in this.checkMap)){
                    result({
                        message: `${checkName} is not a valid result check type`
                    });
                    return;
                }

                //if it failed the check
                if(!this.checkMap[checkName](res, result, req.params)){
                    return;
                }

            }


            let resultName = queryModel.result;

            if(resultName[0] == "message"){
                result(null, resultName[1]);
                return;
            }

            let resultObject = {};

            for(var i = 0; i<resultName.length; i++){
                //check if the return result is in the map
                if(resultName[i] in this.resultMap){
                    //if not, send the return result as the output
                    resultObject = {...resultObject, ...this.resultMap[resultName[i]](req, res)};
                }
                else if(typeof(resultName[i]) === "object" && resultName[i]!=null){
                    resultObject = {...resultObject, ...resultName[i]};
                }
                else{
                    console.log(`result ${resultName[i]} is not a valid result`);
                }
            }


            //call the model result return function
            result(null, resultObject);

        });

    };

}


QueryCollection.filterColumns = (columns, obj) =>{
    let returnObject = {}
    for(var i = 0; i<columns.length; i++){
        let property = columns[i];
        returnObject[property] = obj[property];
    }
    return returnObject;
}



module.exports = QueryCollection;
