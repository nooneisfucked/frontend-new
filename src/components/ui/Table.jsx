import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import LoadingSpinner from './LoadingSpinner';

function DataTable({ columns = [], data = [], loading, actions }) {
  if (loading) return <LoadingSpinner />;
  if (!columns.length) return null;

  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto',   }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col}>{col}</TableCell>
            ))}
            {actions && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow key={idx}>
              {columns.map((col) => (
                <TableCell key={col}>{row[col]}</TableCell>
              ))}
              {actions && (
                <TableCell>{actions(row)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;

