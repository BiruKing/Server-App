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
  // for send res without password
  var jsonReqObj = null;

  try {
    connection.query(sql, async (err, row, fields) => {
      console.log("Logged in");
      console.log(row);

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

          //Make json request object without password

          jsonReqObj = {
            First_Name: item.First_Name,
            Middle_Name: item.Middle_Name,
            Last_Name: item.Last_Name,
            Phone_Num: item.Phone_Num,
            Photo: item.Photo,
            User_Name: item.User_Name,
            IS_Officer: item.IS_Officer,
            Traffic_Police_Id: item.Traffic_Police_Id,
            City: item.City,
          };
        }
      });
      //rows[0].solution)

      if (found) {
        try {
          const datas = await row;

          // console.log("json e " + datas[0]);

          res.send({ jsonReqObj });

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
