// backend/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const OpenAI = require("openai");
const Item = require("./models/Item");

const app = express();
const PORT = process.env.PORT || 7000;
const JWT_SECRET = process.env.JWT_SECRET || "your_real_jwt_secret";

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- MongoDB Connection ---
const mongoURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/onlineTrendz";

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- OpenAI Setup ---
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// --- Dummy User Login (for testing only) ---
const users = [{ username: "admin", password: "admin123" }];

app.post("/login", (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      return res.json({ jwt_token: JWT_SECRET });
    } else {
      return res.status(401).json({ error_msg: "Invalid credentials" });
    }
  } catch (err) {
    next(err);
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
