const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {

  db.query("SELECT 'Connected Successfully' AS message", (err, results) => {

    if (err) {
      res.send("Database query failed");
      return;
    }

    res.send(results[0].message);

  });

});

module.exports = router;