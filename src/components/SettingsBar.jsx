
import React from 'react';
import useSettingsStore from '../store/settingsStore';

const SettingsBar = () => {
  const {
    increaseTextSize,
    decreaseTextSize,
    toggleHighContrast,
    toggleEasyReading,
    highContrast,
    easyReading,
  } = useSettingsStore();

  return (
    <div className={`p-2 ${highContrast ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}>
      <div className="container mx-auto flex justify-end items-center space-x-4">
        <button onClick={decreaseTextSize} className="px-2 py-1 border rounded">A-</button>
        <button onClick={increaseTextSize} className="px-2 py-1 border rounded">A+</button>
        {/* <div className="flex items-center">
          <input
            type="checkbox"
            id="highContrast"
            className="mr-2"
            checked={highContrast}
            onChange={toggleHighContrast}
          />
          <label htmlFor="highContrast">High Contrast</label>
        </div> */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="easyReading"
            className="mr-2"
            checked={easyReading}
            onChange={toggleEasyReading}
          />
          <label htmlFor="easyReading">Easy Reading</label>
        </div>
      </div>
    </div>
  );
};

export default SettingsBar;
