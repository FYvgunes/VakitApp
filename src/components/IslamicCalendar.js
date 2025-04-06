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
  Star as StarIcon
} from '@mui/icons-material';
import { getIslamicHolidays, formatHolidayDate } from '../services/islamicCalendarService';

function IslamicCalendar({ open, onClose }) {
  const holidays = getIslamicHolidays();

  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'high':
        return 'error';
      case 'medium':
        return 'primary';
      default:
        return 'default';
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          height: '90vh',
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EventIcon color="primary" />
          <Typography variant="h6">Dini Günler Takvimi</Typography>
        </Box>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={2}>
          {holidays.map((holiday) => (
            <Grid item xs={12} md={6} key={holiday.id}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      {holiday.name}
                    </Typography>
                    {holiday.importance === 'high' && (
                      <StarIcon color="error" />
                    )}
                  </Box>

                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ mb: 2 }}
                  >
                    {holiday.description}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle1" color="primary">
                      {formatHolidayDate(holiday.date)}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip 
                        label={holiday.type === 'holiday' ? 'Bayram' : 'Kandil'}
                        color={getImportanceColor(holiday.importance)}
                        size="small"
                      />
                      {holiday.duration && (
                        <Chip 
                          label={`${holiday.duration} gün`}
                          variant="outlined"
                          size="small"
                        />
                      )}
                    </Box>
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