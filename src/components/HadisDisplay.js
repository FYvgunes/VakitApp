import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, Fade, IconButton } from '@mui/material';
import { 
  FormatQuote as QuoteIcon,
  NavigateNext as NextIcon,
  NavigateBefore as PrevIcon 
} from '@mui/icons-material';
import { hadisler } from '../data/hadisler';

function HadisDisplay() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleNext = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % hadisler.length);
      setIsVisible(true);
    }, 300);
  };

  const handlePrev = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + hadisler.length) % hadisler.length);
      setIsVisible(true);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 15000); // Her 15 saniyede bir değiş
    return () => clearInterval(interval);
  }, []);

  return (
    <Paper 
      elevation={2}
      sx={{
        p: 4,
        my: 6,
        backgroundColor: 'primary.main',
        borderRadius: 3,
        position: 'relative',
        maxWidth: '800px',
        mx: 'auto',
        color: 'white',
        backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      }}
    >
      <QuoteIcon 
        sx={{ 
          fontSize: 60,
          position: 'absolute',
          top: -20,
          left: -10,
          opacity: 0.2,
          transform: 'rotate(180deg)'
        }}
      />

      <Fade in={isVisible} timeout={500}>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h6"
            sx={{ 
              mb: 3,
              textAlign: 'center',
              fontWeight: 500,
              letterSpacing: 1,
              color: 'rgba(255,255,255,0.9)'
            }}
          >
            Hadis-i Şerif
          </Typography>

          <Typography 
            variant="h5"
            sx={{ 
              textAlign: 'center',
              fontStyle: 'italic',
              mb: 3,
              lineHeight: 1.6,
              px: { xs: 2, md: 6 },
              fontWeight: 400
            }}
          >
            "{hadisler[currentIndex].hadis}"
          </Typography>

          <Typography 
            variant="subtitle1"
            sx={{ 
              textAlign: 'center',
              opacity: 0.8,
              fontWeight: 500
            }}
          >
            {hadisler[currentIndex].kaynak}
          </Typography>
        </Box>
      </Fade>

      <Box 
        sx={{ 
          position: 'absolute',
          bottom: -20,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1
        }}
      >
        <IconButton 
          onClick={handlePrev}
          sx={{ 
            bgcolor: 'background.paper',
            '&:hover': { bgcolor: 'background.paper', opacity: 0.9 },
            boxShadow: 1
          }}
        >
          <PrevIcon />
        </IconButton>
        <IconButton 
          onClick={handleNext}
          sx={{ 
            bgcolor: 'background.paper',
            '&:hover': { bgcolor: 'background.paper', opacity: 0.9 },
            boxShadow: 1
          }}
        >
          <NextIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default HadisDisplay; 