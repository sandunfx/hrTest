const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const { Pool, Client } = require("pg");

var connectionString = process.env.DATABASE_URL;

app.get("/test", (req, res) => {
  res.send(connectionString);
});

app.get("/", (req, res) => {
  res.send("111");

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
