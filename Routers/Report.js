const express = require("express");

const router = express.Router();
const mysql = require("mysql");
const { query } = require("express");
const bodyParser = require("body-parser");

//? Every  time converting body parser to JSON

router.use(express.json());

router.use(bodyParser.json());

//! MAKE PENALTY ROUTE

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
    database: "driving_licence_validation",
  });

  //! MAKE CONNECTION
  connection.connect(function (error) {
    if (!error) {
      console.log("Connected");
    } else {
      console.log("error");
    }
  });

  console.log("0 ", req.body);
  res.send("Ok");

  try {
    //todo Selection
    // connection.query("SELECT * FROM penalty", (err, row, fields) => {
    //   console.log("make penalty");
    //   /// res.send("make penalty");
    //   row.map((item) => {
    //     console.log(item);
    //   });
    //   //rows[0].solution)
    // });

    //todo insertion

    const sql = `INSERT INTO trafic_report (Datee, Timee, City, Kebele, Road_Name, Location, Direction, Targa_Num, Side_Code, Tapela_Code, Car_Type, Colore, Report_Cause,Report_Id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    console.log(
      req.body.Datee + "\n",
      req.body.Timee + "\n",
      req.body.City + "\n",
      req.body.Kebele + "\n",
      req.body.Road_Name + "\n",
      req.body.Location + "\n",
      req.body.Direction + "\n",
      req.body.Targa_Num + "\n",
      req.body.Side_Code + "\n",
      req.body.Tapela_Code + "\n",
      req.body.Car_Type + "\n",
      req.body.Colore + "\n",
      req.body.Report_Cause + "\n",
      req.body.Report_Id + "\n",
      req.body.Traffic_Police_Id
    );

    connection.query(
      sql,
      [
        req.body.Datee,
        req.body.Timee,
        req.body.City,
        req.body.Kebele,
        req.body.Road_Name,
        req.body.Location,
        req.body.Direction,
        req.body.Targa_Num,
        req.body.Side_Code,
        req.body.Tapela_Code,
        req.body.Car_Type,
        req.body.Colore,
        req.body.Report_Cause,
        req.body.Report_Id,
        req.body.Traffic_Police_Id,
      ],
      function (err, data) {
        if (err) {
          console.log("some error occurred " + err);
          // some error occurred
        } else {
          console.log("successfully inserted into db");

          // successfully inserted into db
        }
      }
    );
  } catch (error) {
    console.log("Wrong Q " + error);
  }

  connection.end();
});

//! VIEW PENALTY HISTORY ROUTE

router.get("/history", (req, res) => {
  //about mysql

  //!connect to DB parameters

  var connection = mysql.createConnection({
    //properties
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "driving_licence_validation",
  });

  //! MAKE CONNECTION
  connection.connect(function (error) {
    if (!error) {
      console.log("Connected");
    } else {
      console.log("error");
    }
  });

  const sql = `SELECT * FROM trafic_report WHERE Traffic_Police_Id = 12`;

  try {
    connection.query(sql, async (err, row, fields) => {
      res.setHeader("Content-Type", "application/json");

      console.log(err);
      // res.send("penalty history");

      row.map((item) => {
        console.log(
          item.Datee + "\n",
          item.Timee + "\n",
          item.City + "\n",
          item.Kebele + "\n",
          item.Road_Name + "\n",
          item.Location + "\n",
          item.Direction + "\n",
          item.Targa_Num + "\n",
          item.Side_Code + "\n",
          item.Tapela_Code + "\n",
          item.Car_Type + "\n",
          item.Colore + "\n",
          item.Report_Cause + "\n",
          item.Report_Id + "\n",
          item.Traffic_Police_Id
        );
      });
      //rows[0].solution)
      try {
        const datas = await row;

        console.log("json e " + datas[0].City);

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
