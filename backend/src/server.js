const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();
const port = 3000;

const test = require("./routes/test");
const schedule_parse = require("./routes/schedule_parse");

app.use(cors({ origin: true }));
app.use(
  fileUpload({
    safeFileNames: true,
  })
);

app.use("/api", test);
app.use("/api/schedule", schedule_parse);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
