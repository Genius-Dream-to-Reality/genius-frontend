import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SelectEventType = () => {
  const [selectedEventType, setSelectedEventType] = useState('');
  const navigate = useNavigate();

  const handleEventTypeSelection = (eventType) => {
    setSelectedEventType(eventType);
  };

  const handleNextStep = () => {
    navigate('/select-date');
  };

  return (
    <div className="bg-purple text-white min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8">Select Event Type:</h1>
      <div className="grid grid-cols-3 gap-4">
        <div
          className={`bg-gray-700 p-4 rounded cursor-pointer ${
            selectedEventType === 'wedding' ? 'border-4 border-yellow-500' : ''
          }`}
          onClick={() => handleEventTypeSelection('wedding')}
        >
          <h2 className="text-2xl font-bold">Wedding</h2>
        </div>
        <div
          className={`bg-gray-700 p-4 rounded cursor-pointer ${
            selectedEventType === 'wedding' ? 'border-4 border-yellow-500' : ''
          }`}
          onClick={() => handleEventTypeSelection('wedding')}
        >
          <h2 className="text-2xl font-bold">Wedding</h2>
        </div>
        <div
          className={`bg-gray-700 p-4 rounded cursor-pointer ${
            selectedEventType === 'wedding' ? 'border-4 border-yellow-500' : ''
          }`}
          onClick={() => handleEventTypeSelection('wedding')}
        >
          <h2 className="text-2xl font-bold">Birthday</h2>
        </div>
        <div
          className={`bg-gray-700 p-4 rounded cursor-pointer ${
            selectedEventType === 'wedding' ? 'border-4 border-yellow-500' : ''
          }`}
          onClick={() => handleEventTypeSelection('wedding')}
        >
          <h2 className="text-2xl font-bold">Wedding</h2>
        </div>
        <div
          className={`bg-gray-700 p-4 rounded cursor-pointer ${
            selectedEventType === 'wedding' ? 'border-4 border-yellow-500' : ''
          }`}
          onClick={() => handleEventTypeSelection('wedding')}
        >
          <h2 className="text-2xl font-bold">Wedding</h2>
        </div>
        <div
          className={`bg-gray-700 p-4 rounded cursor-pointer ${
            selectedEventType === 'wedding' ? 'border-4 border-yellow-500' : ''
          }`}
          onClick={() => handleEventTypeSelection('wedding')}
        >
          <h2 className="text-2xl font-bold">Wedding</h2>
        </div>
      </div>
      <button
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mt-8"
        onClick={handleNextStep}
      >
        Next
      </button>
    </div>
  );
};

export default SelectEventType;