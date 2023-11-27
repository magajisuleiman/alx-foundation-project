import React from 'react';
import swallo from './assets/swallo.png'



function MenuCard () {
 

  return (
    <div className='flex'> 
      <img src={ swallo } alt="swallo-menu" />
      <h3 className='font-mono'>Swallo Food</h3>
    </div>
  );
};

export default MenuCard;