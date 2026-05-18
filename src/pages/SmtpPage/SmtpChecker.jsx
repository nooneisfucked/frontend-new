// components/smtp/SmtpChecker.jsx
import { useState } from 'react';
import Button from '../ui/Button';
import { TextField, Paper, Typography, Alert, Box } from '@mui/material';

function SmtpChecker() {
  const [smtp, setSmtp] = useState({ host: '', port: 587, user: '', pass: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://80.97.124.100:3000/api/smtp/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(smtp)
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ valid: false, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>Check SMTP</Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField label="Host" size="small" value={smtp.host} onChange={e => setSmtp({...smtp, host: e.target.value})} />
        <TextField label="Port" size="small" type="number" value={smtp.port} onChange={e => setSmtp({...smtp, port: e.target.value})} />
        <TextField label="Username" size="small" value={smtp.user} onChange={e => setSmtp({...smtp, user: e.target.value})} />
        <TextField label="Password" size="small" type="password" value={smtp.pass} onChange={e => setSmtp({...smtp, pass: e.target.value})} />
        <Button onClick={handleCheck} disabled={loading}>{loading ? 'Checking...' : 'Check'}</Button>
      </Box>
      {result && (
        <Alert severity={result.valid ? 'success' : 'error'} sx={{ mt: 2 }}>
          {result.message}
        </Alert>
      )}
    </Paper>
  );
}

export default SmtpChecker;