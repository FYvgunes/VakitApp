import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

function PrayerTimeCard({ name, time, isNext, remainingTime, prayerTimes }) {
  // Şu anki vakti kontrol et
  const isCurrentPrayer = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    // Mevcut vakit başlangıç zamanı
    const [currentHour, currentMinute] = time.split(':').map(Number);
    const currentPrayerTime = currentHour * 60 + currentMinute;

    // Sonraki vakit başlangıç zamanı
    const times = Object.values(prayerTimes);
    const currentIndex = times.findIndex(t => t === time);
    const nextTime = times[(currentIndex + 1) % times.length];
    const [nextHour, nextMinute] = nextTime.split(':').map(Number);
    const nextPrayerTime = nextHour * 60 + nextMinute;

    // Eğer sonraki vakit, şu anki vakitten önce ise (örn: yatsıdan sonra imsak)
    if (nextPrayerTime < currentPrayerTime) {
      return currentTime >= currentPrayerTime || currentTime < nextPrayerTime;
    }

    return currentTime >= currentPrayerTime && currentTime < nextPrayerTime;
  };

  const active = isCurrentPrayer();

  return (
    <Card 
      elevation={active ? 3 : 1}
      sx={{ 
        bgcolor: active ? 'primary.main' : 'background.paper',
        color: active ? 'white' : 'text.primary',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3
        }
      }}
    >
      <CardContent>
        <Typography 
          variant="h6" 
          component="div"
          sx={{ color: active ? 'inherit' : 'text.primary' }}
        >
          {name}
        </Typography>
        <Typography 
          variant="h4" 
          component="div"
          sx={{ 
            my: 1,
            color: active ? 'inherit' : 'text.primary'
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
              bgcolor: active ? 'rgba(255,255,255,0.1)' : 'action.selected',
              color: active ? 'inherit' : 'text.secondary'
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

export default PrayerTimeCard;