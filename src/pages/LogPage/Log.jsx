// pages/Logs/Logs.jsx
import React, { useEffect, useState } from 'react';

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await fetch('http://80.97.124.100:3000/api/logs');
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Email Logs</h1>
      
      <div className="bg-white rounded shadow-md overflow-hidden">
        {loading ? (
          <p className="p-4 text-center">Loading...</p>
        ) : logs.length === 0 ? (
          <p className="p-4 text-center text-gray-500">No logs yet</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">To</th>
                <th className="p-3 text-left">Subject</th>
                <th className="p-3 text-left">SMTP Used</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log._id} className="border-t">
                  <td className="p-3 text-sm">{new Date(log.sentAt).toLocaleTimeString()}</td>
                  <td className="p-3">{log.to}</td>
                  <td className="p-3 text-sm">{log.subject}</td>
                  <td className="p-3 text-sm">{log.smtpUsed}</td>
                  <td className="p-3">
                    {log.success ? (
                      <span className="text-green-600">✓ Sent</span>
                    ) : (
                      <span className="text-red-600" title={log.error}>
                        ✗ Failed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Logs;