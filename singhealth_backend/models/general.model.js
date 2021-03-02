//require a connection to the database
const sql = require("./db.js");

//the query collection holds the information for all the routes in the model
const QueryCollection = function(data, routes){

    //load the data to this object
    this.name = data.name;
    this.columns = data.columns;

    //load the routes this object
    this.routes = routes;

    /*
    ROUTES
    the routes is an object holding a bunch of other route objects.
    route objects should have the following properties:

    type: "post"
    the type of request that is made in order to call the route


    path: "/",
    the specific path of the request in order to call the route
    when doing requests, remember that the route path is relative to
    whatever is defined in route_paths/route_paths.js.


    query: "INSERT INTO staff SET ?",
    the query to execute when the route is called


    param: (req) => {
        return {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            institution: req.body.institution
        }
    },
    the parameters to pass into the sql query
    basically the values to fill in the ? spaces of the sql query
    look at the link below for details on how parameters
    are parsed into the query:
    https://www.npmjs.com/package/mysql#escaping-query-values


    resultReturn: (param, res, result) => {
        result(null, {staff_id: res.insertId, ...param});
    }
    please call the result function provided and give the following arguments:
        0: error
        1: result
    in this function, you can check for the result provided in res and
    choose the format and values that you want to be returned from the route
    */

    //query wrapper function
    this.query = (queryType, req, result) => {

        //get the query model object
        let queryModel = this.routes[queryType];

        let isInsert = queryModel.query.indexOf("INSERT") == 0;
        let isUpdate = queryModel.query.indexOf("UPDATE") == 0;

        if(isInsert || isUpdate){

            //check if all the columns of the body are defined
            let missingColumns = [];

            for(var i = 0; i<this.columns.length; i++){
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




        //pass the request into the query parameters from the query model object
        let queryParam = queryModel.param(req);

        //sql query with the model query and parameters
        sql.query(queryModel.query, queryParam, (err, res) => {

            //error
            if(err){
                console.log(`query error: ${this.name} ${queryType}: ${err}`);
                result(err, null);
                return;
            }

            //success
            console.log(`query success: ${this.name} ${queryType}`);

            //call the model result return function
            queryModel.resultReturn(queryParam, res, result);

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
