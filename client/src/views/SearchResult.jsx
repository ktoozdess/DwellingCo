import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropertyList from './PropertyList'; 

const SearchResult = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true); 
  const itemsPerPage = 21; 
  const location = useLocation(); 
  const navigate = useNavigate(); 
  
  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get('page')) || 1;
  const city = query.get('city'); // Get the city from the URL query

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`/api/properties?city=${city}`); 
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const data = await response.json();
        setProperties(data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [city]);

  const totalPages = Math.ceil(properties.length / itemsPerPage);

  const getCurrentProperties = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return properties.slice(startIndex, startIndex + itemsPerPage);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      navigate(`?page=${page}&city=${city}`);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Loading spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
        <style>{`
          .spinner {
            border: 8px solid rgba(0, 0, 0, 0.1);
            border-top: 8px solid #000;
            border-radius: 50%;
            width: 80px;
            height: 80px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* <div className="mb-6 p-4 bg-white border border-gray-300 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 text-black">Filters</h3>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
          <select
            className="mb-4 sm:mb-0 border border-gray-400 rounded p-2 text-gray-700"
            value={selectedTransaction}
            onChange={(e) => setSelectedTransaction(e.target.value)}
          >
            <option value="for sale">For Sale</option>
            <option value="for rent">For Rent</option>
          </select>

          <button
            onClick={handleFilter}
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300"
          >
            Apply Filters
          </button>
        </div>
      </div> */}
      
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Properties for {city}</h2>
      <PropertyList properties={getCurrentProperties()} />
      
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchResult;
