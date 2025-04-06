import React from 'react';
import { 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Typography 
} from '@mui/material';

function CitySelector({ cities, selectedCity, onCityChange, isMobile }) {
  const handleCityChange = (cityId) => {
    const selectedCityData = cities.find(city => city.id === cityId);
    onCityChange(cityId, selectedCityData?.name || '');
  };

  return (
    <Box sx={{ mb: 4, textAlign: 'center' }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom
        sx={{ 
          color: 'text.primary',
          mb: 3,
          fontWeight: 500
        }}
      >
        Namaz Vakitleri
      </Typography>
      <FormControl 
        variant="outlined" 
        sx={{ 
          minWidth: isMobile ? '100%' : 300,
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'background.paper',
            '&:hover fieldset': {
              borderColor: 'primary.main',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'text.secondary',
          }
        }}
      >
        <InputLabel>Şehir Seçiniz</InputLabel>
        <Select
          value={selectedCity || ''}
          onChange={(e) => handleCityChange(e.target.value)}
          label="Şehir Seçiniz"
        >
          {cities.map((city) => (
            <MenuItem 
              key={city.id} 
              value={city.id}
              sx={{
                '&:hover': {
                  backgroundColor: 'custom.card.hover',
                }
              }}
            >
              {city.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default CitySelector;