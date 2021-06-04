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

        // Asign data to the json object to be sending
        jsonReqObj = {
          First_Name: datas[0].First_Name,
          Middle_Name: datas[0].Middle_Name,
          Last_Name: datas[0].Last_Name,
          LIcence_Num: datas[0].LIcence_Num,
          Driving_Schhol_N: datas[0].Driving_Schhol_N,
          City: datas[0].City,
          Date: datas[0].Date,
          Natonality: datas[0].Natonality,
          Level: datas[0].Level,
          LastCheck: datas[0].LastCheck,
          Photo: datas[0].Photo,
        };

        console.log("json e " + jsonReqObj);
        console.log("json e " + jsonReqObj);

        res.json(jsonReqObj);
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
