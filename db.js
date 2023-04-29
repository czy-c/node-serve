const mysql = require("mysql");
const mysqlServe = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"admin123",
    database:"test"
})
mysqlServe.connect();
module.exports = {mysqlServe}