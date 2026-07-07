import * as lancedb from "@lancedb/lancedb";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "../db");
let db;

async function getDB() {
  if (!db) {
    db = await lancedb.connect(dbPath);
  }

  return db;
}
async function getTable() {
  const db = await getDB();

  const tables = await db.tableNames();

  if (tables.includes("products")) {
    return await db.openTable("products");
  }

  return null;
}
async function addProducts(data) {
  const db = await getDB();

  const tableNames = await db.tableNames();

  if (tableNames.includes("products")) {
    const table = await db.openTable("products");
    await table.add(data);
  } else {
    await db.createTable("products", data);
  }
}
async function searchProducts(vector) {
  const db = await getDB();

  const table = await db.openTable("products");

  const results = await table
    .search(vector)
    .limit(3)
    .toArray();

  return results;
}

async function tableExists() {
  const db = await getDB();

  const tables = await db.tableNames();

  return tables.includes("products");
}

export { getDB, addProducts, searchProducts, tableExists };