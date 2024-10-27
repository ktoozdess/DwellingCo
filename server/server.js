const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Property = require('./models/Property'); // Импортируем модель Property
const dotenv = require('dotenv');

// Инициализация переменных окружения
dotenv.config();

// Инициализация приложения
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Подключение к MongoDB
connectDB();

app.get('/api/properties', async (req, res) => {
  const { city } = req.query;

  try {
    const filter = {};
    

    if (city) {
      filter['location.city'] = city.toLowerCase(); // Приведение к нижнему регистру
    }
    
    const properties = await Property.find({
      'location.city': { $regex: new RegExp(`^${city.trim()}`, 'i') } // Регистронезависимый поиск
    });    console.log(properties);
    
    res.json(properties); // Отправляем отфильтрованные данные на фронт
  } catch (error) {
    console.error('Ошибка при получении свойств:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});


// Пример маршрута
app.get('/', (req, res) => {
  res.send('Сервер работает!');
});

// Запуск сервера
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
