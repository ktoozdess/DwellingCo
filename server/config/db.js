const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB подключен');
  } catch (err) {
    console.error('Ошибка подключения к MongoDB:', err);
    process.exit(1);  // Завершить процесс с ошибкой
  }
};

module.exports = connectDB;
