const app = require("../app"); // Link to your app
const supertest = require("supertest");
const request = supertest(app);
const mysql = require('mysql');

/*
TESTS FOR USER CREATION
*/

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


const staffTest = require("../model_updates/staff_update.model");

test("Create staff without admin", async () => {
    //create new staff with wrong token
    const res = await request.post(
        routeCreator("staff"))
        .send(staffTest.normal.body);
    expect(res.status).toBe(401);
});

var staffId = undefined;

test("Create staff with admin token", async () => {
    //create new staff with admin token
    let res = await request.post(
        routeCreator(
            "staff",
            {},
            true)
        )
        .send(staffTest.normal.body);
    expect(res.status).toBe(200);

    //extract staff_id
    expect(res.body.staff_id).toBeTruthy();
    staffId = res.body.staff_id;
});


test(`Check if staff exists`, async () => {

    //check if staff exists
    let res = await request.get(
        routeCreator(
            "staff/staff_id_param",
            {staff_id: staffId}
        )
    );
    expect(res.status).toBe(200);
    expect(res.body.staff_id).toBeTruthy();
});



//run through all update test cases
for(let testName of Object.keys(staffTest)){
    let testUpdate = staffTest[testName];
    test(`Update staff: ${testName}`, async () => {
        let resTest = await request.put(
            routeCreator(
                "staff/staff_id_param",
                {staff_id: staffId}
            ))
            .send(testUpdate.body);
        expect(resTest.status).toBe(testUpdate.status);

    });

}



test(`Delete staff without admin`, async () => {
    //delete without admin
    let res = await request.delete(
        routeCreator(
            "staff/staff_id_param",
            {staff_id: staffId}
        )
    );
    expect(res.status).toBe(401);
});

test(`Check if staff exists after failed delete`, async () => {

    //check if staff exists
    let res = await request.get(
        routeCreator(
            "staff/staff_id_param",
            {staff_id: staffId}
        )
    );
    expect(res.status).toBe(200);
    expect(res.body.staff_id).toBeTruthy();
});



test(`Delete staff with admin`, async () => {
    //delete with admin
    let res = await request.delete(
        routeCreator(
            "staff/staff_id_param",
            {staff_id: staffId},
            true
        )
    );
    expect(res.status).toBe(200);
});


test(`Check if staff exists after successful delete`, async () => {

    //check if staff exists
    let res = await request.get(
        routeCreator(
            "staff/staff_id_param",
            {staff_id: staffId}
        )
    );
    expect(res.status).toBe(404);
});

test(`Check if random staff exists`, async () => {

    //check if staff exists
    let res = await request.get(
        routeCreator(
            "staff/staff_id_param",
            {staff_id: staffId+1}
        )
    );
    expect(res.status).toBe(404);
});


test("Get All staff", async () => {
    let res = await request.get(routeCreator("staff"));
    expect(res.status).toBe(200);
});
