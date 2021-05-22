const mysql = require("mysql");
const { query } = require("express");

//!connect to DB

var connection = mysql.createConnection({
  //properties
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "asd",
});

connection.connect(function (error) {
  if (!error) {
    console.log("Connected");
  } else {
    console.log("error");
  }
});
module.exports = DBCon;
s;
