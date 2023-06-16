import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CareTips from '../components/CareTips';
import './ProfilePage.css';


const ProfilePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage and redirect to the login page
    localStorage.removeItem('user');
    navigate('/login');
  };
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/users/' + user.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(user));
        alert('Profile updated successfully!');
        toggleForm(); // Toggle the showForm state to false
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className='profilePage'>
      <aside>
        <div className="profile-container">
          <div className="profile-picture">
            <img src={user.profilePicture} alt="Profile" />
          </div>
          <div className="profile-details">
            <h2>{user.firstName} {user.lastName}</h2>
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
        <div className='profileButtons'>
          <div className="editButton">
            <button className="edit-button button" onClick={toggleForm}>
              Edit Profile
            </button>
            <div className='editProfile-container'>
              {showForm && (
                <div className="editProfileform-container">
                  <button className="cancel-button" onClick={toggleForm}>&times;</button>
                  <form className="editForm" onSubmit={handleSubmit}>
                    <div className='editinput'>
                      <label htmlFor="profilePicture">Profile Picture:</label>
                      <input type="text" id="profilePicture" name="profilePicture" value={user.profilePicture} onChange={handleChange} />
                    </div>
                    <div className='editinput'>
                      <label htmlFor="firstName">First Name:</label>
                      <input type="text" id="firstName" name="firstName" value={user.firstName} onChange={handleChange} />
                    </div>
                    <div className='editinput'>
                      <label htmlFor="lastName">Last Name:</label>
                      <input type="text" id="lastName" name="lastName" value={user.lastName} onChange={handleChange} />
                    </div>
                    <div className='editinput'>
                      <label htmlFor="email">Email:</label>
                      <input type="email" id="email" name="email" value={user.email} onChange={handleChange} />
                    </div>
                    <div className='editinput'>
                      <label htmlFor="password">Password:</label>
                      <input type="password" id="password" name="password" value={user.password} onChange={handleChange} />
                    </div>
                    <div className='editinput'>
                      <label htmlFor="phone">Phone:</label>
                      <input type="tel" id="phone" name="phone" value={user.phone} onChange={handleChange} />
                    </div>
                    <div className='editinput'>
                      <label htmlFor="address">Address:</label>
                      <input type="text" id="address" name="address" value={user.address} onChange={handleChange} />
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
                    <button type="submit" className="update-button button">Update Profile</button>
                  </form>
                </div>
              )}
            </div>
          </div>
          <div className='myOrders'>
            <button className='logout-button button'>My Orders</button>
          </div>
          <button className='logout-button button' onClick={handleLogout}>Logout</button>
        </div>     
      </aside>
      <section className='petcare'>
        <CareTips/>
      </section>
    </div>
    
    
  );
};

export default ProfilePage;
