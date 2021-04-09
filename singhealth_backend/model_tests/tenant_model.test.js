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


const tenantTest = require("./tenant_update.model");

test("Create tenant without admin", async () => {
    //create new tenant with wrong token
    const res = await request.post(
        routeCreator("tenant"))
        .send(tenantTest.normal.body);
    expect(res.status).toBe(401);
});

var tenantId = undefined;

test("Create tenant with admin token", async () => {
    //create new tenant with admin token
    let res = await request.post(
        routeCreator(
            "tenant",
            {},
            true)
        )
        .send(tenantTest.normal.body);
    expect(res.status).toBe(200);

    //extract tenant_id
    expect(res.body.tenant_id).toBeTruthy();
    tenantId = res.body.tenant_id;
});


test(`Check if tenant exists`, async () => {

    //check if tenant exists
    let res = await request.get(
        routeCreator(
            "tenant/tenant_id_param",
            {tenant_id: tenantId}
        )
    );
    expect(res.status).toBe(200);
    expect(res.body.tenant_id).toBeTruthy();
});



//run through all update test cases
for(let testName of Object.keys(tenantTest)){
    let testUpdate = tenantTest[testName];
    test(`Update tenant: ${testName}`, async () => {
        let resTest = await request.put(
            routeCreator(
                "tenant/tenant_id_param",
                {tenant_id: tenantId}
            ))
            .send(testUpdate.body);
        expect(resTest.status).toBe(testUpdate.status);

    });

}



test(`Delete tenant without admin`, async () => {
    //delete without admin
    let res = await request.delete(
        routeCreator(
            "tenant/tenant_id_param",
            {tenant_id: tenantId}
        )
    );
    expect(res.status).toBe(401);
});

test(`Check if tenant exists after failed delete`, async () => {

    //check if tenant exists
    let res = await request.get(
        routeCreator(
            "tenant/tenant_id_param",
            {tenant_id: tenantId}
        )
    );
    expect(res.status).toBe(200);
    expect(res.body.tenant_id).toBeTruthy();
});



test(`Delete tenant with admin`, async () => {
    //delete with admin
    let res = await request.delete(
        routeCreator(
            "tenant/tenant_id_param",
            {tenant_id: tenantId},
            true
        )
    );
    expect(res.status).toBe(200);
});


test(`Check if tenant exists after successful delete`, async () => {

    //check if tenant exists
    let res = await request.get(
        routeCreator(
            "tenant/tenant_id_param",
            {tenant_id: tenantId}
        )
    );
    expect(res.status).toBe(404);
});

test(`Check if random tenant exists`, async () => {

    //check if tenant exists
    let res = await request.get(
        routeCreator(
            "tenant/tenant_id_param",
            {tenant_id: tenantId+1}
        )
    );
    expect(res.status).toBe(404);
});


test("Get All tenant", async () => {
    let res = await request.get(routeCreator("tenant"));
    expect(res.status).toBe(200);
});
