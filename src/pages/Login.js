import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import './Login.css';

const Login = () => {
  useEffect(() => {
    // Check if user data exists in localStorage
    const userString = localStorage.getItem('user');
    if (userString) {
      window.location.href = '/';
    }
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetLinkSent, setResetLinkSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value.toLowerCase());
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleForgotPassword = () => {
    setForgotPassword(true);
    setResetLinkSent(false); // Reset the reset link status
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    const trimmedEmail = email.trim();
    if (trimmedEmail === '') {
      setErrorMessage('Please enter a valid input');
      setResetLinkSent(false);
      return;
    } else {
        try {
            // Send a password reset request to the server
            // Handle the response accordingly
            setErrorMessage('');
            setSuccessMessage('Password reset link sent to your email');
            setResetLinkSent(true);
            setEmail(''); // Clear the email input field
          } catch (error) {
            console.log('Error:', error);
          }
    }


  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/users'
      );
      const data = await response.json();
      const user = data.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        setErrorMessage('');
        localStorage.setItem('user', JSON.stringify(user));
        console.log('User logged in:', user);
        window.location.href = '/';
      } else {
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      console.log('Error:', error);
      setErrorMessage('Error occurred while logging in');
    }
  };

  const handleBackToLogin = () => {
    setForgotPassword(false);
    setResetLinkSent(false);
    setSuccessMessage('');
    setErrorMessage('');
  };
  return (
    <div>
      <div className="login-form">
        {forgotPassword ? (
          <div>
            <header>Forgot Password</header>
            <form onSubmit={handleForgotPasswordSubmit}>
              <div className="field">
                <input
                  type="email"
                  placeholder="Email"
                  className="input"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              {successMessage && (
                <div className="success-message">{successMessage}</div>
              )}
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}

              <div className="field button-field">
                <button type="submit">Reset Password</button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <header>Login</header>
            <form onSubmit={handleSubmit}>
              <div className="field">
                <input
                  type="email"
                  placeholder="Email"
                  className="input"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>

              <div className="field">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Password"
                  className="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <span className="eye-icon" onClick={togglePasswordVisibility}>
                  {passwordVisible ? <RiEyeOffLine /> : <RiEyeLine />}
                </span>
              </div>

              {successMessage && (
                <div className="success-message">{successMessage}</div>
              )}
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
              <div className="form-link">
                {resetLinkSent ? (
                  <span>
                    Reset link sent!{' '}
                    <Link to="/login" className="link back-to-login">
                      Back to Login
                    </Link>
                  </span>
                ) : (
                  <Link className="forgot-pass" onClick={handleForgotPassword}>
                    Forgot password?
                  </Link>
                )}
              </div>

              <div className="field button-field">
                <button type="submit">Login</button>
              </div>
            </form>
          </>
        )}

        <div className="form-link">
          <span>
            {resetLinkSent
              ? "Back to "
              : "Don't have an account? "}
            {resetLinkSent ? 
                <Link to="/login" className="link signup-link" onClick={handleBackToLogin}>
                    Login
                </Link>
             : 
             
             <Link to="/signup" className="link signup-link">
                Signup
             </Link>}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;