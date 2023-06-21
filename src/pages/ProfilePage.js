import React, { useState, useEffect } from 'react';
import CareTips from '../components/CareTips';
import './ProfilePage.css';
import NotLogged from '../components/NotLoggedIn';
import OrderTransaction from '../components/OrderTransaction';

const ProfilePage = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (user !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check the password error before submitting the form
    const passwordError = user.password.length < 6 || user.password.length > 16;

    setUser((prevUser) => ({
      ...prevUser,
      passwordError: passwordError,
    }));

    // If there is a password error, return and do not submit the form
    if (passwordError) {
      return;
    }

    try {
      const response = await fetch(
        'https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/users'
      );

      if (response.ok) {
        const users = await response.json();
        const existingUser = users.find(
          (u) => u.email === user.email && u.id !== user.id
        );

        if (existingUser) {
          setShowWarning(true);
          setTimeout(() => {
            setShowWarning(false);
          }, 2000);
          return;
        }

        // Remove the passwordError from the user data
        const { passwordError, ...userDataWithoutError } = user;

        const updateResponse = await fetch(
          `https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/users/${user.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDataWithoutError),
          }
        );

        if (updateResponse.ok) {
          localStorage.setItem('user', JSON.stringify(user));
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
            toggleForm(); // Toggle the showForm state to false
          }, 2000);
        } else {
          alert('Failed to update profile');
        }
      } else {
        console.error('Failed to fetch users from API');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleForm = () => {
    if (showForm) {
      // Revert form values to the original user values
      setUser(JSON.parse(localStorage.getItem('user')));
    }
    setShowForm(!showForm);
  };

  const handleLogout = () => {
    // Clear localStorage and redirect to the login page
    localStorage.removeItem('user');
    window.location.replace('/');
  };

  return (
    <>
      {!isLoggedIn ? (
        <NotLogged />
      ) : (
        <div className="profilePage">
          <aside>
            <div className="profile-container">
              <div className="profile-picture">
                <img src={user.profilePicture} alt="Profile" />
              </div>
              <div className="profile-details">
                <h2>
                  {user.firstName} {user.lastName}
                </h2>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Address: {user.address}</p>
              </div>
            </div>
            <div className="pet-profile">
              <h2>My Pet</h2>
              <img src={user?.petPicture} alt="Pet" />
              <h3>{user?.petName}</h3>
              <p>Type: {user?.petType}</p>
            </div>
            <div className="profileButtons">
              <div className="editButton">
                <button className="edit-button button" onClick={toggleForm}>
                  Edit Profile
                </button>
                <div className="editProfile-container">
                  {showForm && (
                    <div className="editProfileform-container">
                      <button
                        className="cancel-button"
                        onClick={toggleForm}
                      >
                        &times;
                      </button>
                      <form className="editForm" onSubmit={handleSubmit}>
                        <div className="editinput">
                          <label htmlFor="profilePicture">
                            Profile Picture:
                          </label>
                          <input
                            type="text"
                            id="profilePicture"
                            name="profilePicture"
                            value={user.profilePicture}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="editinput">
                          <label htmlFor="firstName">First Name:</label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={user.firstName}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="editinput">
                          <label htmlFor="lastName">Last Name:</label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={user.lastName}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="editinput">
                          <label htmlFor="email">Email:</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                          />
                          {showWarning && (
                            <div className="warning-message">
                              <strong>Warning:</strong> Email already exists for
                              another user.
                            </div>
                          )}
                        </div>
                        <div className="editinput">
                          <label htmlFor="password">Password:</label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                          />
                          {user.password.length > 0 &&
                            (user.password.length < 6 ||
                              user.password.length > 16) && (
                              <p className="password-error warning-message">
                                Password must be between 6 and 16 characters
                                long.
                              </p>
                            )}
                        </div>
                        <div className="editinput">
                          <label htmlFor="phone">Phone:</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="editinput">
                          <label htmlFor="address">Address:</label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={user.address}
                            onChange={handleChange}
                          />
                        </div>
                        <div className='editinput'>
                          <label htmlFor="petPicture">Pet Picture:</label>
                          <input type="text" id="petPicture" name="petPicture" value={user.petPicture} onChange={handleChange} />
                        </div>
                        <div className='editinput'>
                          <label htmlFor="petName">Pet Name:</label>
                          <input type="text" id="petName" name="petName" value={user.petName} onChange={handleChange} />
                        </div>
                        <div className='editinput'>
                          <label htmlFor="petType">Pet Type:</label>
                          <select
                            name="petType"
                            id="petType"
                            className="input"
                            value={user.petType}
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
                        <button
                          className="submit-button button"
                          type="submit"
                        >
                          Save Changes
                        </button>
                      </form>
                      {showSuccess && (
                        <div className="success-message">
                          Profile updated successfully!
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className='myOrders'>
                <OrderTransaction/>
              </div>
              <div className="logoutButton">
                <button className="logout-button button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </aside>
          <section className='petcare'>
            <CareTips petType={user?.petType} />
          </section>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
