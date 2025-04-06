import React, { useEffect, useState } from 'react';
import { Container, Box, CircularProgress, Alert, useMediaQuery } from '@mui/material';
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { getTheme } from './theme/theme';
import { useTheme } from './context/ThemeContext';
import { fetchCities, fetchPrayerTimes } from './services/api';
import CitySelector from './components/CitySelector';
import PrayerTimesGrid from './components/PrayerTimesGrid';
import HadisDisplay from './components/HadisDisplay';
import AppMenu from './components/AppMenu';
import './App.css';
import { CssBaseline } from '@mui/material';

function AppContent() {
  const { darkMode } = useTheme();
  const theme = getTheme(darkMode);

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCityName, setSelectedCityName] = useState('');
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // useMediaQuery'yi ThemeProvider içinde kullanmak için taşıyalım
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleCityChange = (cityId, cityName) => {
    setSelectedCity(cityId);
    setSelectedCityName(cityName);
  };

  useEffect(() => {
    const loadCities = async () => {
      try {
        const citiesData = await fetchCities();
        setCities(citiesData);
        if (citiesData.length > 0) {
          setSelectedCity(citiesData[0].id);
          setSelectedCityName(citiesData[0].name);
        }
      } catch (error) {
        setError('Şehir listesi alınamadı. Lütfen sayfayı yenileyin.');
      }
    };
    loadCities();
  }, []);

  useEffect(() => {
    const loadPrayerTimes = async () => {
      if (!selectedCity) return;
      
      try {
        setLoading(true);
        setError(null);
        const times = await fetchPrayerTimes(selectedCity);
        setPrayerTimes(times);
      } catch (error) {
        setError('Namaz vakitleri alınamadı. Lütfen daha sonra tekrar deneyin.');
      } finally {
        setLoading(false);
      }
    };

    loadPrayerTimes();
  }, [selectedCity]);

  const handleMenuSelect = (menuItem) => {
    // Menü seçimlerine göre işlemler yapılabilir
    console.log('Selected menu item:', menuItem);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}>
        <CssBaseline />
        <Container 
          maxWidth="lg" 
          sx={{ 
            py: 4,
            backgroundColor: 'background.default',
            minHeight: '100vh'
          }}
        >
          <AppMenu onMenuSelect={handleMenuSelect} />
          <CitySelector 
            cities={cities}
            selectedCity={selectedCity}
            onCityChange={handleCityChange}
            isMobile={isMobile}
          />

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress sx={{ color: 'primary.main' }} />
            </Box>
          )}

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 4,
                backgroundColor: 'rgba(211, 47, 47, 0.1)',
                color: '#d32f2f'
              }}
            >
              {error}
            </Alert>
          )}

          {prayerTimes && (
            <PrayerTimesGrid 
              prayerTimes={prayerTimes} 
              cityName={selectedCityName}
            />
          )}
          
          {/* Hadis gösterimi */}
          {!loading && !error && <HadisDisplay />}
        </Container>
      </Box>
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <CustomThemeProvider>
      <AppContent />
    </CustomThemeProvider>
  );
}

export default App; 