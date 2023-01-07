const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors({ origin: true }));

app.get("/api", (req, res) => {
  res.set("Content-Type", "application/json");
  let data = {
    message: "Hello HackEd!",
  };
  res.send(JSON.stringify(data, null, 2));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
