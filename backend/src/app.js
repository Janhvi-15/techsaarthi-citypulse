import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("CityPulse Backend is ON 🚀");
});

export default app;