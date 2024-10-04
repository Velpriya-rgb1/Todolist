import React from 'react';
import box from "../image/box.png"
import { Box } from '@mui/material';

const Illustration = () => {
  return (
    <Box 
      component="img" 
      src={box}  
      alt="no tasks illustration" 
      sx={{ width: 200, marginBottom: 2 }}
    />
  );
};

export default Illustration;
