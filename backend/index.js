const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(cors());
}

const colors = [
  { id: "def_col_1", name: "Red", hash: "#ff1100" },
  { id: "def_col_2", name: "Green", hash: "#00a80b" },
  { id: "def_col_3", name: "Blue", hash: "#0019bf" },
  { id: "def_col_4", name: "Yellow", hash: "#edea13" },
  { id: "def_col_5", name: "White", hash: "#ffffff" },
  { id: "def_col_6", name: "Black", hash: "#000000" },
];

// Serve the static files from the React app
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

process.env.NODE_ENV === "development"
  ? app.listen(port)
  : (module.exports = app);

console.log("App is listening on port " + port);
