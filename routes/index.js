const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Helloo world!!!!");
});

module.exports = router;
