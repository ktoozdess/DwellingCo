import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (city.trim()) {
        const searchUrl = `/search?city=${city.trim()}`;
        navigate(searchUrl, { state: { searchUrl } });
      }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <ul className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 ">
          <li>
            <a href="https://t.me/DwellingCo" className="flex items-center space-x-2">
              <b className="text-blue-900">Our TG Blog</b>
              <img className="w-6" src="https://iconsdwelling.r1-it.storage.cloud.it/telegram_logo_icon.png" />
            </a>
          </li>
        </ul>
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      <h1 className="text-5xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-8 text-center">Welcome to Dwelling</h1>
      <p className="text-2xl sm:text-lg text-gray-600 mb-4 sm:mb-6 text-center">Find the perfect rental.</p>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center w-full sm:w-auto">
        <input
          type="text"
          placeholder="Enter a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-3 w-full sm:w-80 border border-gray-300 rounded shadow-md text-gray-700"
        />
       
        <button
          onClick={handleSearch}
          className="bg-black text-white py-2 px-6 w-full sm:w-auto rounded hover:bg-gray-800 transition duration-300"
        >
          Search
        </button>
      </div>
      <div className="mt-6 text-start">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Currently available in:</h2>
        <p className="text-gray-600">
          Pavia, Cremona, Lecco, Bergamo, Brescia, Como, Monza
        </p>
      </div>
    </div>
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-3 text-center lg:text-left">
        <div className="lg:col-span-3 flex flex-col items-center lg:items-start">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 tracking-tight mb-6">
            About <span className="text-gray-900">Dwelling</span>
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
            Discover your perfect rental with <span className="font-semibold text-gray-800">Dwelling</span> – a new way to find homes.
          </p>
        </div>

        <div className="bg-grey-200 p-6 rounded-lg shadow-md lg:order-1">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Story</h2>
          <p className="text-lg leading-relaxed text-gray-600">
            We are dedicated to helping you find the best rentals. Starting in Lombardy, we aim to expand our services across Italy and beyond, bringing ease and reliability to the rental market.
          </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed text-gray-600">
            At <span className="text-gray-800 font-semibold">Dwelling</span>, we make finding your new home simple and transparent. Our goal is to provide high-quality, affordable rental options for everyone.
          </p>
        </div>

        <div className="bg-grey-100 p-6 rounded-lg shadow-md lg:col-span-2 lg:order-3">
          <h2 className="text-2xl font-semibold text-gray-800">Where We Are</h2>
          <p className="text-lg text-gray-700 mt-2">
            Currently available in Lombardy, Italy. We’re here to help you find your ideal rental home.
          </p>
          <p className="text-lg text-gray-700 mt-4 font-semibold">
            And soon, we’ll be supporting more cities across the country, bringing even more choices to renters everywhere.
          </p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Home;
