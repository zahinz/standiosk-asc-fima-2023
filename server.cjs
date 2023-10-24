const express = require("express");
const path = require("path");

const app = express();
const PORT = 10000;

app.use(express.static(path.join(__dirname, "dist")));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
