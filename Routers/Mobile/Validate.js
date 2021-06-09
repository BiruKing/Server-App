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

  const sql = `SELECT drivers.First_Name,drivers.Middle_Name,drivers.Last_Name,drivers.LIcence_Num,drivers.City,drivers.Natonality,drivers.Photo,driving_licence.Date,driving_licence.Level,driving_licence.Driving_Schhol_N,driving_licence.DrivingScool,driving_licence.Level,driving_licence.LastCheck FROM drivers,driving_licence WHERE driving_licence.Licence_Num = ${req.body.licenseNumber}`;

  try {
    connection.query(sql, async (err, row, fields) => {
      console.log("Validation");
      //  console.log(row);

      if (row != undefined) {
        row.map((item) => {
          if (item.LIcence_Num == req.body.licenseNumber) {
            console.log(item.LIcence_Num, req.body.LIcence_Num);
            console.log(item);
            found = true;

            //Make json request object without password

            jsonReqObj = {
              First_Name: item.First_Name,
              Middle_Name: item.Middle_Name,
              Last_Name: item.Last_Name,
              LIcence_Num: item.LIcence_Num,
              Driving_Schhol_N: item.Driving_Schhol_N,
              City: item.City,
              Date: item.Date,
              Natonality: item.Natonality,
              Level: item.Level,
              LastCheck: item.LastCheck,
              Photo: item.Photo,
            };
          }
        });
        //rows[0].solution)

        if (found) {
          try {
            const datas = await row;

            // console.log("json e " + datas[0]);

            res.send(jsonReqObj);

            res.end();
          } catch (e) {
            console.log("json exceotion " + e);
          }
        } else {
          // console.log("Wrong username or password");
          // res.json({ msg: "Wrong username or password" });
          // res.end();
          res.json({ response: "Not Found" });
        }
      } else {
        // console.log("Wrong username or password");
        // res.json({ msg: "Wrong username or password" });
        // res.end();
        res.json({ response: "Not Found" });
      }
    });
  } catch (error) {
    console.log("Wrong Q");
  }

  connection.end();
});

module.exports = router;
