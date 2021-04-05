var express = require('express');

//require the general controller
const Controller = require("../controllers/general.controller.js");

const Routes = function(app, auth, admin_auth, modelName){

    //initialize a router for these routes, bound to this object

    //require the specific model based on the model name provided
    let model = require(`../models/${modelName}.model.js`);

    //get the names of the routes to defined from the keys of the model routes
    let routes = Object.keys(model.routes);

    //iterate through all the routes so that we can define them
    for(var i = 0; i<routes.length; i++){

        let router = express.Router();

        // get the name of the route
        let queryType = routes[i];

        //get the type and path of the route as defined in the model
        let pathRaw = model.routes[queryType].path.split(" ");

        let type = pathRaw[0].toLowerCase();
        let path = pathRaw[1];
        //create a new controller for each route,
        //supplied with a model and the query type
        if(path[0]!="/"){
            console.log(`missing / in path ${type}`);
        }
        router[type](path, new Controller(model, queryType));

        let useAdmin = model.routes[queryType].admin;
        if(!model.routes[queryType].hasOwnProperty("admin")){
            useAdmin = false;
        }


        app.use(
          `/api/${modelName}`,
          useAdmin? admin_auth: auth,
          router
        );


    }
}

module.exports = Routes;
