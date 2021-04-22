const app = require("../app"); // Link to your app
const supertest = require("supertest");
const request = supertest(app);
const mysql = require('mysql');

function routeCreator(route, params, admin){
    let returnString = `/api/${route}?`;
    if(params){
        for(let property of Object.keys(params)){
            returnString+=`${property}=${params[property]}&`;
        }
    }
    let token = process.env[admin?
        "TESTING_TOKEN_ADMIN":
        "TESTING_TOKEN_NORMAL"];
    returnString +=`secret_token=${token}`;
    return returnString;
}

module.exports = {
    app: app,
    supertest: supertest,
    request: request,
    mysql: mysql,
    routeCreator: routeCreator,
}
