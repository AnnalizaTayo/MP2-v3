import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaYoutube } from 'react-icons/fa';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import logo from '../imgs/whiteLogo.png';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [showSubscriptionSuccess, setShowSubscriptionSuccess] = useState(false);
  const [showEmailWarning, setShowEmailWarning] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('subs-email');
    const email = emailInput.value.trim();

    if (email) {
      const url = 'https://6478b937362560649a2e5ab6.mockapi.io/api/v1/subscribers';
      const data = { email };

      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          const existingEmail = result.find((item) => item.email === email);
          if (existingEmail) {
            setEmail('');
            setShowEmailWarning(true);
            // Hide the warning after 3 seconds
            setTimeout(() => {
              setShowEmailWarning(false);
            }, 3000);
          } else {
            // Email is not registered, proceed with submission
            fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            })
              .then((response) => response.json())
              .then((result) => {
                // Reset the email input after successful submission
                setEmail('');
                // Show the subscription success message
                setShowSubscriptionSuccess(true);
                // Hide the message after 3 seconds
                setTimeout(() => {
                  setShowSubscriptionSuccess(false);
                }, 3000);
              })
              .catch((error) => {
                console.error('Error submitting newsletter subscription:', error);
              });
          }
        })
        .catch((error) => {
          console.error('Error checking email existence:', error);
        });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-newsletter">
          <div className='newsletter-box'>
            <h2>Newsletter</h2>
            <p>Subscribe to our newsletter and stay updated with the latest pet news, promotions, and more!</p>
            <form className='subs'onSubmit={handleSubmit}>
              <input type="email" id='subs-email' placeholder="Enter your email.." value={email} onChange={handleEmailChange} required/>
              <button type='submit'>Subscribe</button>
            </form>
            {showSubscriptionSuccess && (
              <div className="subscription-success">
                <p>You have successfully subscribed to our newsletter!</p>
              </div>
            )}
            {showEmailWarning && (
              <div className="email-warning">
                <p>This email is already registered for the newsletter.</p>
              </div>
            )}
          </div>
        </div>
        <div className="footer-contact">
          <h2>Follow us</h2>
          <div className="footer-social">
            <a href="https://www.facebook.com/paworder" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="social-icon" />
            </a>
            <a href="https://www.twitter.com/paworder" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="social-icon" />
            </a>
            <a href="https://www.instagram.com/paworder" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social-icon" />
            </a>
            <a href="https://www.pinterest.com/paworder" target="_blank" rel="noopener noreferrer">
              <FaPinterest className="social-icon" />
            </a>
            <a href="https://www.youtube.com/paworder" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="social-icon" />
            </a>
          </div>
          <h2>Contact us</h2>
          <div className='footer-contactus'>
              <a href='tel:+6386509201'><BsFillTelephoneFill className='footer-icon'/> 0999-999-9999</a>
              <a href='mailto:paworder@gmail.com?subject=Your%20Subject'><MdEmail className='footer-icon'/> support@paworder.com</a>
          </div>
        </div>      
        
        <div className="footer-brand">
          <img src={logo} alt="PawOrder Pet Shop"/>
          <h1>Pet Shop</h1>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 PawOrder Pet Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
