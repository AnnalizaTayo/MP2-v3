// NotFound.js

import React from 'react';
import NotData from '../imgs/404.png';

const NotFound = () => {
  return (
    <div className='NotFound'>
      <img src={NotData} alt="Hooman, I can't find what you're looking for." />
    </div>
  );
};

export default NotFound;
