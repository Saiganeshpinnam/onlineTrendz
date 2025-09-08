const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 7000;

app.use(cors());
app.use(express.json());

const users = [{ username: 'admin', password: 'admin123' }];
const JWT_SECRET = 'your_real_jwt_secret';

app.post('/login', (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      return res.json({ jwt_token: JWT_SECRET });
    } else {
      return res.status(401).json({ error_msg: 'Invalid credentials' });
    }
  } catch (err) {
    next(err);
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error_msg: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error_msg: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
