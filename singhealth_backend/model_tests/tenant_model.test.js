const {
    app,
    supertest,
    request,
    mysql,
    routeCreator
} = require("./test_helper.js");

const tenantTest = require("../model_updates/tenant_update.model");
var tenantDefault = {};


test("Create tenant without admin", async () => {
    //create new tenant with wrong token
    const res = await request.post(
        routeCreator("tenant"))
        .send(tenantTest.normal.body);
    expect(res.status).toBe(401);
});

test("Create tenant with admin", async () => {
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
    tenantDefault = res.body;
});


///////////////////FULL FUNCTIONS TESTS///////////////////

test(`Check if tenant exists`, async () => {

    //check if tenant exists
    let res = await request.get(
        routeCreator(
            "tenant/tenant_id_param",
            {tenant_id: tenantDefault.tenant_id}
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
                {tenant_id: tenantDefault.tenant_id}
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
            {tenant_id: tenantDefault.tenant_id}
        )
    );
    expect(res.status).toBe(401);
});

test(`Check if tenant exists after failed delete`, async () => {

    //check if tenant exists
    let res = await request.get(
        routeCreator(
            "tenant/tenant_id_param",
            {tenant_id: tenantDefault.tenant_id}
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
            {tenant_id: tenantDefault.tenant_id},
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
            {tenant_id: tenantDefault.tenant_id}
        )
    );
    expect(res.status).toBe(404);
});

test(`Check if random tenant exists`, async () => {

    //check if tenant exists
    let res = await request.get(
        routeCreator(
            "tenant/tenant_id_param",
            {tenant_id: tenantDefault.tenant_id+1}
        )
    );
    expect(res.status).toBe(404);
});


test("Get All tenant", async () => {
    let res = await request.get(routeCreator("tenant"));
    expect(res.status).toBe(200);
});
