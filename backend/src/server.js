const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();
const port = 3000;

const dotenv = require("dotenv");
dotenv.config();

app.use(cors());

const test = require("./routes/test");
const schedule_parse = require("./routes/schedule_parse");
const login = require("./routes/login");

app.use(
  fileUpload({
    safeFileNames: true,
  })
);

app.use("/api", test);
app.use("/api/schedule", schedule_parse);
app.use("/login", login);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
