const {
    app,
    supertest,
    request,
    mysql,
    routeCreator
} = require("./test_helper.js");

const staffTest = require("../model_updates/staff_update.model");
var staffDefault = {};


test("Create staff without admin", async () => {
    let res = await request.post(
        routeCreator(
            "staff",
            {},
            false)
        )
        .send(staffTest.normal.body);
    expect(res.status).toBe(401);
});


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


///////////////////FULL FUNCTIONS TESTS///////////////////
test(`Find all staff`, async () => {
    let res = await request.get(
        routeCreator(
            "staff/",
        )
    );
    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
});


test(`Find staff by staff id param`, async () => {
    let res = await request.get(
        routeCreator(
            "staff/staff_id_param",
            {staff_id: staffDefault.staff_id}
        )
    );
    expect(res.status).toBe(200);
    expect(res.body.staff_id).toBe(staffDefault.staff_id);
});


test(`Find staff by invalid staff id param`, async () => {
    let res = await request.get(
        routeCreator(
            "staff/staff_id_param",
            {staff_id: staffDefault.staff_id+1}
        )
    );
    expect(res.status).toBe(404);
    expect(res.body.message).toContain("not found");
});

test(`Find staff by staff id param null`, async () => {
    let res = await request.get(
        routeCreator(
            "staff/staff_id_param",
            {}
        )
    );
    expect(res.status).toBe(400);
});

test(`Find staff by staff id`, async () => {
    let res = await request.get(
        routeCreator(
            `staff/${staffDefault.staff_id}`,
        )
    );
    expect(res.status).toBe(200);
    expect(res.body.staff_id).toBe(staffDefault.staff_id);
});

test(`Find staff by invalid staff id`, async () => {
    let res = await request.get(
        routeCreator(
            `staff/${staffDefault.staff_id+1}`,
        )
    );
    expect(res.status).toBe(404);
    expect(res.body.message).toContain("not found");
});




test(`Find staff by institution param`, async () => {
    let res = await request.get(
        routeCreator(
            "staff/institution_param",
            {institution: staffDefault.institution}
        )
    );
    expect(res.status).toBe(200);
});

test(`Find staff by invalid institution param`, async () => {
    let res = await request.get(
        routeCreator(
            "staff/institution_param",
            {institution: "nope"}
        )
    );
    expect(res.status).toBe(404);
    expect(res.body.message).toContain("not found");
});

test(`Find staff by institution param null`, async () => {
    let res = await request.get(
        routeCreator(
            "staff/institution_param",
            {}
        )
    );
    expect(res.status).toBe(400);
});

test(`Find staff by institution`, async () => {
    let res = await request.get(
        routeCreator(
            `staff/institution/${staffDefault.institution}`,
        )
    );
    expect(res.status).toBe(200);
});

test(`Find staff by invalid institution`, async () => {
    let res = await request.get(
        routeCreator(
            "staff/institution/nope",
        )
    );
    expect(res.status).toBe(404);
    expect(res.body.message).toContain("not found");
});



test(`Find staff by email param`, async () => {
    let res = await request.get(
        routeCreator(
            "staff/email_param",
            {email: staffDefault.email}
        )
    );
    expect(res.status).toBe(200);
});

test(`Find staff by invalid email param`, async () => {
    let res = await request.get(
        routeCreator(
            "staff/email_param",
            {email: "nopetynope@nope.nope"}
        )
    );
    expect(res.status).toBe(404);
    expect(res.body.message).toContain("not found");
});

test(`Find staff by email`, async () => {
    let res = await request.get(
        routeCreator(
            `staff/email/${staffDefault.email}`,
        )
    );
    expect(res.status).toBe(200);
});

test(`Find staff by invalid email`, async () => {
    let res = await request.get(
        routeCreator(
            "staff/email/nopetynope@nope.nope",
        )
    );
    expect(res.status).toBe(404);
    expect(res.body.message).toContain("not found");
});














test(`Update staff: invalid_id1`, async () => {
    let resTest = await request.put(
        routeCreator(
            "staff/staff_id_param",
            {staff_id: staffDefault.staff_id+1}
        ));
    expect(resTest.status).toBe(400);

});

test(`Update staff: invalid_id2`, async () => {
    let resTest = await request.put(
        routeCreator(
            "staff/staff_id_param",
            {staff_id: "hello"}
        ));
    expect(resTest.status).toBe(400);

});







//run through all update test cases
for(let testName of Object.keys(staffTest)){
    let testUpdate = staffTest[testName];
    test(`Update staff: ${testName}`, async () => {
        let resTest = await request.put(
            routeCreator(
                "staff/staff_id_param",
                {staff_id: staffDefault.staff_id}
            ))
            .send(testUpdate.body);
        expect(resTest.status).toBe(testUpdate.status);

    });

}



test(`Delete staff without admin`, async () => {
    let res = await request.delete(
        routeCreator(
            "staff/staff_id_param",
            {staff_id: staffDefault.staff_id}
        )
    );
    expect(res.status).toBe(401);
});

test(`Check if staff exists after failed delete`, async () => {
    let res = await request.get(
        routeCreator(
            "staff/staff_id_param",
            {staff_id: staffDefault.staff_id}
        )
    );
    expect(res.status).toBe(200);
    expect(res.body.staff_id).toBeTruthy();
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


test(`Check if staff exists after successful delete`, async () => {
    let res = await request.get(
        routeCreator(
            "staff/staff_id_param",
            {staff_id: staffDefault.staff_id}
        )
    );
    expect(res.status).toBe(404);
});

test(`Check if random staff exists`, async () => {
    let res = await request.get(
        routeCreator(
            "staff/staff_id_param",
            {staff_id: staffDefault.staff_id+1}
        )
    );
    expect(res.status).toBe(404);
});


test("Get All staff", async () => {
    let res = await request.get(routeCreator("staff"));
    expect(res.status).toBe(200);
});
