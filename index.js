const express = require("express");
const app = express();
require("dotenv/config");
//const Penalty = require("./Models/DrivingLicenceValidation/Penality");

/*
 * *
 * * DLV Application Api
 * *
 */

app.post("/post", (req, res) => {
  // const penalty = new penalty({
  //   City: String,
  // });

  console.log(req.body.City);
  res.send("Ok");
});

//! Middleware

const LoginRoute = require("./Routers/Login");
const ValidateRoute = require("./Routers/Validate");
const PenaltyRoute = require("./Routers/Penalty");
const ReportRoute = require("./Routers/Report");
const NotificationRoute = require("./Routers/Notification");

app.use("/login", LoginRoute);
app.use("/validate", ValidateRoute);
app.use("/penalty", PenaltyRoute);
app.use("/report", ReportRoute);

//todo === make it timer run or wen new reports are reported

//app.use("/notification", NotificationRoute);

// //!connect to DB

// var connection = mysql.createConnection({

//   //properties

//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "",
//   database: "asd",
// });

// connection.connect(function (error) {
//   if (!error) {
//     console.log("Connected");
//   } else {
//     console.log("error");
//   }
// });

/*
get
patch
delete
post
*/

//! Middleware

// app.use("/login", () => {

//   // Authentication

// });

//Todo: Routes

//! Login
//! Validate Driver
//! Penalty
//! Being Notified
//! Accident Report

// app.get("/", (req, res) => {

//   //about mysql

//   try {
//     connection.query("SELECT * FROM user", (err, row, fields) => {
//       console.log("Nice Q");
//       res.send("IM boss#");
//       row.map((item) => {
//         console.log(item.name);
//       });

//       //rows[0].solution)

//     });
//   } catch (error) {
//     console.log("Wrong Q");
//   }

//   connection.end();
// });

app.listen(300, (err) => {
  if (!err) {
    console.log("im listening");
  }
});
