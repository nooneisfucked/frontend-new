// pages/SmtpPage/SMTPSettings.jsx
import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';

const SMTPSettings = () => {
  const { data: smtps, loading, refetch } = useFetch('http://localhost:3000/api/smtp');
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [message, setMessage] = useState('');

  const handleRemove = async (id) => {
    if (!window.confirm('Remove this SMTP?')) return;
    
    try {
      const response = await fetch(`http://localhost:3000/api/smtp/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        alert('SMTP removed');
        refetch();
      } else {
        alert('Error removing SMTP');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://80.97.124.100:3000/api/smtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ host, port: parseInt(port), user, pass, isActive: true })
      });

      if (response.ok) {
        setMessage('SMTP added successfully');
        setHost('');
        setPort('');
        setUser('');
        setPass('');
        refetch();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error adding SMTP');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">SMTP Settings</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Add SMTP</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Host</label>
            <input
              type="text"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Port</label>
            <input
              type="number"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add SMTP
        </button>
        
        {message && (
          <div className={`mt-4 p-2 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
      </form>

      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Existing SMTPs</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-2">
            {smtps?.map((smtp) => (
              <div key={smtp._id} className="border p-3 rounded flex justify-between items-center">
                <div>
                  <p className="font-semibold">{smtp.host}:{smtp.port}</p>
                  <p className="text-sm text-gray-600">User: {smtp.user}</p>
                  <p className="text-xs text-gray-500">Active: {smtp.isActive ? 'Yes' : 'No'} | Daily Limit: {smtp.dailyLimit || 100}</p>
                </div>
                <button
                  onClick={() => handleRemove(smtp._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SMTPSettings;