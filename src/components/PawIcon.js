import React, { useEffect } from 'react';
import './PawIcon.css'; // Create a CSS file for PawIcon styles
import PawLogo from '../imgs/PawOrder.svg'; // Replace with your own logo file

const PawIcon = () => {
  useEffect(() => {
    const hideSlideBrand = setTimeout(() => {
      const slideBrandElement = document.querySelector('.preloaderbg');
      if (slideBrandElement) {
        slideBrandElement.style.display = 'none';
      }
    }, 4000);

    return () => clearTimeout(hideSlideBrand);
  }, []);
  return (
    <div className="preloaderbg fade-out">
      <div className='paw-icon'>
        <span className='paw-container'>
          <img src={PawLogo} alt="Paw Logo" className="paw" />
        </span>
        <span className='slidebrand'>
          <span className="text">PawOrder Pet Shop</span>
        </span>
      </div>
    </div>
    
  );
};

export default PawIcon;
