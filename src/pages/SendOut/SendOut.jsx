import React, { useState, useEffect } from 'react';

const SendOut = () => {
  const [isSending, setIsSending] = useState(false);
  const [letterId, setLetterId] = useState('');

  // Check status when page loads
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch('http://80.97.124.100:3000/api/smtp/send/status');
        const data = await response.json();
        setIsSending(data.isSending);
      } catch (error) {
        console.error('Error checking status:', error);
      }
    };
    
    checkStatus();
    // Poll every 2 seconds
    const interval = setInterval(checkStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = async () => {
    if (!letterId && !isSending) {
      alert('Please enter a Letter ID');
      return;
    }

    const newState = !isSending;
    
    try {
      const endpoint = newState ? 'http://80.97.124.100:3000/api/smtp/send/start' : 'http://80.97.124.100:3000/api/smtp/send/stop';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ letterId })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setIsSending(newState);
      } else {
        alert(data.error || 'Failed to toggle sending');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Email Campaign</h1>
        <p className="text-gray-500 text-lg">
          {isSending ? 'Campaign is actively sending' : 'Campaign is paused'}
        </p>
      </div>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter Letter ID"
          value={letterId}
          onChange={(e) => setLetterId(e.target.value)}
          className="p-2 border rounded w-80 text-center"
          disabled={isSending}
        />
      </div>
      
      <button
        onClick={handleToggle}
        className={`w-64 h-64 rounded-full text-white text-4xl font-bold transition-all duration-300 shadow-xl transform hover:scale-105 ${
          isSending 
            ? 'bg-green-500 hover:bg-green-600' 
            : 'bg-red-500 hover:bg-red-600'
        }`}
      >
        {isSending ? 'ON' : 'OFF'}
      </button>
    </div>
  );
};

export default SendOut;