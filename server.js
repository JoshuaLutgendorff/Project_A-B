const express = require("express");
const app = express();

const testRoute = require("./routes/testRoute");

app.use("/", testRoute);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});