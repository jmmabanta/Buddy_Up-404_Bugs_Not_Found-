const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.set("Content-Type", "application/json");
  let data = {
    message: "Hello HackEd!",
  };
  res.send(JSON.stringify(data, null, 2));
});

module.exports = router;
