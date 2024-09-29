import React from 'react';

const Switcher12 = ({ onToggle, isChecked }) => {
  return (
    <label className='themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center'>
      <input
        type='checkbox'
        checked={isChecked} // Use prop instead of internal state
        onChange={(e) => onToggle(e.target.checked)} // Notify parent when toggled
        className='sr-only'
      />
      <span className='label flex items-center text-sm font-medium text-black'>
        One-Shot
      </span>
      <span
        className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
          isChecked ? 'bg-[#212b36]' : 'bg-[#CCCCCE]'
        }`}
      >
        <span
          className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
            isChecked ? 'translate-x-[28px]' : ''
          }`}
        ></span>
      </span>
      <span className='label flex items-center text-sm font-medium text-black'>
        Layers
      </span>
    </label>
  );
};

export default Switcher12;
