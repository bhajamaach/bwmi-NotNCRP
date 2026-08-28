import cors from "cors";
import express from "express";
import { ensureSchema } from "./db";
import { seedIfEmpty } from "./lib/seed-if-empty";
import { complaintsRouter } from "./routes/complaints";
import { grievancesRouter } from "./routes/grievances";
import { usersRouter } from "./routes/users";

const app = express();
const port = Number(process.env.PORT ?? 4000);
const allowedOrigins = (process.env.FRONTEND_ORIGIN ?? "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: allowedOrigins
  })
);
app.use(express.json({ limit: "2mb" }));

app.get("/healthz", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/users", usersRouter);
app.use("/api/complaints", complaintsRouter);
app.use("/api/grievances", grievancesRouter);

ensureSchema()
  .then(() => seedIfEmpty())
  .then(() => {
    app.listen(port, () => {
      console.log(`NotNCRP API listening on :${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database schema", error);
    process.exit(1);
  });
