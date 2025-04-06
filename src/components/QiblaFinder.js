import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Paper, CircularProgress, Button } from '@mui/material';
import { Explore as CompassIcon, MyLocation as LocationIcon } from '@mui/icons-material';

function QiblaFinder() {
  const [qiblaDirection, setQiblaDirection] = useState(null);
  const [currentDirection, setCurrentDirection] = useState(0);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [isWatching, setIsWatching] = useState(false);

  // Kabe'nin koordinatları
  const KAABA_LAT = 21.422487;
  const KAABA_LNG = 39.826206;

  const calculateQibla = useCallback((userLat, userLng) => {
    const φ1 = userLat * Math.PI / 180;
    const φ2 = KAABA_LAT * Math.PI / 180;
    const Δλ = (KAABA_LNG - userLng) * Math.PI / 180;

    const y = Math.sin(Δλ);
    const x = Math.cos(φ1) * Math.tan(φ2) - Math.sin(φ1) * Math.cos(Δλ);
    let qibla = Math.atan2(y, x);

    qibla = qibla * 180 / Math.PI;
    qibla = (qibla + 360) % 360;

    return qibla;
  }, []);

  const handleOrientation = useCallback((event) => {
    let direction;
    if (event.webkitCompassHeading) {
      direction = event.webkitCompassHeading;
    } else {
      direction = 360 - event.alpha;
    }
    setCurrentDirection(direction);
  }, []);

  const startWatching = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Tarayıcınız konum özelliğini desteklemiyor.');
      return null;
    }

    setIsWatching(true);
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        const qibla = calculateQibla(
          position.coords.latitude,
          position.coords.longitude
        );
        setQiblaDirection(qibla);
        setError(null);
      },
      (err) => {
        setError('Konum alınamadı. Lütfen konum izni verin.');
        setIsWatching(false);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
      }
    );

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientationabsolute', handleOrientation);
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
          .then(response => {
            if (response === 'granted') {
              window.addEventListener('deviceorientationabsolute', handleOrientation);
            } else {
              setError('Pusula izni reddedildi.');
            }
          })
          .catch(console.error);
      }
    } else {
      setError('Cihazınız pusula özelliğini desteklemiyor.');
    }

    return () => {
      navigator.geolocation.clearWatch(watchId);
      window.removeEventListener('deviceorientationabsolute', handleOrientation);
      setIsWatching(false);
    };
  }, [calculateQibla, handleOrientation]);

  useEffect(() => {
    const cleanup = startWatching();
    return () => cleanup && cleanup();
  }, [startWatching]);

  const actualQiblaDirection = (qiblaDirection - currentDirection + 360) % 360;

  return (
    <Paper sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Kıble Pusulası
      </Typography>

      {error ? (
        <>
          <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
          <Button
            variant="contained"
            startIcon={<LocationIcon />}
            onClick={startWatching}
          >
            Tekrar Dene
          </Button>
        </>
      ) : qiblaDirection === null ? (
        <CircularProgress />
      ) : (
        <Box sx={{ position: 'relative', width: 250, height: 250, margin: 'auto' }}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100%',
              height: '100%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              border: '2px solid',
              borderColor: 'primary.main',
            }}
          />
          <CompassIcon
            sx={{
              fontSize: 200,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${currentDirection}deg)`,
              transition: 'transform 0.3s ease',
              color: 'primary.main'
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 4,
              height: '45%',
              background: 'red',
              transformOrigin: 'bottom',
              transform: `translate(-50%, -100%) rotate(${actualQiblaDirection}deg)`,
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-6px',
                width: '16px',
                height: '16px',
                background: 'red',
                transform: 'rotate(45deg)'
              }
            }}
          />
          <Typography variant="body2" sx={{ mt: 3 }}>
            Kıble Yönü: {Math.round(actualQiblaDirection)}°
          </Typography>
          {location && (
            <Typography variant="caption" display="block">
              Konum: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
            </Typography>
          )}
        </Box>
      )}
    </Paper>
  );
}

export default QiblaFinder; 