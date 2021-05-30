const express = require("express");

const router = express.Router();
const mysql = require("mysql");
const { query } = require("express");
const bodyParser = require("body-parser");

//? Every  time converting body parser to JSON

router.use(express.json());

//router.use(bodyParser.json());

//! MAKE PENALTY ROUTE

router.post("/", (req, res) => {
  console.log("0 ", req.body.city);
  res.send("Ok");

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

    const sql = `INSERT INTO penalty (Datee, Timee, City, Road_name, Licence_num, Ticket_Num, Cause, Trafic_Name, P_Balance, DF_Name, DM_Name, DL_Name, Report) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    console.log(
      req.body.datee +
        "\n" +
        req.body.timee +
        "\n" +
        req.body.city +
        "\n" +
        req.body.Road_name +
        "\n" +
        req.body.Licence_num +
        "\n" +
        req.body.Ticket_Num +
        "\n" +
        req.body.Cause +
        "\n" +
        req.body.Traffic_Name +
        "\n" +
        req.body.P_Balance +
        "\n" +
        req.body.DF_Name +
        "\n" +
        req.body.DM_Name +
        "\n" +
        req.body.DL_Name +
        "\n" +
        req.body.Report
    );

    connection.query(
      sql,
      [
        req.body.datee,
        req.body.timee,
        req.body.city,
        req.body.Road_name,
        req.body.Licence_num,
        req.body.Ticket_Num,
        req.body.Cause,
        req.body.Traffic_Name,
        req.body.P_Balance,
        req.body.DF_Name,
        req.body.DM_Name,
        req.body.DL_Name,
        req.body.Report,
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
    console.log("Wrong Q");
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

  const sql = `SELECT * FROM penalty`;

  try {
    connection.query(sql, async (err, row, fields) => {
      res.setHeader("Content-Type", "application/json");

      console.log(row.body);
      // res.send("penalty history");

      row.map((item) => {
        console.log(
          item.Datee + "\n",
          item.Timee + "\n",

          item.City + "\n",
          item.Road_name + "\n",

          item.Licence_num + "\n",
          item.Ticket_Num + "\n",

          item.Cause + "\n",
          item.Trafic_Name + "\n",

          item.P_Balance + "\n",

          item.DF_Name + "\n",

          item.DM_Name + "\n",

          item.DL_Name + "\n",

          item.Report + "\n"
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
