import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Divider
} from '@mui/material';
import {
  Close as CloseIcon,
  Event as EventIcon,
  Notifications as NotificationIcon
} from '@mui/icons-material';

function IslamicCalendar({ open, onClose }) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const islamicEvents = [
    {
      name: 'Ramazan Başlangıcı',
      date: '12 Mart 2024',
      hijriDate: '1 Ramazan 1445',
      description: 'Ramazan ayının başlangıcı',
      type: 'major'
    },
    {
      name: 'Kadir Gecesi',
      date: '5 Nisan 2024',
      hijriDate: '27 Ramazan 1445',
      description: 'Bin aydan daha hayırlı gece',
      type: 'special'
    },
    // ... diğer önemli günler
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">Dini Günler Takvimi</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          {islamicEvents.map((event, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  bgcolor: event.type === 'major' 
                    ? 'primary.main' 
                    : event.type === 'special'
                      ? 'secondary.main'
                      : 'background.paper',
                  color: event.type === 'major' || event.type === 'special'
                    ? 'white'
                    : 'text.primary',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.2s'
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <EventIcon />
                    <Typography variant="h6">{event.name}</Typography>
                  </Box>
                  
                  <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.2)' }} />
                  
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {event.date}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                    {event.hijriDate}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {event.description}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip 
                      icon={<NotificationIcon />}
                      label="Hatırlatıcı Ekle"
                      onClick={() => {}}
                      sx={{ 
                        bgcolor: 'rgba(255,255,255,0.1)',
                        color: 'inherit',
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.2)'
                        }
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default IslamicCalendar; 