import React from 'react';
import AddMail from './options/AddMail';

const Options = () => {
  return (
    <div className='bg-black h-20 flex justify-between items-center' >
      <p className='text-white ml-5 text-3xl'>Bulk Actions</p>
      <AddMail />
    </div>
  );
};

export default Options;