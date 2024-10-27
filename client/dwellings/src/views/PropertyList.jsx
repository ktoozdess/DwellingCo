import React from 'react';

// Функция для обрезки описания до двух предложений
const truncateDescription = (description) => {
  const sentences = description.split('.'); // Разделяем текст на предложения
  return sentences.slice(0, 1).join('.').trim() + (sentences.length > 1 ? '...' : ''); 
};

const PropertyList = ({ properties }) => {
  console.log(properties);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.length > 0 ? (
      properties.map((property) => (
        <div key={property.id} className="bg-white shadow-md rounded-lg overflow-hidden">
          <img src={property.image} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">{property.title}</h3>
            <p className="text-xl text-gray-600 mt-2">{property.price}</p>
            <p className="text-xl text-gray-600 mt-2">{property.location.city}, {property.location.district}, {property.location.street}</p>
            <p className="mt-2 text-gray-700">{truncateDescription(property.description)}</p> {/* Используем функцию для обрезки описания */}
            <p className="mt-2 text-gray-700">Contact: {property.person}</p>
          </div>
        </div>
      ))
      ) : (
        <div className="text-gray-600 font-semibold text-lg py-8">No results found for the specified city</div>
      )}
    </div>
  );
};

export default PropertyList;
