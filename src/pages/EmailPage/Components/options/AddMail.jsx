import React from 'react';
import { Button, Box } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import SortIcon from '@mui/icons-material/Sort';
import { parseFileContent } from './FileHandler';

const AddMail = () => {
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const text = await file.text();
    const subscribers = parseFileContent(text);

    if (!subscribers.length) {
      alert('No valid emails found');
      return;
    }

    try {
      const response = await fetch('http://80.97.124.100:3000/api/targets/add-bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscribers })
      });
      
      if (response.ok) {
        alert(`Added ${subscribers.length} emails`);
      }
    } catch (error) {
      alert('Error adding emails');
    }
  };

  const handleRemoveLeads = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/targets/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
      const data = await response.json();
      alert(`Removed ${data.deletedCount || 'all'} emails`);
    }
  } catch (error) {
    alert('Error removing emails');
  }
};
  const handleSortLeads = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/targets/sort', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        alert('Leads sorted successfully');
      } else {
        alert('Error sorting leads');
      }
    } catch (error) {
      alert('Error sorting leads');
    }
  };

  return (
    <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
      <input
        accept=".txt"
        style={{ display: 'none' }}
        id="upload-file"
        type="file"
        onChange={handleFileUpload}
      />
      <label htmlFor="upload-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Import Leads
        </Button>
      </label>

     
 
        <Button
         onClick={handleRemoveLeads}
          variant="contained"
          color="error"
          component="span"
          startIcon={<DeleteIcon />}
        >
          Remove Leads
        </Button>
      

      <Button
        variant="contained"
        color="secondary"
        onClick={handleSortLeads}
        startIcon={<SortIcon />}
      >
        Sort Leads
      </Button>
    </Box>
  );
};

export default AddMail;