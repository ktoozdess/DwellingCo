const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Property = require('./models/Property');
const User = require('./models/User'); 
const authMiddleware = require('./authMiddleware');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://5.249.145.114:5002/', 
    'http://dwellingco.site/', 
  ], // Allow requests only from this frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true, // Allow cookies or other credentials
}));

app.use(express.json());

connectDB();

app.post('/api/register', async (req, res) => {
  const { name, surname, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ name, surname, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '3h',
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });

  }
});

app.get('/api/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('name surname email favorites'); // Fetch only specific fields

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/property/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/properties', async (req, res) => {
  const { city } = req.query;

  try {
    const filter = {};
    if (city) {
      filter['location.city'] = city.toLowerCase(); // Приведение к нижнему регистру
    }

    const properties = await Property.find({
      'location.city': { $regex: new RegExp(`^${city.trim()}`, 'i') }, // Регистронезависимый поиск
    });

    res.json(properties);
  } catch (error) {
    console.error('Ошибка при получении свойств:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

app.get('/', (req, res) => {
  res.send('Сервер работает!');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});


