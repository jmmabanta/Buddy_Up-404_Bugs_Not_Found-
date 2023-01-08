const express = require("express");
const router = express.Router();
const { User } = require("../models.js");

router.get("/", (req, res) => {
  User.find({}).then((users) => {
    res.send(users);
  });
});

module.exports = router;
