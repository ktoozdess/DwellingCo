import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home'; // Главная страница
import NotFound from './views/NotFound'; // Страница 404
import Header from './components/Header';
import Footer from './components/Footer';
import AboutUs from './views/AboutUs';
import SearchResult from './views/SearchResult';
import PropertyDetails from './views/PropertyDetails';
import LoginPage from './views/LoginPage/LoginPage';
import RegistrationPage from './views/RegistrationPage/RegistrationPage';
import ProfilePage from './views/Profile/Profile';

 const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResult />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/signup" element={<RegistrationPage />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App