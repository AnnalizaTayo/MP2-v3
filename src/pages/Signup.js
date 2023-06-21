import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import './Signup.css';

const SignUpPage = () => {
  const [isSignup , setSignup] = useState(false);



  useEffect(() => {
    // Check if user data exists in localStorage
    const userString = localStorage.getItem('user');
    if (userString) {
      window.location.href = '/';
    }
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    petName: '',
    petType: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
  
    // Lowercase petType and email
    const lowercaseFields = ['petType', 'email'];
    if (lowercaseFields.includes(name)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value.toLowerCase(),
      }));
    } else {
      // Capitalize firstName, lastName, and petName
      const capitalizedFields = ['firstName', 'lastName', 'petName'];
      if (capitalizedFields.includes(name)) {
        const capitalizedValue = value
          .toLowerCase()
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: capitalizedValue,
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      }
    }

  };
  

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Trim the input and check for null values
    const trimmedFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value.trim()])
    );
  
    if (Object.values(trimmedFormData).some((value) => value === '')) {
      setErrorMessage('Please enter a valid input');
      return;
    }
  
    // Check if the passwords match
    if (trimmedFormData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    } else if ((formData.password < 6 || formData.password > 16) && (formData.confirmPassword < 6 || formData.confirmPassword > 16)){
      setErrorMessage('Password must be between 6 and 16 characters.');
      return;
    }
  
    // Check if the email already exists
    const apiUrl = 'https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/users';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const existingUser = data.find(
          (user) => user.email === trimmedFormData.email
        );
  
        if (existingUser) {
          //setErrorMessage('Email already exists');
          return Promise.reject('Email already exists.');
        }
  
        // Remove the confirmPassword field
        delete trimmedFormData.confirmPassword;
  
        const petPictureUrl = 'https://scontent.fmnl4-4.fna.fbcdn.net/v/t39.30808-6/353831107_2959207134212731_742275240005757005_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=rHyHcKBTcocAX9Rkdt3&_nc_ht=scontent.fmnl4-4.fna&oh=00_AfCpOMtvaLKpl8wTS47gOV2BktA0eBQ5uPa1KpXdtGY2zQ&oe=6497356B';
  
        const newUser = {
          ...trimmedFormData,
          profilePicture:
            'https://scontent.fmnl4-1.fna.fbcdn.net/v/t39.30808-6/352554740_2959207507546027_6149777498805105775_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=730e14&_nc_ohc=EN8-2KI-wygAX_5ZlCd&_nc_ht=scontent.fmnl4-1.fna&oh=00_AfDGDk0bvBEYuuk5j8IQYyBtU45iCxAjleqO1dzKSgUmFg&oe=64977377',
          petPicture: petPictureUrl,
          id: (data.length + 1).toString(),
        };
  
        return fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });
      })
      .then(() => {
        // Clear the form data
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          petName: '',
          petType: '',
        });
        setErrorMessage('');
        setSignup(true);
        setTimeout(() => {
          setSignup(false);
        }, 3000);
        // Wait for the form data to be cleared before redirecting
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage(error);
      });
  };
  

  return (
    <div>
      <div className="signup-form">
        <header>Sign Up</header>
        <form onSubmit={handleSubmit}>
          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}
          <div className="field">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="input"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="input"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              className="input password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              {passwordVisible ? <RiEyeOffLine /> : <RiEyeLine />}
            </span>
          </div>

          <div className="field">
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="input password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              {passwordVisible ? <RiEyeOffLine /> : <RiEyeLine />}
            </span>
          </div>

          <div className="field">
            <input
              type="text"
              name="petName"
              placeholder="Pet Name"
              className="input"
              value={formData.petName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <select
              name="petType"
              className="input"
              value={formData.petType}
              onChange={handleChange}
              required
            >
              <option value="">Select Pet Type</option>
              <option value="bird">Bird</option>
              <option value="cat">Cat</option>
              <option value="dog">Dog</option>
              <option value="fish">Fish</option>
              <option value="reptile">Reptile</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div className="field button-field">
            <button type="submit">Sign Up</button>
          </div>
        </form>

        <div className="form-link">
          <span>
            Already have an account?{' '}
            <Link to="/login" className="link login-link">
              Login
            </Link>
          </span>
        </div>
      </div>
      {isSignup ? (
        <div className='alertPopup'>
            <div className='popUpAlert'>
                <div className='popUp-container'>
                    <div className='notLogged'>
                        <p>Meow! Thank you for signing up. Nyang!</p>
                        <img src='https://media.tenor.com/otQWdoWmvvsAAAAi/ok-dance.gif' alt='Successful Signup'/>
                    </div>
                </div>
            </div>
        </div>
      ) : ''}
    </div>
  );
};

export default SignUpPage;