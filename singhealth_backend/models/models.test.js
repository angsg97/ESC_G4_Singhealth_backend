const app = require("../app"); // Link to your app
const supertest = require("supertest");
const request = supertest(app);
const mysql = require('mysql');

/*
TESTS FOR USER CREATION
*/

function routeCreator(route, params){
    let returnString = `/api/${route}?`;
    if(params){
        for(let property of Object.keys(params)){
            returnString+=`${property}=${params[property]}&`;
        }
    }
    returnString +=`secret_token=${process.env.TESTING_TOKEN_NORMAL}`;
    return returnString;
}



const defaultStaff = {
    name: "George",
    phone: "26453726",
    email: "george@gmail.com",
    institution: "ABC"
}

const staffIterations = [
    {
        status: 200,
        body: {
            name: "George",
            phone: "26453726",
            email: "george@gmail.com",
            institution: "ABC"
        }
    }
]

test("Get All staff", async () => {
    const res = await request.get(routeCreator("staff"));
    expect(res.status).toBe(200);
});


test("Create new staff", async () => {

    //create new staff
    const res = await request.post(routeCreator("staff")).send(defaultStaff);
    expect(res.status).toBe(200);

    //extract staff_id
    expect(res.body.staff_id).toBeTruthy();
    const staffId = res.body.staff_id;

    //check if staff exists
    const res1 = await request.get(routeCreator("staff/staff_id_param", {staff_id: staffId}));
    expect(res1.status).toBe(200);
    console.log(res1.body);
    expect(res1.body.staff_id).toBeTruthy();


    //delete
    const res2 = await request.delete(routeCreator("staff/staff_id_param", {staff_id: staffId}));
    expect(res2.status).toBe(200);


});
