//mysql://bbc8f93ebc2081:56d673zac@us-cdbr-east-03.cleardb.com/heroku_81a0f966347cc90?reconnect=true
module.exports = {
    USER: process.env.DATABASE_USER,
    PASSWORD: process.env.DATABASE_PASSWORD,
    HOST: process.env.DATABASE_HOST,
    DB: process.env.DATABASE_DB
}
