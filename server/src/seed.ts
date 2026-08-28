import { ensureSchema, pool } from "./db";
import { seedIfEmpty } from "./lib/seed-if-empty";

ensureSchema()
  .then(() => seedIfEmpty())
  .then(() => pool.end())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
