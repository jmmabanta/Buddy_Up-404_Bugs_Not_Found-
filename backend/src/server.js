const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const test = require("./routes/test");

app.use(cors({ origin: true }));

app.use("/api", test);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
