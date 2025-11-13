// backend/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const OpenAI = require("openai");
const Item = require("./models/Item");
const Product = require("./models/Product");
const dummyProducts = require("./seedProducts");

// Disable buffering so queries fail fast when MongoDB is down
mongoose.set('bufferCommands', false);

const app = express();
const PORT = process.env.PORT || 7000;
const JWT_SECRET = process.env.JWT_SECRET || "your_real_jwt_secret";

// --- Middleware ---
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'];

// Enable CORS for all routes
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

app.use(express.json());

// --- Routes ---

// Get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        return res.json(products);
    } catch (error) {
        console.error('Error fetching products from DB. Serving dummy products:', error?.message || error);
        try {
          // Fallback: serve dummy products if DB is down/unavailable
          return res.json(dummyProducts);
        } catch (fallbackErr) {
          console.error('Fallback to dummy products failed:', fallbackErr);
          return res.status(500).json({ message: 'Error fetching products' });
        }
    }
});


// --- MongoDB Connection ---
const mongoURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/onlineTrendz";

mongoose
  .connect(mongoURI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");
    try {
      const productCount = await Product.countDocuments();
      if (productCount === 0) {
        await Product.insertMany(dummyProducts);
        console.log("🌱 Seeded dummy products");
      }
    } catch (seedErr) {
      console.error("Seeding error:", seedErr);
    }
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
// --- OpenAI Setup ---
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// --- Dummy User Login (for testing only) ---
const users = [{ username: "admin", password: "admin123" }];

// User login
app.post("/login", (req, res) => {
  try {
    console.log('Login attempt:', req.body);
    
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ 
        success: false,
        error_msg: 'Username and password are required' 
      });
    }

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      console.log('Invalid login attempt for user:', username);
      return res.status(401).json({ 
        success: false,
        error_msg: 'Invalid username or password' 
      });
    }

    console.log('Successful login for user:', username);
    return res.json({ 
      success: true,
      jwt_token: JWT_SECRET,
      user: { 
        username: user.username 
      } 
    });

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ 
      success: false,
      error_msg: 'Internal server error' 
    });
  }
});

// --- CRUD Routes for Items ---

// Get all items
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// Create new item
app.post("/items", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: "Failed to create item" });
  }
});

// Update item by ID
app.put("/items/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem)
      return res.status(404).json({ error: "Item not found" });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: "Failed to update item" });
  }
});

// Delete item by ID
app.delete("/items/:id", async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Item not found" });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: "Failed to delete item" });
  }
});

// --- AI Chatbot Route ---
app.post("/chat", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query || query.trim() === "") {
      return res.status(400).json({ error: "Query is required" });
    }

    // Fetch product data for context
    const items = await Item.find();
    const itemContext = items
      .map(
        (item) =>
          `Name: ${item.name}, Description: ${item.description}, Price: ${item.price}, Category: ${item.category}, Stock: ${item.stock}`
      )
      .join("\n");

    const prompt = `You are a helpful AI shopping assistant for an online store called "OnlineTrendz".
Use the product data below to answer customer questions in a friendly and concise way.
If the answer is not found in the product data, respond politely that you don't know.

Product data:
${itemContext}

User query: ${query}
Assistant:`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const reply = response.choices[0].message.content.trim();
    res.json({ reply });
  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({ error: "Failed to process query" });
  }
});

// --- 404 Handler ---
app.use((req, res) => {
  res.status(404).json({ error_msg: "Route not found" });
});

// --- Global Error Handler ---
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error_msg: "Internal server error" });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
