const express = require("express");

const router = express.Router();
const mysql = require("mysql");
const { query } = require("express");

router.get("/", (req, res) => {
  //about mysql

  //!connect to DB parameters

  var connection = mysql.createConnection({
    //properties
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "asd",
  });

  //! MAKE CONNECTION
  connection.connect(function (error) {
    if (!error) {
      console.log("Connected");
    } else {
      console.log("error");
    }
  });

  try {
    connection.query("SELECT * FROM user", (err, row, fields) => {
      console.log("notification");
      res.send("notification");
      row.map((item) => {
        console.log(item.name);
      });
      //rows[0].solution)
    });
  } catch (error) {
    console.log("Wrong Q");
  }

  connection.end();
});
module.exports = router;
