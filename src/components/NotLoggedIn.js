import React , { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import './PopUpbox.css';


const NotLogged = () => {
    const [show, setShow] = useState(true);
    const navigate = useNavigate();

    const goBack = () => {
        setShow(!show);
        navigate(-1);
    };

    const toggleOff = () => {
        setShow(!show);
        navigate('/login');
    }



    return (
        <div>
            {(show ?
                <div className='popUpAlert'>
                    <div className='popUp-container'>
                        <p>Meow! Please login to your account to continue accessing this page.</p>
                        <img src='https://media.tenor.com/hXa7oZpXsvsAAAAC/cute-confused.gif'/>
                        <div className='buttons'>
                            <button className='button' onClick={toggleOff}>Login</button>
                            {/* <button className='button' onClick={toggleOff}>Continue as Guest</button> */}
                            <button className='button' onClick={goBack}>Go Back</button>
                        </div>
                    </div>
                </div>
            :'')}
        </div>
    );
}

export default NotLogged;