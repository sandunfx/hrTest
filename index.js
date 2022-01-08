const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const { Pool, Client } = require("pg");

var connectionString = process.env.DATABASE_URL;
var c2 = "postgres://aueatjmkfbxphv:3f19cecebf4ade2f461e6ee80553353713f31f6c07f775c05e94681391dff597@ec2-34-236-87-247.compute-1.amazonaws.com:5432/da5f8s6lmtjrf6";



app.get("/test", (req, res) => {
  
  const client = new Client({
    c2,
  });
  client.connect();

  client.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    client.end()
  })

  res.send(connectionString);
});

app.get("/", (req, res) => {
  res.send("111");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
