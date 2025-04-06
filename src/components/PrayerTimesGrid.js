import React, { useEffect, useState } from 'react';
import { Grid, Box, Paper, Typography } from '@mui/material';
import { 
  WbTwilight as FajrIcon,
  WbSunny as SunriseIcon,
  LightMode as NoonIcon,
  WbSunnyTwoTone as AsrIcon,
  Brightness3 as MaghribIcon,
  NightsStay as IshaIcon
} from '@mui/icons-material';
import { getNextPrayer, calculateRemainingTime, getCurrentPrayer } from '../utils/timeUtils';
import { getCurrentDate } from '../utils/dateUtils';
import VerseDisplay from './VerseDisplay';
import Features from './Features';

function PrayerTimesGrid({ prayerTimes, cityName }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [remainingTime, setRemainingTime] = useState('');
  const [nextPrayer, setNextPrayer] = useState({ name: '', time: '' });
  const [currentPrayer, setCurrentPrayer] = useState({ name: '', time: '' });
  const [currentDate, setCurrentDate] = useState(getCurrentDate());

  useEffect(() => {
    if (!prayerTimes) return;

    const updateTimes = () => {
      const next = getNextPrayer(prayerTimes);
      const current = getCurrentPrayer(prayerTimes);
      setNextPrayer(next);
      setCurrentPrayer(current);
      setRemainingTime(calculateRemainingTime(next.time));
      setCurrentTime(new Date());
      setCurrentDate(getCurrentDate());
    };

    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, [prayerTimes]);

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        p: 2,
        bgcolor: 'background.default',
        overflowX: 'hidden',
      }}
    >
      <Box 
        sx={{ 
          maxWidth: 1200, 
          mx: 'auto',
          pb: 4,
        }}
      >
        {/* Şehir Seçimi */}
        <Paper 
          elevation={0}
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 2,
            p: 2,
            borderRadius: 2,
            background: (theme) => theme.palette.custom.gradients.primary,
            color: 'white'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FajrIcon sx={{ fontSize: 20 }} />
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              {cityName}
            </Typography>
          </Box>
          <Typography sx={{ opacity: 0.8 }}>
            {new Date().toLocaleDateString('tr-TR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Typography>
        </Paper>

        {/* Kalan Süre */}
        <Paper 
          sx={{ 
            mb: 2, 
            p: 3, 
            textAlign: 'center',
            borderRadius: 2,
            background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
            color: 'white',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}
        >
          <Typography variant="h6" gutterBottom>
            {nextPrayer.name} Vaktine Kalan Süre
          </Typography>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            {remainingTime}
          </Typography>
        </Paper>

        {/* Tarih Bilgisi */}
        <Paper 
          sx={{ 
            mb: 3, 
            p: 2, 
            textAlign: 'center',
            borderRadius: 2,
            background: (theme) => theme.palette.background.paper,
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Typography variant="h6" color="primary" gutterBottom>
            {currentDate.gregorian}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {currentDate.hijri}
          </Typography>
        </Paper>

        {/* Namaz Vakitleri Grid */}
        <Grid container spacing={2}>
          {Object.entries(prayerTimes).map(([key, time]) => {
            const isCurrentPrayer = currentPrayer?.name === key;
            const isNextPrayer = nextPrayer?.name === key;
            
            return (
              <Grid item xs={4} key={key}>
                <Paper 
                  sx={{ 
                    p: 2, 
                    textAlign: 'center',
                    borderRadius: 2,
                    bgcolor: isCurrentPrayer 
                      ? 'success.main'
                      : isNextPrayer 
                        ? 'primary.main'
                        : 'background.paper',
                    color: (isCurrentPrayer || isNextPrayer) 
                      ? 'white' 
                      : 'text.primary',
                    transition: 'all 0.3s ease',
                    boxShadow: isCurrentPrayer || isNextPrayer 
                      ? '0 4px 20px rgba(0,0,0,0.2)' 
                      : '0 2px 10px rgba(0,0,0,0.1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 6px 25px rgba(0,0,0,0.15)',
                    }
                  }}
                >
                  {/* Vakit İkonu */}
                  <Box 
                    sx={{ 
                      mb: 1,
                      color: isCurrentPrayer || isNextPrayer 
                        ? 'white' 
                        : 'primary.main'
                    }}
                  >
                    {getVakitIcon(key)}
                  </Box>
                  
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontWeight: isCurrentPrayer ? 'bold' : 'medium',
                      color: 'inherit',
                      mb: 0.5
                    }}
                  >
                    {key}
                  </Typography>
                  <Typography 
                    variant="h5"
                    sx={{ 
                      fontWeight: 'bold',
                      color: 'inherit',
                      letterSpacing: 1
                    }}
                  >
                    {time}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        {/* Özellikler Başlığı */}
        <Box 
          sx={{ 
            mt: 6, 
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 'bold',
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: 40,
                height: 3,
                bgcolor: 'primary.main',
                borderRadius: 1
              }
            }}
          >
            Özellikler
          </Typography>
        </Box>
        <Features />

        {/* Ayet Gösterimi */}
        <Box sx={{ mt: 6 }}>
          <VerseDisplay />
        </Box>
      </Box>
    </Box>
  );
}

// Vakit ikonlarını getiren yardımcı fonksiyon
const getVakitIcon = (vakit) => {
  const iconProps = { sx: { fontSize: 32 } };
  switch(vakit) {
    case 'İmsak':
      return <FajrIcon {...iconProps} />;
    case 'Güneş':
      return <SunriseIcon {...iconProps} />;
    case 'Öğle':
      return <NoonIcon {...iconProps} />;
    case 'İkindi':
      return <AsrIcon {...iconProps} />;
    case 'Akşam':
      return <MaghribIcon {...iconProps} />;
    case 'Yatsı':
      return <IshaIcon {...iconProps} />;
    default:
      return null;
  }
};

export default PrayerTimesGrid; 