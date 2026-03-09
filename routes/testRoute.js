const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  res.send(`
    <h2>Test Form</h2>
    <form method="POST" action="/submit">
      <input name="name" placeholder="Your name"/>
      <input name="message" placeholder="Message"/>
      <button type="submit">Submit</button>
    </form>
  `);
});

router.post("/submit", express.urlencoded({ extended: true }), (req, res) => {

  const { name, message } = req.body;

  db.query(
    "INSERT INTO messages (name, message) VALUES (?, ?)",
    [name, message],
    (err) => {
      if (err) {
        res.send("Database insert failed");
        return;
      }

      res.send("Message saved to database");
    }
  );

});

module.exports = router;