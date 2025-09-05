import express from "express";
import { createServer } from "http";

export const app = express();

app.get("/ready", (_req, res) => {
  res.send("READY M8!");
});

export const httpServer = createServer(app);
