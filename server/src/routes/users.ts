import { Router } from "express";
import { pool } from "../db";

export const usersRouter = Router();

usersRouter.get("/", async (_req, res) => {
  const result = await pool.query("SELECT id, name, mobile, is_demo AS \"isDemo\" FROM users ORDER BY id");
  res.json(result.rows);
});
