import { Box, CircularProgress } from '@mui/material';

function LoadingSpinner() {
  return (
    <Box display="flex" justifyContent="center" p={3}>
      <CircularProgress />
    </Box>
  );
}

export default LoadingSpinner;