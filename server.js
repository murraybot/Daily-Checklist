//Create object structure and import express and cronJob
const status = { one: false, two: false, three: false };
const express = require("express");
const app = express();
const cronz = require("cron").CronJob;
//create a cron to reset object data every day at 8AM Central time
var job = new cronz(
  "0 0 8 * * *",
  function () {
    console.log("Resetting backup checks.");
    status.one = false;
    status.two = false;
    status.three = false;
  },
  null,
  true,
  "America/Chicago"
);
app.use(express.text());
//endpoint for exposing current object data
app.get("/info", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.json(status);
  res.end();
});
//endpoint for updating object data
app.post("/update", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  req.header("Access-Control-Allow-Origin", "*");
  let updates = JSON.parse(req.body);
  for (let keyz in updates) {
    if (updates[keyz] === true) {
      status[keyz] = true;
      console.log(status);
    }
  }
  res.end();
});
//start server process.env.PORT should be the port the node server is intended to
//run on
app.listen(process.env.PORT, () => {
  console.log("Running...");
});
