import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function PrayerCard({ name, time, isNext, remainingTime }) {
  const theme = useTheme();

  // Şu anki vakti kontrol et
  const isCurrentPrayer = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const [prayerHour, prayerMinute] = time.split(':').map(Number);

    // Bir sonraki vakit saatini al
    const nextPrayerTime = getNextPrayerTime(name, time);
    const [nextHour, nextMinute] = nextPrayerTime.split(':').map(Number);

    // Şu anki zaman, bu vakit ile bir sonraki vakit arasında mı kontrol et
    const currentTimeInMinutes = currentHour * 60 + currentMinute;
    const prayerTimeInMinutes = prayerHour * 60 + prayerMinute;
    const nextPrayerTimeInMinutes = nextHour * 60 + nextMinute;

    if (nextPrayerTimeInMinutes < prayerTimeInMinutes) {
      // Gece yarısını geçen vakitler için (örn: Yatsı)
      return currentTimeInMinutes >= prayerTimeInMinutes || 
             currentTimeInMinutes < nextPrayerTimeInMinutes;
    }

    return currentTimeInMinutes >= prayerTimeInMinutes && 
           currentTimeInMinutes < nextPrayerTimeInMinutes;
  };

  // Bir sonraki vakit saatini al
  const getNextPrayerTime = (currentName, currentTime) => {
    const prayerTimes = {
      'İmsak': '05:30',
      'Güneş': '07:00',
      'Öğle': '12:30',
      'İkindi': '15:30',
      'Akşam': '18:00',
      'Yatsı': '19:30'
    };

    const prayers = Object.keys(prayerTimes);
    const currentIndex = prayers.indexOf(currentName);
    const nextIndex = (currentIndex + 1) % prayers.length;
    
    return prayerTimes[prayers[nextIndex]];
  };

  const isActive = isCurrentPrayer();

  return (
    <Card 
      sx={{ 
        bgcolor: isActive ? 'primary.main' : 'background.paper',
        color: isActive ? 'primary.contrastText' : 'text.primary',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
          bgcolor: isActive ? 'primary.dark' : 'background.paper',
        }
      }}
    >
      <CardContent>
        <Typography 
          variant="h6" 
          component="div"
          sx={{ 
            color: isActive ? 'inherit' : 'text.primary'
          }}
        >
          {name}
        </Typography>
        <Typography 
          variant="h4" 
          component="div"
          sx={{ 
            my: 1,
            color: isActive ? 'inherit' : 'text.primary'
          }}
        >
          {time}
        </Typography>
        {isNext && (
          <Box 
            sx={{ 
              mt: 1,
              p: 1, 
              borderRadius: 1,
              bgcolor: isActive 
                ? 'rgba(255,255,255,0.1)' 
                : 'action.selected',
              color: isActive ? 'inherit' : 'text.secondary'
            }}
          >
            <Typography variant="body2">
              {remainingTime}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default PrayerCard; 