const mysql = require("mysql");
const PenaltySchema = mysql.Schema({
  Date: Date.now(),
  Time: new Date().toLocaleTimeString(),
  City: String,
  Road_name: String,
  Licence_num: String,
  Ticket_Num: String,
  Cause: String,
  Trafic_Name: String,
  P_Balance: String,
  DF_Name: String,
  DM_Name: String,
  DL_Name: String,
  Report: String,
});
