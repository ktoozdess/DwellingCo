import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const PropertyMap = ({ city, street }) => {
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState(null);
  const [addressFound, setAddressFound] = useState(true); // Флаг для проверки, найден ли точный адрес
  
  let address = `${city}, ${street}`;

  // Функция для геокодирования адреса (получаем координаты)
  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setLocation([parseFloat(lat), parseFloat(lon)]); // Устанавливаем координаты
        setAddressFound(true); // Точный адрес найден
      } else {
        // Если точный адрес не найден, пробуем найти только город
        const cityResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`);
        const cityData = await cityResponse.json();
        const { lat, lon } = cityData[0];
        setLocation([parseFloat(lat), parseFloat(lon)]);
        setAddressFound(false); // Адрес не найден, показываем город
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  };

  // Инициализация карты и добавление маркера
  useEffect(() => {
    if (address) {
      geocodeAddress(address); // Геокодируем адрес
    }
  }, [address]);

  useEffect(() => {
    if (location && !map) {
      // Создаем карту с координатами
      const newMap = L.map('map').setView(location, 14);
      setMap(newMap);

      // Добавляем OpenStreetMap слой
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(newMap);

      // Добавляем маркер на карту
      const popupMessage = addressFound 
        ? `Property Location: ${address}` 
        : `City Location: ${city}`; // Меняем сообщение, если точный адрес не найден

      L.marker(location).addTo(newMap)
        .bindPopup(popupMessage)
        .openPopup();
    } else if (location && map) {
      // Если координаты изменяются, обновляем местоположение
      map.setView(location, 14);

      // Добавляем маркер с обновленным сообщением
      const popupMessage = addressFound 
        ? `Property Location: ${address}` 
        : `City Location: ${city}`;

      L.marker(location).addTo(map)
        .bindPopup(popupMessage)
        .openPopup();
    }
  }, [location, map, address, addressFound]);

  return (
    <div className="flex justify-center">
      <div id="map" style={{ width: '100%', height: '400px', zIndex: '1' }}></div>
    </div>
  );
};

export default PropertyMap;
