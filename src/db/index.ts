import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
  connectionString: config.connection_string,
});

export const initDB = async () => {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(20) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role varchar(20) default 'contributor',    
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS issues(
      id SERIAL PRIMARY KEY,
      title VARCHAR(150) NOT NULL,
      description VARCHAR NOT NULL,
      type VARCHAR(20) NOT NULL,
      status VARCHAR(20) DEFAULT 'open',
      reporter_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()

      )
      `);

    console.log("Database connected!!");
  } catch (error) {
    console.log(error);
  }
};
