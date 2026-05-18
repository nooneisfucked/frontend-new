import React from 'react';

const RemoveEmail = ({ id, onRemove }) => {
  const handleRemove = async () => {
    if (!window.confirm('Remove this email?')) return;
    
    await fetch('http://80.97.124.100:3000/api/targets', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    
    onRemove(); // Refresh table
  };

  return (
    <button 
      onClick={handleRemove}
      className="bg-red-500 text-white px-3 py-1 rounded text-sm"
    >
      Remove
    </button>
  );
};

export default RemoveEmail;