const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
app.post("/save-score", (req, res) => {

  const newScore = req.body;

  const scores = JSON.parse(
    fs.readFileSync("scores.json")
  );

  scores.push(newScore);

  fs.writeFileSync(
    "scores.json",
    JSON.stringify(scores, null, 2)
  );

  res.json({
    message: "Score saved!"
  });

});
app.get("/leaderboard", (req, res) => {

  const scores = JSON.parse(
    fs.readFileSync("scores.json")
  );

  res.json(scores);

});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});