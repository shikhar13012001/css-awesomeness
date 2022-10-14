import * as React from 'react';
import Box from '@mui/material/Box'; 
import { Autocomplete, TextField } from '@mui/material';
import { Symbols } from './Options';
export default function BasicSelect({ stockSymbol, setStockSymbol, handleChange }) {
   
  const options = Symbols.map((item) => ({ label: item.Symbol }));
  return (
    <Box sx={{ width: '100%' }}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        value={stockSymbol}
        fullWidth
        renderInput={(params) => <TextField {...params} label="symbol" />}
        onChange={handleChange}
      />
    </Box>
  );
}
