const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Create a pool for database connections
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function setupDatabase() {
  try {
    // Check if admin exists
    const [adminResult] = await pool.execute(
      "SELECT * FROM users WHERE email = 'admin@shopswift.com'"
    );
    
    if (adminResult.length === 0) {
      // Create admin user with hashed password
      const hashedPassword = await bcrypt.hash('jaggs123', 10);
      
      await pool.execute(
        "INSERT INTO users (email, username, password, name, role) VALUES (?, ?, ?, ?, ?)",
        ['admin@shopswift.com', 'admin', hashedPassword, 'Admin User', 'admin']
      );
      console.log('Admin user created!');
    } else {
      console.log('Admin user already exists.');
    }
    
    console.log('Database setup complete!');
    return true;
  } catch (error) {
    console.error('Error setting up database:', error);
    throw error;
  }
}

module.exports = {
  pool,
  setupDatabase
};