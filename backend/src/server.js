const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors({ credentials: true, origin: true }));

const test = require("./routes/test");
const schedule_parse = require("./routes/schedule_parse");
const login = require("./routes/login");
const user = require("./routes/user");
const { getUserData } = require("./util");

app.use(
  fileUpload({
    safeFileNames: true,
  })
);

app.use("/api", test);
app.use("/login", login);

// Protects the following routes so that a login is needed
app.use((req, res, next) => {
  if (!req.get("authorization"))
    return res
      .status(403)
      .json({ err: "Authorization needed to access endpoint!" });
  const userData = getUserData(req.get("authorization"));
  if (userData == null)
    return res.status(403).json({ err: "Invalid authorization!" });
  next();
});

// THESE ROUTES REQUIRE LOGIN!
app.use("/schedule", schedule_parse);
app.use("/user", user);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
