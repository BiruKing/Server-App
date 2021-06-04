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

//? Traffic police
const LoginRoute = require("./Routers/Mobile/Login");
const ValidateRoute = require("./Routers/Mobile/Validate");
const PenaltyRoute = require("./Routers/Mobile/Penalty");
const ReportRoute = require("./Routers/Mobile/Report");

//? Notification wen Accident report calls and notification for mobile run
const NotificationRoute = require("./Routers/Mobile/Notification");

const AccidentReportRoute = require("./Routers/Web/Reporters/AccidentReport");

const DispleasureReportRoute = require("./Routers/Web/Drivers/DispleasureReport");

const ViewRoute = require("./Routers/Web/Admin/View");
const GenerateRoute = require("./Routers/Web/Admin/Generate");

const OfficersLoginRoute = require("./Routers/Web/Admin/Officers/Login");
const OfficersManagerRoute = require("./Routers/Web/Admin/Officers/Manage");

const TransportAuthLoginRoute = require("./Routers/Web/Admin/Officers/Login");
///!-----------

//! Middleware
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

//! Test Androids
app.use(express.json());

app.post("/test/get", (req, res) => {
  console.log("Well come Androids");
  console.log(req.body);
  console.log(req.body.username);
  res.json({ key: "Value" });
});

app.post("/test/post", (req, res) => {
  console.log(req.body);
  // console.log(req.body.password);

  res.send({ key: "Value" });
});

//Todo: Routes

//! Login
//! Validate Driver
//! Penalty
//! Being Notified
//! Accident Report

// app.get("/", (req, res) => {

//   //about mysqlexit

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
