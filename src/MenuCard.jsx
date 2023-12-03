import React from 'react';
import swallo from './assets/swallo.png'



function MenuCard () {
 

  return (
    <div className='flex justify-center items-center shadow-xl max-w-md cur'> 
      <img className='p-5' src={ swallo } alt="swallo-menu" />
      <h3 className='font-spectral font-bold text-4xl'>Swallo Food</h3>
    </div>
  );
};

export default MenuCard;