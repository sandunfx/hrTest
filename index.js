const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const { Client } = require("pg");

var connectionString = process.env.DATABASE_URL;

app.get("/testl", (req, res) => {
  // pg.connect(connectionString, function (err, client, done) {
  //   client.query("select * from emp", function (err, result) {
  //     done();
  //     if (err) return  res.send(err);
  //     console.log(result.rows);
  //     res.send(result.rows);
  //   });
  // });
  
});

app.get("/", (req, res) => {
  pg.connect(connectionString, function (err, client, done) {
    res.send(client);
  });
  res.send(connectionString);
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
