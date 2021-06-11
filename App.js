const express = require("express");
const app = express();
app.set("port", process.env.PORT);
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies


require("dotenv").config();

//see the settings doc from https://github.com/appfeel/node-pushnotifications
//to support more destinations like Android / Web etc.
const settings = {
  apn: {
    token: {
      key: process.env.APN_KEY, 
      keyId: process.env.APN_KEY_ID, 
      teamId: process.env.APN_TERM_ID 
    },
    production: false // true for APN production environment, false for APN sandbox environment,
  },
  isAlwaysUseFCM: false // true all messages will be sent through node-gcm (which actually uses FCM)
};

const PushNotifications = require("node-pushnotifications");
const push = new PushNotifications(settings);

//Send push message as req.body.data to a list of destinations specified by req.body.registrationIds
//See the req.body.data format from https://github.com/appfeel/node-pushnotifications
//Test the path like this: 
//    curl -v http://localhost:8000/send-message -d '{"sender":'testing", "registrationIds":["b2d0e95bfce054a3d220da12280cfdbb15274a1a9e5a02e5618c72b6ee32d0e2b"], "data":{"topic":"com.who.test.voip","mydata":"12341234","aps":{"alert":"hello"}}}' -H "Content-Type: application/json"
app.post("/send-message", function (req, res) {
  console.log("Client asks to send-message: ", req.body);
  push
    .send(req.body.registrationIds, req.body.data)
    .then(results => {
        console.log("send-message results: ", results);
        res.json(results);
    })
    .catch(err => {
      console.log("send-message failed: ", err);
      res.status(400).json(err);
    });
});

app.listen(process.env.PORT, () => {
  console.log(`server running on port: ${process.env.PORT}`);
});

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
