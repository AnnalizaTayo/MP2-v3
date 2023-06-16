import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './App.css';
import { FaHome, FaArrowUp } from 'react-icons/fa';
import Header from './components/Header';
import Footer from './components/Footer';
import PawIcon from './components/PawIcon';
//import Search from './components/search';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductsPage from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';
import VetConsultationPage from './pages/VetConsultationPage';
import WishListPage from './pages/WishListPage';
import Logout from './pages/signout';
import CartPage from './pages/CartPage';
import ProductManagement from './adminPages/ProductManagement';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userString = localStorage.getItem('user');
    setIsLoggedIn(!!userString);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavigateToLogin = () => {
    alert('You are not logged in. Please login to your account.');
    navigate('/login');
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {isLoading ? (
        <PawIcon />
      ) : (
        <div>
          <PawIcon />
          <Header />
          <Routes>
            {
            isLoggedIn ? (
              <>
                <Route path="/consultation" element={<VetConsultationPage />} />
                <Route path="/wishlist" element={<WishListPage />} />
                <Route path="/cart" element={<CartPage />} />
              </>
            ) : (
              <>
                <Route
                  path="/consultation"
                  element={<ProtectedPage onNavigate={handleNavigateToLogin} />}
                />
                <Route
                  path="/wishlist"
                  element={<ProtectedPage onNavigate={handleNavigateToLogin} />}
                />
                <Route
                  path="/cart"
                  element={<ProtectedPage onNavigate={handleNavigateToLogin} />}
                />
              </>
            )}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/products/pettype/:pettype/category/:category/search/:search" element={<ProductsPage />}/>
            <Route path="/products/pettype/:pettype/category/:category" element={<ProductsPage />}/>
            <Route path="/products/pettype/:pettype" element={<ProductsPage />}/>
            <Route path="/products/category/:category/search/:search" element={<ProductsPage />}/>
            <Route path="/products/category/:category" element={<ProductsPage />}/>
            <Route path="/products/search/:search" element={<ProductsPage />}/>
            <Route exact path="/products" element={<ProductsPage />} />
            {/*//pettype,category,search*/}
            {isLoggedIn ? (
              <Route path="/profile" element={<ProfilePage />} />
            ) : (
              <Route
                path="/profile"
                element={<ProtectedPage onNavigate={handleNavigateToLogin} />}
              />
            )}
            <Route path="/admin" element={<ProductManagement />} />
            {/* <Route path="/search" element={<Search />} /> */}
          </Routes>
          {showButton && (
            <button className="back-to-top-button" onClick={handleBackToTop}>
              <FaArrowUp />
            </button>
          )}
          {location.pathname !== '/' && (
            <Link to="/" className="floating-button">
              <FaHome />
            </Link>
          )}
          <Footer />
        </div>
      )}
    </div>
  );
}

function ProtectedPage({ onNavigate }) {
  useEffect(() => {
    onNavigate();
  }, [onNavigate]);

  return null;
}

export default App;
