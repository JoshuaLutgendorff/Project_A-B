const express = require("express");
const router = express.Router();
const db = require("../config/db");

// AUTH MIDDLEWARE
function isAuthenticated(req, res, next) {
  if (req.session && req.session.loggedIn) {
    return next();
  }
  res.redirect("/login");
}

// TEST FORM
router.get("/test", (req, res) => {
  res.send(`
    <h2>Test Form</h2>
    <form method="POST" action="/submit">
      <input name="name" placeholder="Your name" required />
      <input name="message" placeholder="Message" required />
      <button type="submit">Submit</button>
    </form>
    <br/>
    <a href="/login">Admin Login</a>
  `);
});

// LOGIN PAGE
router.get("/login", (req, res) => {
  res.send(`
    <h2>Admin Login</h2>
    <form method="POST" action="/login">
      <input name="username" placeholder="Username" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  `);
});

// LOGIN SUBMIT
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    req.session.loggedIn = true;
    req.session.username = username;
    return res.redirect("/admin");
  }

  res.send("Invalid username or password");
});

// LOGOUT
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

// ADMIN DASHBOARD
router.get("/admin", isAuthenticated, (req, res) => {
  res.send(`
    <h2>Admin Dashboard</h2>
    <p>Welcome, ${req.session.username}</p>
    <ul>
      <li><a href="/messages">View Messages</a></li>
      <li><a href="/test">Open Test Form</a></li>
      <li><a href="/logout">Logout</a></li>
    </ul>
  `);
});

// CREATE MESSAGE
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

// READ ALL + DELETE BUTTONS
router.get("/messages", isAuthenticated, (req, res) => {
  db.query("SELECT * FROM messages", (err, results) => {
    if (err) {
      console.error(err);
      return res.send("Failed to fetch messages");
    }

    let html = `
      <h2>All Messages</h2>
      <ul style="list-style: none; padding: 0;">
    `;

    results.forEach((msg) => {
      html += `
        <li style="margin-bottom: 15px; padding: 10px; border: 1px solid #ccc;">
          <strong>ID:</strong> ${msg.id}<br>
          <strong>Name:</strong> ${msg.name}<br>
          <strong>Message:</strong> ${msg.message}<br><br>

          <form method="POST" action="/messages/${msg.id}/delete" style="display:inline;">
            <button type="submit" onclick="return confirm('Delete this message?')">
              Delete
            </button>
          </form>
        </li>
      `;
    });

    html += `</ul><a href='/admin'>Back to Admin</a>`;

    res.send(html);
  });
});

// DELETE (FORM VERSION FOR BUTTON)
router.post("/messages/:id/delete", isAuthenticated, (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM messages WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.send("Failed to delete message");
    }

    if (result.affectedRows === 0) {
      return res.send("Message not found");
    }

    res.redirect("/messages");
  });
});

// READ ONE
router.get("/messages/:id", isAuthenticated, (req, res) => {
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
router.put("/messages/:id", isAuthenticated, (req, res) => {
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

// DELETE (API VERSION - KEEP FOR CRUD REQUIREMENT)
router.delete("/messages/:id", isAuthenticated, (req, res) => {
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