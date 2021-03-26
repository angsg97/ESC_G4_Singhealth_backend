//require a connection to the database
const db = require("./db.js");
const mysql = db.mysql;
const connection = db.connection;
const typeCheck = require('./type_checking.js');

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
    this.queryMap = require("./options_query.js")(data);
    //the check map holds the names of the callback functions
    //for the check that are going to be run, referenced in the queryMap
    this.checkMap = require("./options_check.js")(data);

    //the param map holds the types of paramets that can be passed into
    //the query at the appropriate locations
    this.paramMap = require("./options_param.js")(data);

    //the result map contains the available building blocks that
    //will be joined together in an object and returned as the result
    this.resultMap = require("./options_result.js")(data);



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
        let queryModel = this.routes[queryType];

        console.log(req.query);

        if(!(queryModel.query in this.queryMap)){
            result({
                message: `${queryModel.query} is not a valid query type`
            });
            return;
        }

        let queryString = this.queryMap[queryModel.query].query;
        let queryCheck = this.queryMap[queryModel.query].check;


        //check if the type is insert or update
        let isInsert = queryString.indexOf("INSERT") == 0;
        let isUpdate = queryString.indexOf("UPDATE") == 0;

        if(isInsert || isUpdate){

            //check if all the columns of the body are defined
            let missingColumns = [];
            let invalidProperty =[];

            for(let property in this.columns){

                if(req.body[property] === undefined){

                    if(this.columns[property].required){
                        missingColumns.push(property);
                    }
                    else{
                        var def = this.columns[property].default;
                        if(def === "Date.now()"){
                            def = Date.now();
                        }

                        req.body[property] = def;
                    }

                }
                else{
                    let type = this.columns[property].type;
                    let issue = typeCheck(req.body[property], type);

                    if(issue){
                        invalidProperty.push(`value of ${property} is not a valid ${type}`);
                    }
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

            if(invalidProperty.length){
                result({
                    kind: "invalid_body",
                    issues: invalidProperty
                }, null);
                return;
            }

        }

        let paramArray = [];
        let paramArrayData = [];
        let paramArrayMissing = [];


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
            let paramValue = this.paramMap[paramName](req, paramData);
            if(paramValue.error){
                paramArrayMissing.push(paramValue.error);
            }
            else{
                paramArrayData.push(paramData);
                paramArray.push(paramValue.value);
            }

        }

        if(paramArrayMissing.length){
            result({
                kind: "incomplete_query_param",
                missing: paramArrayMissing
            });
            return;
        }

        console.log(queryString, paramArray);
        console.log(mysql.format(queryString, paramArray));
        //sql query with the model query and parameters
        connection.query(queryString, paramArray, (err, res) => {

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



module.exports = QueryCollection;
