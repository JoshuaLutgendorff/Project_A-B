const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Home page with form
router.get("/test", (req, res) => {
  res.send(`
    <h2>Test Form</h2>
    <form method="POST" action="/submit">
      <input name="name" placeholder="Your name" required />
      <input name="message" placeholder="Message" required />
      <button type="submit">Submit</button>
    </form>

    <br/>
    <a href="/messages">View All Messages</a>
  `);
});

// CREATE
router.post("/submit", (req, res) => {
  const { name, message } = req.body;

  db.query(
    "INSERT INTO messages (name, message) VALUES (?, ?)",
    [name, message],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.send("Database insert failed");
      }
      res.send(`Message saved to database with ID ${result.insertId}`);
    }
  );
});

// READ ALL
router.get("/messages", (req, res) => {
  db.query("SELECT * FROM messages", (err, results) => {
    if (err) {
      console.error(err);
      return res.send("Failed to fetch messages");
    }

    let html = "<h2>All Messages</h2><ul>";
    results.forEach((msg) => {
      html += `
        <li>
          <strong>ID:</strong> ${msg.id} |
          <strong>Name:</strong> ${msg.name} |
          <strong>Message:</strong> ${msg.message}
        </li>
      `;
    });
    html += "</ul><a href='/'>Back</a>";

    res.send(html);
  });
});

// READ ONE
router.get("/messages/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM messages WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.send("Failed to fetch message");
    }

    if (results.length === 0) {
      return res.send("Message not found");
    }

    res.json(results[0]);
  });
});

// UPDATE
router.put("/messages/:id", (req, res) => {
  const { id } = req.params;
  const { name, message } = req.body;

  db.query(
    "UPDATE messages SET name = ?, message = ? WHERE id = ?",
    [name, message, id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.send("Failed to update message");
      }

      if (result.affectedRows === 0) {
        return res.send("Message not found");
      }

      res.send("Message updated successfully");
    }
  );
});

// DELETE
router.delete("/messages/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM messages WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.send("Failed to delete message");
    }

    if (result.affectedRows === 0) {
      return res.send("Message not found");
    }

    res.send("Message deleted successfully");
  });
});

module.exports = router;