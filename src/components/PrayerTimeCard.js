import React from 'react';
import { Paper, Typography, Box, Divider } from '@mui/material';
import { AccessTime as TimeIcon } from '@mui/icons-material';
import { calculateRemainingTime } from '../utils/timeUtils';

function PrayerTimeCard({ title, time, isNext }) {
  const remainingTime = calculateRemainingTime(time);

  return (
    <Paper 
      elevation={isNext ? 3 : 1}
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'all 0.3s ease',
        backgroundColor: isNext ? 'custom.nextPrayer.background' : 'background.paper',
        borderRadius: 2,
        '&:hover': {
          transform: 'translateY(-5px)',
          backgroundColor: isNext ? 'custom.nextPrayer.background' : 'custom.card.hover',
          boxShadow: 3,
        }
      }}
    >
      <TimeIcon 
        sx={{ 
          fontSize: 40, 
          color: isNext ? 'custom.nextPrayer.text' : 'primary.main',
          mb: 1,
          opacity: isNext ? 1 : 0.9
        }} 
      />
      <Typography 
        variant="h6" 
        component="h3" 
        gutterBottom
        color={isNext ? 'custom.nextPrayer.text' : 'text.primary'}
        sx={{ fontWeight: isNext ? 600 : 500 }}
      >
        {title}
      </Typography>
      <Typography 
        variant="h5" 
        color={isNext ? 'custom.nextPrayer.text' : 'primary.main'}
        gutterBottom
        sx={{ fontWeight: isNext ? 600 : 500 }}
      >
        {time}
      </Typography>
      <Box sx={{ mt: 1 }}>
        <Typography 
          variant="body2" 
          color={isNext ? 'custom.nextPrayer.text' : 'text.secondary'}
          sx={{
            opacity: isNext ? 1 : 0.8,
            fontWeight: isNext ? 500 : 400
          }}
        >
          {isNext ? `Kalan Süre: ${remainingTime}` : ''}
        </Typography>
      </Box>

      <Divider sx={{ 
        width: '80%', 
        my: 2,
        opacity: isNext ? 0.2 : 0.1,
        backgroundColor: isNext ? 'white' : 'primary.main'
      }} />
    </Paper>
  );
}

export default PrayerTimeCard;