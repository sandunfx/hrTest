const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.get("/test2", (req, res) => {
  try {

    client.connect();

    client.query(
      "select * from emp;",
      (err1, res1) => {
        // for (let row of res.rows) {
        //   console.log(JSON.stringify(row));
        // }
        res.send(res1);

        client.end();
      }
    );
  } catch (err) {
    res.send(err.message);
  }
});

app.get("/", (req, res) => {
  res.send("111");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
