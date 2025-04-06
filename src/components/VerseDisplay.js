import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, Fade } from '@mui/material';
import { FormatQuote as QuoteIcon } from '@mui/icons-material';
import { prayerVerses } from '../data/prayerVerses';

function VerseDisplay() {
  const [currentVerse, setCurrentVerse] = useState(prayerVerses[0]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * prayerVerses.length);
        setCurrentVerse(prayerVerses[randomIndex]);
        setIsVisible(true);
      }, 500);
    }, 20000); // Her 20 saniyede bir değiş

    return () => clearInterval(interval);
  }, []);

  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        my: 3,
        backgroundColor: 'primary.main',
        color: 'white',
        borderRadius: 2,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
          opacity: 0.2
        }
      }}
    >
      <Fade in={isVisible} timeout={500}>
        <Box sx={{ position: 'relative' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <QuoteIcon 
              sx={{ 
                fontSize: 30,
                opacity: 0.7,
                mr: 1
              }}
            />
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Ayet-i Kerime
            </Typography>
          </Box>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2,
              lineHeight: 1.6,
              fontStyle: 'italic'
            }}
          >
            {currentVerse.verse}
          </Typography>
          <Typography 
            variant="subtitle2"
            sx={{ 
              textAlign: 'right',
              opacity: 0.8
            }}
          >
            {currentVerse.source}
          </Typography>
        </Box>
      </Fade>
    </Paper>
  );
}

export default VerseDisplay; 