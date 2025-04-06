import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { AccessTime as TimeIcon } from '@mui/icons-material';

function CurrentPrayerCard({ nextPrayer, remainingTime }) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        mb: 4,
        background: `linear-gradient(135deg, primary.main, primary.dark)`,
        color: 'white',
        borderRadius: 3,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dekoratif gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
          opacity: 0.6,
        }}
      />
      
      {/* İçerik */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ mb: 2 }}>
          <TimeIcon sx={{ fontSize: 50, opacity: 0.9 }} />
        </Box>
        <Typography variant="h6" sx={{ opacity: 0.9, mb: 1 }}>
          Sonraki Vakit
        </Typography>
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
          {nextPrayer.name}
        </Typography>
        <Typography variant="h2" sx={{ mb: 3 }}>
          {nextPrayer.time}
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.9 }}>
          {remainingTime} kaldı
        </Typography>
      </Box>
    </Paper>
  );
}

export default CurrentPrayerCard; 