// pages/Letters/Letters.jsx
import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';

const Letters = () => {
const { data: letters, loading, refetch } = useFetch('http://80.97.124.100:3000/api/letters');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [htmlFile, setHtmlFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!htmlFile) {
      setMessage('Please select an HTML file');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('subject', subject);
    formData.append('htmlFile', htmlFile);

    try {
      const response = await fetch('http://80.97.124.100:3000/api/letters', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setMessage('Letter added successfully');
        setName('');
        setSubject('');
        setHtmlFile(null);
        refetch();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error adding letter');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Letters</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Letter</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">HTML File</label>
          <input
            type="file"
            accept=".html"
            onChange={(e) => setHtmlFile(e.target.files[0])}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Letter
        </button>
        
        {message && (
          <div className={`mt-4 p-2 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
      </form>

      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Existing Letters</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-2">
            {letters?.map((letter) => (
              <div key={letter._id} className="border p-3 rounded">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-semibold">{letter.name}</p>
                    <p className="text-sm text-gray-600">{letter.subject}</p>
                    <p className="text-xs text-gray-400 mt-1">ID: {letter._id}</p>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(letter._id);
                      alert('Letter ID copied!');
                    }}
                    className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                  >
                    Copy ID
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Letters;