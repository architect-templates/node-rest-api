const express = require("express");
const path = require("path");

const app = express();
const port = process.env.API_PORT || "4000";

app.get("/", (req, res) => {
  res.status(200).send("Architect.io is the best way to build and deploy applications!");
});

app.listen(port, () => {
  console.log(`Listening for requests!`);
});