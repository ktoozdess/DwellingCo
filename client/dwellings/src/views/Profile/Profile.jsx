// ProfilePage.js
import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        
        const response = await fetch('http://localhost:5001/api/profile', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 401) {
            // Token expired, log out user
            localStorage.removeItem('token');
            // Redirect to login or show a message to log in again
          }

        if (!response.ok) throw new Error('Failed to fetch profile data');

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!userData) return <p>Error loading profile data.</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
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
  );
};

export default ProfilePage;
