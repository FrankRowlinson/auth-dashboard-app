require("dotenv").config()
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "login_app",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "be5d6aa027cc75",
    password: "ed9252ae",
    database: "heroku_8e82daef9edefe7",
    host: "us-cdbr-east-06.cleardb.net",
    dialect: "mysql",
  },
}