const {
    app,
    supertest,
    request,
    mysql,
    routeCreator
} = require("./test_helper.js");

const staffTest = require("../model_updates/staff_update.model");
var staffDefault = {};

test("Create staff with admin", async () => {
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
    staffDefault = res.body;
});













test(`Delete staff with admin`, async () => {
    let res = await request.delete(
        routeCreator(
            "staff/staff_id_param",
            {staff_id: staffDefault.staff_id},
            true
        )
    );
    expect(res.status).toBe(200);
});
