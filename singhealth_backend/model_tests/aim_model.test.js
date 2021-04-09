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
var staffId = undefined;

test("Create staff with admin token", async () => {
    //create new tenant with admin token
    let res = await request.post(
        routeCreator(
            "staff",
            {},
            true)
        )
        .send(staffTest.normal.body);
    expect(res.status).toBe(200);

    //extract tenant_id
    expect(res.body.staff_id).toBeTruthy();
    staffId = res.body.staff_id;
});


const tenantTest = require("../model_updates/tenant_update.model");
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






const auditTest = require("../model_updates/audit_update.model");
var auditId = undefined;
test("Create audit", async () => {
    //create new tenant with admin token
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




const issueTest = require("../model_updates/issue_update.model");
var issueId = undefined;
test("Create Issue", async () => {
    //create new tenant with admin token
    let res = await request.post(
        routeCreator(
            "issue",
            {},
        ))
        .send({
            audit_id: auditId,
            ...issueTest.normal.body});
    expect(res.status).toBe(200);

    //extract tenant_id
    expect(res.body.issue_id).toBeTruthy();
    issueId = res.body.issue_id;
});


//run through all update test cases
for(let testName of Object.keys(issueTest)){
    let testUpdate = issueTest[testName];
    test(`Update issue: ${testName}`, async () => {
        let resTest = await request.put(
            routeCreator(
                "issue/issue_id_param",
                {issue_id: issueId}
            ))
            .send({
                audit_id: auditId,
                ...testUpdate.body});
        expect(resTest.status).toBe(testUpdate.status);

    });

}



const messageTest = require("../model_updates/message_update.model");
var messageId = undefined;
test("Create message", async () => {
    //create new tenant with admin token
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

    //extract tenant_id
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




test(`Delete message`, async () => {
    //delete with admin
    let res = await request.delete(
        routeCreator(
            "message/message_id_param",
            {message_id: messageId}
        )
    );
    expect(res.status).toBe(200);
});



test(`Delete issue`, async () => {
    //delete with admin
    let res = await request.delete(
        routeCreator(
            "issue/issue_id_param",
            {issue_id: issueId}
        )
    );
    expect(res.status).toBe(200);
});







test(`Delete audit`, async () => {
    //delete with admin
    let res = await request.delete(
        routeCreator(
            "audit/audit_id_param",
            {audit_id: auditId}
        )
    );
    expect(res.status).toBe(200);
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
