const express = require("express");
const cors = require("cors");
const path = require("path");

const colors = require("./colors.json");

const app = express();

// Serve the static files from the React app
app.use(cors());
app.use(express.static(path.join(__dirname, "build")));

// An api endpoint that returns a short list of items
app.get("/api/colors", (req, res) => {
  res.json(colors);
  console.log("Sent list of items");
});

app.get("/api/colors/:id", (req, res) => {
  const color = colors.find((color) => color.id === req.params.id);
  console.log("found color", color);
  res.json(color);
  console.log("Sent list of items");
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
