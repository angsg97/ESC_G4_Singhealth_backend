const app = require("../app"); // Link to your app
const supertest = require("supertest");
const request = supertest(app);

const mongoose = require("mongoose");
const { TenantModel, AdminModel } = require("./auth.model");

// Helper function to clear all Collections from MongoDB database
async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
}

// For MONGODB_TESTING_URI, make sure to connect to a different database for each test file, as test files run parallel
// Setup MongoDB connection with testing Database URI
beforeAll(async () => {
  await mongoose.connect(
    process.env.MONGODB_TESTING_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    (err) => {
      if (!err) {
        console.log("MongoDB has connected successfully");
      } else {
        console.log(err);
      }
    }
  );
});

// Clearing the Database after all tests are complete
afterAll(async () => {
  // Empty the test database
  await removeAllCollections();
  await mongoose.connection.close();
});

/*
DUMMY USERS FOR TESTING
*/
const testingTenant1 = {
  email: "test_tenant@test.com",
  password: "tenant_password",
};

const testingAdmin1 = {
  email: "test_admin@test.com",
  password: "admin_password",
};

/*
TESTS FOR USER CREATION
*/
const testUserCreate = async (route, user, model) => {
  const res = await request.post(route).send({
    email: user.email,
    password: user.password,
  });

  // Check for successful response
  expect(res.status).toBe(201);
  expect(res.body.message).toBe("Signup Successful");
  expect(res.body.user.email).toBe(user.email);

  // Search for user in database
  const foundUser = await model.findOne({ email: user.email });
  expect(foundUser).toBeTruthy();
  expect(foundUser.email).toBe(user.email);
  expect(foundUser.password).toBeTruthy();
};

test("Test Create Tenant", async () => {
  await testUserCreate("/auth/tenant_signup", testingTenant1, TenantModel);
});

test("Test Create Admin", async () => {
  await testUserCreate("/auth/admin_signup", testingAdmin1, AdminModel);
});

/*
TESTS FOR DUPLICATE USER CREATION
*/
const testDuplicateUserCreate = async (route, user) => {
  const res = await request.post(route).send({
    email: user.email,
    password: user.password,
  });

  // Check for response code of 400
  expect(res.status).toBe(400);
  expect(res.body.message).toBe("Email already exists in Database");
};

test("Test Create Duplicate Tenant", async () => {
  // Both tenant and admin signup APIs should prevent duplicate emails
  await testDuplicateUserCreate("/auth/tenant_signup", testingTenant1);
  await testDuplicateUserCreate("/auth/admin_signup", testingTenant1);
});

test("Test Create Duplicate Admin", async () => {
  // Both tenant and admin signup APIs should prevent duplicate emails
  await testDuplicateUserCreate("/auth/tenant_signup", testingAdmin1);
  await testDuplicateUserCreate("/auth/admin_signup", testingAdmin1);
});

/*
TESTS FOR USER LOGIN
isAdmin indicates whether we are testing for Admin login or not
*/
const testUserLogin = async (route, user, isAdmin) => {
  const res = await request.post(route).send({
    email: user.email,
    password: user.password,
  });

  // Check for success
  expect(res.status).toBe(200);
  expect(res.body.token).toBeTruthy();
  expect(res.body.isAdmin).toBe(isAdmin);
};

test("Test Tenant Login", async () => {
  await testUserLogin("/auth/login", testingTenant1, false);
});

test("Test Admin Login", async () => {
  await testUserLogin("/auth/login", testingAdmin1, true);
});

/*
TESTS FOR FAILED USER LOGINS
Use a dummy password to create failed login
*/
const testFailedUserLogin = async (route, user) => {
  const res = await request.post(route).send({
    email: user.email,
    password: "A Wrong Password",
  });

  // Check for failure
  expect(res.status).toBe(404);
  expect(res.body.token).toBeUndefined();
};

test("Test Tenant Login Fail", async () => {
  await testFailedUserLogin("/auth/login", testingTenant1);
});

test("Test Admin Login Fail", async () => {
  await testFailedUserLogin("/auth/login", testingAdmin1);
});

/*
TESTS FOR USER DELETION
*/
const testUserDeletion = async (route, user, model) => {
  const res = await request.delete(route).send({
    email: user.email,
  });

  // Check for success
  expect(res.status).toBe(200);

  // Check that user does NOT exist in Database
  const foundUser = await model.findOne({ email: user.email });
  expect(foundUser).toBeFalsy();
};

test("Test Tenant Deletion", async () => {
  await testUserDeletion("/auth/tenant_delete", testingTenant1, TenantModel);
});

test("Test Admin Deletion", async () => {
  await testUserDeletion("/auth/admin_delete", testingAdmin1, AdminModel);
});

/*
TESTS FOR USER DELETION WHEN USER DOES NOT EXIST
*/
const testUserDeletionNotExist = async (route) => {
  const res = await request.delete(route).send({
    email: "Not a Real Email",
  });

  // Check for success
  expect(res.status).toBe(400);
};

test("Test Tenant Deletion with no existing User", async () => {
  await testUserDeletionNotExist("/auth/tenant_delete");
});

test("Test Admin Deletion with no existing User", async () => {
  await testUserDeletionNotExist("/auth/admin_delete");
});
