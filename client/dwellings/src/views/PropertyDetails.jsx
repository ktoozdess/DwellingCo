import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Slider from 'react-slick';

const PropertyDetails = () => {
  const location = useLocation();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchUrl = location.state?.searchUrl;

  const settings = {
    dots: true, 
    infinite: true, 
    speed: 500, 
    slidesToShow: 1, 
    slidesToScroll: 1, 
    autoplay: true, 
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/property/${id}`);
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [id]);

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

  if (!property) {
    return <div>No property found</div>;
  }

  const openFullScreen = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeFullScreen = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const nextImage = () => {
    const currentIndex = property.images.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % property.images.length;
    setSelectedImage(property.images[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = property.images.indexOf(selectedImage);
    const prevIndex = (currentIndex - 1 + property.images.length) % property.images.length;
    setSelectedImage(property.images[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-4">
        <Link to="/" className="hover:underline">Home</Link> &gt;{" "}
        <Link to={searchUrl} className="hover:underline">Search</Link> &gt;{" "}
        <span>Property Details</span>
      </div>

      {/* Property Title and Basic Info */}
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
        <p className="text-lg text-gray-600 mt-2">{property.price}/month - {property.location.city}, {property.location.district}, {property.location.street}</p>
      </div>

      {/* Image Gallery with Slider */}
      <div className="flex justify-center">
      <div className="mt-6 w-10/12 sm:w-6/12">
    <Slider {...settings}>
      {property.images && property.images.map((image, index) => (
        <div key={index}>
          <img
            src={image}
            alt={`Property ${index + 1}`}
            className="w-full rounded-lg cursor-pointer"
            onClick={() => openFullScreen(image)} // Function to open full-screen view
          />
        </div>
      ))}
    </Slider>
  </div>

      </div>
     
      {/* Thumbnails Gallery */}
      <div className="mt-6 flex gap-4 overflow-x-auto justify-center">
        {property.images && property.images.map((image, index) => (
          <div key={index} className="cursor-pointer" onClick={() => openFullScreen(image)}>
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-24 h-24 object-cover rounded-lg border-2 border-gray-300 hover:border-gray-500"
            />
          </div>
        ))}
      </div>
     

      {/* Full-Screen Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative max-w-3xl">
            <button
              onClick={closeFullScreen}
              className="absolute top-2 right-2"
            >
             <span className="material-symbols-outlined text-5xl font-semibold text-white">
              cancel
              </span>
            </button>
            
            <div className="flex justify-center items-center">
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
              >
                &#10094;
              </button>
              <img
                src={selectedImage}
                alt="Full-screen view"
                className="max-w-full max-h-screen object-contain"
              />
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
              >
                &#10095;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Property Details */}
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mt-8">
        <h2 className="text-2xl font-semibold text-gray-900">Property Details</h2>
        <p className="text-gray-700 mt-4">{property.description}</p>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Location</h3>
          <p className="text-gray-700">{property.location.address}</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Features</h3>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              {property.features ? (
                Object.entries(property.features).map(([key, value], index) => (
                  <li key={index}>{key}: {value}</li>
                ))
              ) : (
                <li>No features available</li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">Amenities</h3>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              {property.amenities && property.amenities.length > 0 ? (
                property.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))
              ) : (
                <li>No amenities listed</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Us - Phone Button */}
    <div className="bg-gray-50 p-6 mt-8 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-900">Interested? Call Us</h2>
      <p className="text-gray-700 mt-2">Click the button below to call us directly!</p>
      <a
        href={`tel:${property.phone}`} 
        className="bg-black text-white py-2 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition duration-300 w-3/12 my-5"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16.5l-4.2-4.2c-1.4-1.4-3.8-1.1-4.8.6l-2 3.9c-1-.8-2.1-1.6-3.3-2.5L7 11c-2.3-2.3-2.6-6-.4-8.4L2.7 2.7C2.1 3.3 1 4 1 5c0 5.5 4.5 10 10 10s10-4.5 10-10c0-1-.5-1.7-1.7-2.3z"/>
        </svg>
        Call Us
      </a>
    </div>

    </div>
  );
};

export default PropertyDetails;
