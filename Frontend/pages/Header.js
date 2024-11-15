import React from 'react';
import { Typography } from '@mui/material';

const TitleComponent = ({ title }) => {
  return (
    <div className="title">
      <Typography variant="h2" component="h2" gutterBottom sx={{ fontWeight: 600, textAlign: "center", fontSize: '35px' }}>
        {title}
      </Typography>
    </div>
  );
};

export default TitleComponent;
