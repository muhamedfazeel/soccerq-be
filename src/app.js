import express from "express";

const app = express();
const port = 3333;

app.get("/", (req, res) => {
  res.send("Express Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
