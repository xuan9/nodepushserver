const { body, validationResult } = require('express-validator');
const express = require("express");
const app = express();
app.set("port", process.env.PORT);
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies

require("dotenv").config();

const settings = require("./Settings");

const PushNotifications = require("node-pushnotifications");
const push = new PushNotifications(settings);

//Send push message as req.body.data to a list of destinations specified by req.body.registrationIds
//See the req.body.data format from https://github.com/appfeel/node-pushnotifications
//Test the path like this:
//    curl -v http://localhost:8000/send-message -d '{"sender":'testing", "registrationIds":["b2d0e95bfce054a3d220da12280cfdbb15274a1a9e5a02e5618c72b6ee32d0e2b"], "data":{"topic":"com.who.test.voip","mydata":"12341234","aps":{"alert":"hello"}}}' -H "Content-Type: application/json"
app.post(
  "/send-message",
  body("sender").notEmpty(),
  body("registrationIds").isArray({ min: 1 }),
  body("data").isObject(),
   (req, res)=> {
    console.log("Client asks to send-message: ", req.body);

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error("The request has validation errors: ", errors);
      return res.status(400).json({ errors: errors.array() });
    }

    push
      .send(req.body.registrationIds, req.body.data)
      .then(results => {
        console.log("send-message results: ", results);
        res.json(results);
      })
      .catch(err => {
        console.error("send-message failed: ", err);
        res.status(400).json(err);
      });
  });

module.exports = app;

// ------todo: log send-message req/resp to mysql database
// ----- npm add mysql2
// const mysql = require('mysql2');
// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME
// });

// db.connect((err) => {
//     if (err) {
//         throw err;
//     }
//     console.log('connected to database');
// });
// global.db = db;
