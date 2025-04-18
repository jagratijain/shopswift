const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool, setupDatabase } = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
setupDatabase().catch(err => {
  console.error('Database initialization error:', err);
});

// Routes
app.get('/', (req, res) => {
  res.send('ShopSwift API is running');
});

// User registration
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    
    // Check if user already exists
    const [existingUsers] = await pool.execute(
      'SELECT * FROM users WHERE email = ? OR username = ?', 
      [email, username]
    );
    
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Email or username already in use' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)',
      [name, email, username, hashedPassword]
    );
    
    res.status(201).json({ 
      message: 'User registered successfully', 
      userId: result.insertId 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// User login - updated to handle both email and username login methods
app.post('/api/login', async (req, res) => {
  try {
    const { email, username, password, loginMethod } = req.body;
    
    // Determine which field to use for authentication
    let query = 'SELECT * FROM users WHERE email = ?';
    let params = [email];
    
    // If login method is username, change the query
    if (loginMethod === 'username') {
      query = 'SELECT * FROM users WHERE username = ?';
      params = [username];
    }
    
    // Find user
    const [users] = await pool.execute(query, params);
    
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const user = users[0];
    
    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});