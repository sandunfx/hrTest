const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const { Pool, Client } = require("pg");

var connectionString = process.env.DATABASE_URL;
var c2 =
  "postgres://aueatjmkfbxphv:3f19cecebf4ade2f461e6ee80553353713f31f6c07f775c05e94681391dff597@ec2-34-236-87-247.compute-1.amazonaws.com:5432/da5f8s6lmtjrf6";

const credentials = {
  user: "aueatjmkfbxphv",
  host: "ec2-34-236-87-247.compute-1.amazonaws.com",
  database: "da5f8s6lmtjrf6",
  password: "3f19cecebf4ade2f461e6ee80553353713f31f6c07f775c05e94681391dff597",
  port: 5432,
  ssl: true,
};

// const credentials = {
//   user: "postgres",
//   host: "localhost",
//   database: "testDb",
//   password: "c3@admin",
//   port: 5432
// };

// Connect with a connection pool.

async function poolDemo() {
  const pool = new Pool(credentials);
  const now = await pool.query("SELECT NOW()");
  await pool.end();

  return now;
}

// Connect with a client.

async function clientDemo() {
  const client = new Client(credentials);
  await client.connect();
  // const now = await client.query("SELECT NOW()");
  const now = await client.query("select * from emp");
  await client.end();

  return now;
}

app.get("/test", (req, res) => {
  (async () => {
    try {
      const clientResult = await clientDemo();
      console.log("Time with client: " + clientResult.rows[0]["now"]);

      res.send(clientResult.rows[0]["now"]);
    } catch (err) {
      res.send(err.message);
    }
  })();
});

app.get("/test2", (req, res) => {
  const client2 = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  client2.connect();

  client2.query(
    "SELECT table_schema,table_name FROM information_schema.tables;",
    (err, res) => {
      console.log(err, res);
      client2.end();
    }
  );
});

app.get("/", (req, res) => {
  res.send("111");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
