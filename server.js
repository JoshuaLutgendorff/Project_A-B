require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const testRoute = require("./routes/testRoute");

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", testRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});