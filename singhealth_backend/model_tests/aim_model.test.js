const {
    app,
    supertest,
    request,
    mysql,
    routeCreator
} = require("./test_helper.js");

//note: aim stands for audit issue message

//////////////////////////STAFF CREATE//////////////////////////

const staffTest = require("../model_updates/staff_update.model");
var staffId = undefined;

test("Create staff with admin token", async () => {
    let res = await request.post(
        routeCreator(
            "staff",
            {},
            true)
        )
        .send(staffTest.normal.body);

    expect(res.status).toBe(200);
    expect(res.body.staff_id).toBeTruthy();

    staffId = res.body.staff_id;
});


//////////////////////////TENANT CREATE//////////////////////////

const tenantTest = require("../model_updates/tenant_update.model");
var tenantId = undefined;

test("Create tenant with admin token", async () => {
    let res = await request.post(
        routeCreator(
            "tenant",
            {},
            true)
        )
        .send(tenantTest.normal.body);

    expect(res.status).toBe(200);
    expect(res.body.tenant_id).toBeTruthy();

    tenantId = res.body.tenant_id;
});









//////////////////////////AUDIT CREATE//////////////////////////


const auditTest = require("../model_updates/audit_update.model");
var auditId = undefined;
test("Create audit", async () => {
    let res = await request.post(
        routeCreator(
            "audit",
            {},
        ))
        .send({
            staff_id: staffId,
            tenant_id: tenantId,
            ...auditTest.normal.body});
    expect(res.status).toBe(200);

    //extract tenant_id
    expect(res.body.audit_id).toBeTruthy();
    auditId = res.body.audit_id;
});


test("Find all audits with tenant data attached", async () => {
    let res = await request.get(
        routeCreator(
            "audit/append_tenant_data",
        ));
    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
});


test("Find all audits with staff data attached", async () => {
    let res = await request.get(
        routeCreator(
            "audit/append_staff_data",
        ));
    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
});


//run through all update test cases
for(let testName of Object.keys(auditTest)){
    let testUpdate = auditTest[testName];
    test(`Update audit: ${testName}`, async () => {
        let resTest = await request.put(
            routeCreator(
                "audit/audit_id_param",
                {audit_id: auditId}
            ))
            .send({
                staff_id: staffId,
                tenant_id: tenantId,
                audit_id: auditId,
                ...testUpdate.body});
        expect(resTest.status).toBe(testUpdate.status);

    });

}









//////////////////////////ISSUE CREATE//////////////////////////



const issueTest = require("../model_updates/issue_update.model");
var issueId = undefined;
test("Create Issue", async () => {
    let res = await request.post(
        routeCreator(
            "issue",
            {},
        ))
        .send({
            audit_id: auditId,
            ...issueTest.normal.body});

    expect(res.status).toBe(200);
    expect(res.body.issue_id).toBeTruthy();

    issueId = res.body.issue_id;
});


//run through all update test cases
for(let testName of Object.keys(issueTest)){
    let testUpdate = issueTest[testName];
    test(`Update issue: ${testName}`, async () => {
        let resTest = await request.put(
            routeCreator(`issue/${issueId}`))
            .send({
                audit_id: auditId,
                ...testUpdate.body});
        expect(resTest.status).toBe(testUpdate.status);

    });

}










//////////////////////////MESSAGE CREATE//////////////////////////


const messageTest = require("../model_updates/message_update.model");
var messageId = undefined;
test("Create message", async () => {
    let res = await request.post(
        routeCreator(
            "message",
            {},
        ))
        .send({
            issue_id: issueId,
            staff_id: staffId,
            tenant_id: tenantId,
            ...issueTest.normal.body});

    expect(res.status).toBe(200);
    expect(res.body.message_id).toBeTruthy();

    messageId = res.body.message_id;
});


//run through all update test cases
for(let testName of Object.keys(messageTest)){
    let testUpdate = messageTest[testName];
    test(`Update message: ${testName}`, async () => {
        let resTest = await request.put(
            routeCreator(
                "message/message_id_param",
                {message_id: messageId}
            ))
            .send({
                issue_id: issueId,
                staff_id: staffId,
                tenant_id: tenantId,
                ...testUpdate.body});
        expect(resTest.status).toBe(testUpdate.status);

    });

}



test("Find message by greater than time and issue id param", async () => {
    let res = await request.get(
        routeCreator(
            "message/time_issue_id_param",
            {time: 0,
            issue_id: issueId},
        ));

    expect(res.status).toBe(200);
});

test("Find message by greater than time and issue id param null", async () => {
    let res = await request.get(
        routeCreator(
            "message/time_issue_id_param",
            {},
        ));

    expect(res.status).toBe(400);
});


test("Find message by greater than time and issue id", async () => {
    let res = await request.get(
        routeCreator(`message/time/0/issue_id/${issueId}`));

    expect(res.status).toBe(200);
});








//////////////////////////DELETE IN REVERSE ORDER//////////////////////////


test(`Delete message`, async () => {
    let res = await request.delete(
        routeCreator(
            "message/message_id_param",
            {message_id: messageId}
        )
    );
    expect(res.status).toBe(200);
});



test(`Delete issue`, async () => {
    let res = await request.delete(
        routeCreator(
            "issue/issue_id_param",
            {issue_id: issueId}
        )
    );
    expect(res.status).toBe(200);
});







test(`Delete audit`, async () => {
    let res = await request.delete(
        routeCreator(
            "audit/audit_id_param",
            {audit_id: auditId}
        )
    );
    expect(res.status).toBe(200);
});



test(`Delete staff with admin`, async () => {
    let res = await request.delete(
        routeCreator(
            "staff/staff_id_param",
            {staff_id: staffId},
            true
        )
    );
    expect(res.status).toBe(200);
});



test(`Delete tenant with admin`, async () => {
    let res = await request.delete(
        routeCreator(
            "tenant/tenant_id_param",
            {tenant_id: tenantId},
            true
        )
    );
    expect(res.status).toBe(200);
});
