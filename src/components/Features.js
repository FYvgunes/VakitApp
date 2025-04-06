import React, { useState } from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Button,
  Snackbar,
  Alert,
  Tooltip,
  CircularProgress,
  Box,
  Portal
} from '@mui/material';
import {
  Notifications as NotificationIcon,
  LocationOn as LocationIcon,
  WatchLater as WatchIcon,
  Mosque as MosqueIcon,
  VolumeUp as VolumeIcon,
  Share as ShareIcon,
  Close as CloseIcon,
  Countertops as TasbihIcon,
  Book as DuaIcon,
  Event as CalendarIcon
} from '@mui/icons-material';
import { adhanService } from '../services/adhanService';
import { findNearbyMosques } from '../services/mosqueService';

function Features() {
  const [mosqueDialogOpen, setMosqueDialogOpen] = useState(false);
  const [nearbyMosques, setNearbyMosques] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [adhanPlaying, setAdhanPlaying] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [tasbihCount, setTasbihCount] = useState(0);
  const [tasbihDialogOpen, setTasbihDialogOpen] = useState(false);
  const [duaDialogOpen, setDuaDialogOpen] = useState(false);
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false);

  const handleNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setSnackbarMessage('Bildirim izni verildi');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Notification error:', error);
    }
  };

  const handleFindMosques = async () => {
    setLoading(true);
    try {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              };
              setUserLocation(location);
              const mosques = await findNearbyMosques(
                location.latitude,
                location.longitude
              );
              setNearbyMosques(mosques);
              setMosqueDialogOpen(true);
            } catch (error) {
              setSnackbarMessage(error.message);
              setSnackbarOpen(true);
            }
          },
          (error) => {
            setSnackbarMessage('Konum izni gerekiyor');
            setSnackbarOpen(true);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          }
        );
      } else {
        setSnackbarMessage('Tarayıcınız konum özelliğini desteklemiyor');
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Namaz Vakitleri',
          text: 'Namaz vakitlerini görüntüle',
          url: window.location.href
        });
      } else {
        // Kopyala seçeneği
        await navigator.clipboard.writeText(window.location.href);
        setSnackbarMessage('Link kopyalandı');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const handlePlayAdhan = async () => {
    if (adhanPlaying) {
      adhanService.stop();
      setAdhanPlaying(false);
    } else {
      const success = await adhanService.play();
      if (success) {
        setAdhanPlaying(true);
        setSnackbarMessage('Ezan çalınıyor');
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage('Ezan çalınamadı');
        setSnackbarOpen(true);
      }
    }
  };

  // Tesbih özelliği
  const handleTasbih = () => {
    setTasbihDialogOpen(true);
  };

  const handleTasbihCount = () => {
    setTasbihCount((prev) => (prev + 1) % 100);
  };

  // Dua kitaplığı
  const handleDuaLibrary = () => {
    setDuaDialogOpen(true);
  };

  // Dini günler takvimi
  const handleCalendar = () => {
    setCalendarDialogOpen(true);
  };

  const features = [
    {
      icon: <WatchIcon />,
      title: 'Namaz Vakitleri',
      description: 'Günlük namaz vakitlerini takip edin',
      action: () => {},
      color: 'primary.main'
    },
    {
      icon: <LocationIcon />,
      title: 'Kıble Pusulası',
      description: 'Bulunduğunuz yerden kıble yönünü bulun',
      action: () => {},
      color: '#E65100'
    },
    {
      icon: <TasbihIcon />,
      title: 'Tesbih',
      description: 'Dijital tesbih ile zikir çekin',
      action: handleTasbih,
      color: '#2E7D32'
    },
    {
      icon: <MosqueIcon />,
      title: 'Yakın Camiler',
      description: 'Çevrenizdeki camileri bulun',
      action: handleFindMosques,
      color: '#1565C0'
    },
    {
      icon: <DuaIcon />,
      title: 'Dua Kitaplığı',
      description: 'Günlük duaları görüntüleyin',
      action: handleDuaLibrary,
      color: '#4527A0'
    },
    {
      icon: <CalendarIcon />,
      title: 'Dini Günler',
      description: 'Önemli dini günleri takip edin',
      action: handleCalendar,
      color: '#C62828'
    },
    {
      icon: <NotificationIcon />,
      title: 'Bildirimler',
      description: 'Namaz vakitlerinde bildirim alın',
      action: handleNotificationPermission,
      color: '#00838F'
    },
    {
      icon: <VolumeIcon />,
      title: 'Ezan Sesi',
      description: 'Vakit girişinde ezan çalın',
      action: handlePlayAdhan,
      color: '#4A148C'
    },
    {
      icon: <ShareIcon />,
      title: 'Paylaş',
      description: 'Namaz vakitlerini paylaşın',
      action: handleShare,
      color: '#1B5E20'
    }
  ];

  const MosqueList = () => (
    <List>
      {nearbyMosques.length === 0 ? (
        <ListItem>
          <ListItemText primary="Yakında cami bulunamadı" />
        </ListItem>
      ) : (
        nearbyMosques.map((mosque, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={mosque.name}
              secondary={
                <>
                  <Typography variant="body2" color="text.secondary">
                    {mosque.vicinity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mesafe: {mosque.distance.toFixed(2)} km
                  </Typography>
                </>
              }
            />
            <Button
              variant="outlined"
              size="small"
              startIcon={<LocationIcon />}
              onClick={() => window.open(
                `https://www.openstreetmap.org/directions?from=${userLocation?.latitude},${userLocation?.longitude}&to=${mosque.latitude},${mosque.longitude}`,
                '_blank'
              )}
            >
              Yol Tarifi
            </Button>
          </ListItem>
        ))
      )}
    </List>
  );

  return (
    <>
      <Grid container spacing={2}>
        {features.map((feature, index) => (
          <Grid item xs={6} sm={4} md={4} key={index}>
            <Paper 
              sx={{ 
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.2s'
                }
              }}
              onClick={feature.action}
            >
              <IconButton 
                sx={{ 
                  mb: 1,
                  color: feature.color,
                  '&:hover': {
                    transform: 'scale(1.1)',
                    backgroundColor: 'transparent'
                  }
                }}
              >
                {feature.icon}
              </IconButton>
              <Typography variant="h6" gutterBottom align="center">
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Dialog'lar */}
      <Portal>
        {/* Yakın Camiler Dialog */}
        <Dialog 
          open={mosqueDialogOpen} 
          onClose={() => setMosqueDialogOpen(false)}
          maxWidth="sm"
          fullWidth
          sx={{
            '& .MuiDialog-paper': {
              margin: 2
            }
          }}
        >
          <DialogTitle>
            Yakındaki Camiler
            <IconButton
              onClick={() => setMosqueDialogOpen(false)}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {loading ? (
              <Typography>Camiler aranıyor...</Typography>
            ) : (
              <MosqueList />
            )}
          </DialogContent>
        </Dialog>

        {/* Tesbih Dialog */}
        <Dialog 
          open={tasbihDialogOpen} 
          onClose={() => setTasbihDialogOpen(false)}
          maxWidth="sm"
          fullWidth
          sx={{
            '& .MuiDialog-paper': {
              margin: 2
            }
          }}
        >
          <DialogTitle>
            Dijital Tesbih
            <IconButton
              onClick={() => setTasbihDialogOpen(false)}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ textAlign: 'center', py: 4 }}>
            <Box 
              onClick={handleTasbihCount}
              sx={{ 
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Typography variant="h1" color="primary" sx={{ mb: 2 }}>
                {tasbihCount}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Zikir sayısı (Ekrana tıklayarak sayabilirsiniz)
              </Typography>
              <Button 
                variant="outlined" 
                onClick={(e) => {
                  e.stopPropagation();
                  setTasbihCount(0);
                }}
                sx={{ mt: 2 }}
              >
                Sıfırla
              </Button>
            </Box>
          </DialogContent>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setSnackbarOpen(false)} 
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Portal>
    </>
  );
}

export default Features; 