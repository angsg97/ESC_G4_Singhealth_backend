const test = process.env.NODE_ENV == "test";

const testDatabase = {
    USER: process.env.DATABASE_TESTING_USER,
    PASSWORD: process.env.DATABASE_TESTING_PASSWORD,
    HOST: process.env.DATABASE_TESTING_HOST,
    DB: process.env.DATABASE_TESTING_DB,
}

const normalDatabase = {
    USER: process.env.DATABASE_USER,
    PASSWORD: process.env.DATABASE_PASSWORD,
    HOST: process.env.DATABASE_HOST,
    DB: process.env.DATABASE_DB,
}

module.exports = test? testDatabase: normalDatabase;
