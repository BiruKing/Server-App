const express = require("express");

const router = express.Router();
const mysql = require("mysql");
const { query } = require("express");

router.use(express.json());

router.post("/", (req, res) => {
  console.log(req.body);
  //about mysql

  //!connect to DB parameters

  var connection = mysql.createConnection({
    //properties
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "transport_authority",
  });

  //! MAKE CONNECTION
  connection.connect(function (error) {
    if (!error) {
      console.log("Connected");
    } else {
      console.log("error");
    }
  });

  const sql = "SELECT * FROM trafic_police";

  var found = false;

  try {
    connection.query(sql, async (err, row, fields) => {
      console.log("Logged in");
      row.map((item) => {
        if (
          item.User_Name == req.body.username &&
          item.Pass_Word == req.body.password
        ) {
          console.log(
            item.User_Name,
            req.body.username,
            item.Pass_Word,
            req.body.password
          );
          console.log(item);
          found = true;
        }
      });
      //rows[0].solution)

      if (found) {
        try {
          const datas = await row;

          console.log("json e " + datas[0]);

          // res.json(datas);
          res.send({ Ok: "OK" });

          res.end();
        } catch (e) {
          console.log("json exceotion " + e);
        }
      } else {
        console.log("Wrong username or password");
        res.send("Wrong username or password");
        res.end();
      }
    });
  } catch (error) {
    console.log("Wrong Q");
  }

  connection.end();
});

module.exports = router;
