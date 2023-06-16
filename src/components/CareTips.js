import React, { useEffect, useState } from 'react';

const CareTipsComponent = () => {
    const [petTips, setPetTips] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
    const fetchPetTips = async () => {
        try {
        const response = await fetch('https://6478b937362560649a2e5ab6.mockapi.io/api/v1/poweebot/2');
        const data = await response.json();
        const allTips = data.data[0] || {};
        const petTypeTips = allTips[user.petType.toLowerCase() + '_tips'] || [];
        setPetTips(petTypeTips);
        } catch (error) {
        console.error('Error fetching pet tips:', error);
        }
    };

    fetchPetTips();
    }, [user.petType]);
 
    const getRandomTip = () => {
    if (petTips && petTips.length > 0) {
        const randomIndex = Math.floor(Math.random() * petTips.length);
        return petTips[randomIndex];
    }
    return '';
    };

    return (
    <div className='tips'>
        <div className="care-tips">
        <h2>Pet Care Tips of the Day</h2>
        <div className="blog-post">
            <img className="blog-image" src={`https://loremflickr.com/640/480/${user.petType}`} alt={user.petName} />
            <div className="blog-content">
            <p>{getRandomTip()}</p>
            </div>
        </div>
        </div>
        <div className="care-tips">
        <h2>Pet Care Tips of the Day</h2>
        <div className="blog-post">
            <img className="blog-image" src={`https://loremflickr.com/600/400/${user.petType}`} alt={user.petName} />
            <div className="blog-content">
            <p>{getRandomTip()}</p>
            </div>
        </div>
        </div>
        <div className="care-tips">
        <h2>Pet Care Tips of the Day</h2>
        <div className="blog-post">
            <img className="blog-image" src={`https://loremflickr.com/550/450/${user.petType}`} alt={user.petName} />
            <div className="blog-content">
            <p>{getRandomTip()}</p>
            </div>
        </div>
        </div>
        <div className="care-tips">
        <h2>Pet Care Tips of the Day</h2>
        <div className="blog-post">
            <img className="blog-image" src={`https://loremflickr.com/500/400/${user.petType}`} alt={user.petName} />
            <div className="blog-content">
            <p>{getRandomTip()}</p>
            </div>
        </div>
        </div>
        <div className="care-tips">
        <h2>Pet Care Tips of the Day</h2>
        <div className="blog-post">
            <img className="blog-image" src={`https://loremflickr.com/620/460/${user.petType}`} alt={user.petName} />
            <div className="blog-content">
            <p>{getRandomTip()}</p>
            </div>
        </div>
        </div>
    </div>
    );
};
    
  
  

export default CareTipsComponent;
