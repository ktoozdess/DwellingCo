// ProfilePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        
        const response = await fetch('/api/profile', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login')
          }

        if (!response.ok) throw new Error('Failed to fetch profile data');

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        navigate('/signin')
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!userData) return <p>Error loading profile data.</p>;

  return (
    <div className="pt-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
      <div className="mt-4 bg-white p-4 rounded shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800">
          {userData.name} {userData.surname}
        </h3>
        <p className="text-gray-600">{userData.email}</p>
      </div>
      <div className="p-6 bg-gray-100 min-h-screen flex items-start justify-center">
      <div className="bg-white p-6 rounded shadow-lg text-center max-w-lg rounded-md">
        <p className="text-gray-600">
          Exciting features are on the way! Soon, this page will include favorites and much more.
        </p>
        <p className="text-gray-600 mt-2">
          Please check back later to see all the updates.
        </p>
      </div>
    </div>
      </div>
    </div>
  );
};

export default ProfilePage;
