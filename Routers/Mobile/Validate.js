const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const { query } = require("express");
const bodyParser = require("body-parser");

//!connect to DB

//? VALIDATION

//? Every  time converting body parser to JSON

router.use(express.json());

router.use(bodyParser.json());

//! MAKE PENALTY ROUTE

router.post("/", (req, res) => {
  console.log(req.body);

  console.log(req.body.licenseNumber);

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

  const sql = `SELECT * FROM driving_licence WHERE LIcence_Num = ${req.body.licenseNumber}`;

  try {
    connection.query(sql, async (err, row, fields) => {
      res.setHeader("Content-Type", "application/json");

      // console.log(row[0].First_Name);
      // // res.send("penalty history");

      // row.map((item) => {
      //   console.log(
      //     item.First_Name + "\n",
      //     item.Middle_Name + "\n",
      //     item.Last_Name + "\n",
      //     item.LIcence_Num + "\n",
      //     item.Driving_Schhol_N + "\n",
      //     item.City + "\n",
      //     item.Datee + "\n",
      //     item.Natonality + "\n",
      //     item.Photo + "\n"
      //   );
      // });
      //rows[0].solution)
      try {
        const datas = await row;

        //  console.log("json e " + datas[0].City);

        res.json(datas);
      } catch (e) {
        console.log("json exceotion " + e);
      }
    });
  } catch (error) {
    console.log("Wrong Q");
  }

  connection.end();
});

module.exports = router;
