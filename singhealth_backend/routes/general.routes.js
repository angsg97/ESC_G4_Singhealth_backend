var express = require('express');

//require the general controller
const Controller = require("../controllers/general.controller.js");

const Routes = function(modelName){

    //initialize a router for these routes, bound to this object
    this.router = express.Router();

    //require the specific model based on the model name provided
    let model = require(`../models/${modelName}.model.js`);

    //get the names of the routes to defined from the keys of the model routes
    let routes = Object.keys(model.routes);

    //iterate through all the routes so that we can define them
    for(var i = 0; i<routes.length; i++){

        // get the name of the route
        let queryType = routes[i];

        //get the type and path of the route as defined in the model
        let type = model.routes[queryType].type;
        let path = model.routes[queryType].path;

        //create a new controller for each route,
        //supplied with a model and the query type
        this.router[type](path, new Controller(model, queryType));

    }
}

module.exports = Routes;
