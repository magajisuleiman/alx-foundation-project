import React from 'react';
import swallo from './assets/swallo.png';



function MenuCard (props) {
 

  return (
    <div className='flex gap-5'>
      <div className='flex flex-col gap-4 justify-center items-center shadow-2xl max-w-sm hover:cursor-pointer'> 
        <img className='p-5' src={ swallo } alt="swallo-menu" />
        <h3 className='font-spectral font-bold text-4xl p-3'>{props.name}</h3>
      </div>
    </div>
  );
};

export default MenuCard;