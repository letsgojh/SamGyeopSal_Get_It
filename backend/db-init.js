import fs from "fs";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const initPool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  multipleStatements: true
});

function loadSQL(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

async function initDB() {
  try {
    const schema = loadSQL("./src/db/schema.sql");
    const seed = loadSQL("./src/db/seed.sql");

    console.log("🔧 schema.sql 실행 중...");
    await initPool.query(schema);  // 여기서 DB 생성됨 (CREATE DATABASE 포함)

    console.log("🌱 seed.sql 실행 중...");
    await initPool.query(seed);

    console.log("🎉 DB 초기화 완료!");
    process.exit(0);
  } catch (err) {
    console.error("❌ DB 초기화 실패:", err);
    process.exit(1);
  }
}

initDB();
