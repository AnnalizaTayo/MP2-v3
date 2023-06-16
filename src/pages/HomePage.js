import React, { useEffect, useState } from 'react';
import NewsletterModal from '../components/newsmodal';
import './HomePage.css';
import dog from '../imgs/dog.png';
import cat from '../imgs/cat.png';
import fish from '../imgs/fish.png';
import others from '../imgs/hamster.png';
import banner from '../imgs/banner.png';
import banner2 from '../imgs/bannerPortrait.png';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [userSubscribed, setUserSubscribed] = useState(false);

  useEffect(() => {
    // Check user subscription status
    const userString = localStorage.getItem('user');
    console.log(userString);
    if (userString) {
      const user = JSON.parse(userString);
      if (user.subscribed === false) {
        setUserSubscribed(false);
        setTimeout(() => {
            setShowPopup(true);
        }, 4000);
      }
    } else if (userString === null){
      setTimeout(() => {
        setShowPopup(true);
    }, 4000);
    }   
  }, []);

  return (
    <section>
      {!userSubscribed && showPopup && <NewsletterModal />}
      <div className="home">
        <Link to="/consultation" className="banner">
          <img className="landscape" src={banner} alt="banner" />
          <img className="portrait" src={banner2} alt="banner" />
        </Link>
        <div className='categories'>
          <div className="bold-text"><h3>SHOP FOR:</h3></div>
          <div className="category-buttons">
            <Link to="/products/pettype/dog">
              <img src={dog} alt="dog" />
              <h2>Dog</h2>
            </Link>
            <Link to="/products/pettype/cat">
              <img src={cat} alt="cat" />
              <h2>Cat</h2>
            </Link>
            <Link to="/products/pettype/fish">
              <img src={fish} alt="fish" />
              <h2>Fish</h2>
            </Link>
            <Link to="/products/pettype/small animals|bird|reptile">
              <img src={others} alt="hamster" />
              <h2>Others</h2>
            </Link>
          </div>
        </div>
        <div className="colored-box">
          <div className="about">
            <h3>About PawOrder Pet Shop</h3>
          </div>
          <div className="foot"><p>"At PawOrder Pet Shop, we're dedicated to simplifying pet care. Our online vet consultation scheduler makes booking appointments effortless. With a user-friendly interface and real-time synchronization using the Google Sheets API, we ensure a seamless experience for both pet owners and our veterinary team. Trust PawOrder for convenient access to professional veterinary advice."</p></div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
