import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const truncateDescription = (description) => {
  const sentences = description.split('.'); // Разделяем текст на предложения
  return sentences.slice(0, 1).join('.').trim() + (sentences.length > 1 ? '...' : ''); 
};

const PropertyList = ({ properties }) => {
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.length > 0 ? (
      properties.map((property) => (
        <Link key={property.id} to={{
          pathname: `/property/${property._id}`,
      
        }} 
        className="bg-white shadow-md rounded-lg overflow-hidden">
          <img src={property.previewimg} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">{property.title}</h3>
            <p className="text-xl text-gray-600 mt-2">{property.price} &#8364; / month</p>
            <p className="text-xl text-gray-600 mt-2">{property.location.city}, {property.location.district}, {property.location.street}</p>
            <p className="mt-2 text-gray-700">{truncateDescription(property.description)}</p> {/* Используем функцию для обрезки описания */}
            <p className="mt-2 text-gray-700">Contact: {property.person}</p>
          </div>
        </Link>
      ))
      ) : (
        <div className="text-gray-600 font-semibold text-lg py-8">No results found for the specified city</div>
      )}
    </div>
  );
};
PropertyList.propTypes = {
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      previewimg: PropTypes.string.isRequired,
      description: PropTypes.string,
      person: PropTypes.string.isRequired,
      location: PropTypes.shape({
        city: PropTypes.string.isRequired,
        district: PropTypes.string,
        street: PropTypes.string,
      }).isRequired,
    })
  ).isRequired,
};

export default PropertyList;
