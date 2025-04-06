import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  InputBase,
  Chip,
  Fade,
  CircularProgress
} from '@mui/material';
import {
  Close as CloseIcon,
  Search as SearchIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon
} from '@mui/icons-material';
import { fetchDuas, fetchDuaCategories } from '../services/duaService';

function DuaLibrary({ open, onClose }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteDuas');
    return saved ? JSON.parse(saved) : [];
  });
  const [duas, setDuas] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDuas = async () => {
      try {
        setLoading(true);
        setError(null);
        const [duasData, categoriesData] = await Promise.all([
          fetchDuas(),
          fetchDuaCategories()
        ]);
        setDuas(duasData);
        setCategories(categoriesData);
      } catch (error) {
        setError('Dualar yüklenirken bir hata oluştu');
        console.error('Dua yükleme hatası:', error);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      loadDuas();
    }
  }, [open]);

  useEffect(() => {
    localStorage.setItem('favoriteDuas', JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (duaId) => {
    setFavorites(prev => 
      prev.includes(duaId) 
        ? prev.filter(id => id !== duaId)
        : [...prev, duaId]
    );
  };

  const filteredDuas = duas.filter(dua => {
    if (selectedTab === 0) return true;
    if (selectedTab === categories.length - 1) return favorites.includes(dua.id);
    return dua.category === categories[selectedTab];
  }).filter(dua =>
    dua.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dua.meaning.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Vakit durumunu kontrol eden fonksiyon
  const getTimeStatus = (category) => {
    const now = new Date();
    const currentHour = now.getHours();

    switch(category) {
      case 'Sabah Duaları':
        return currentHour >= 4 && currentHour < 8;
      case 'Öğle Duaları':
        return currentHour >= 12 && currentHour < 15;
      case 'İkindi Duaları':
        return currentHour >= 15 && currentHour < 18;
      case 'Akşam Duaları':
        return currentHour >= 18 && currentHour < 20;
      case 'Yatsı Duaları':
        return currentHour >= 20 || currentHour < 4;
      default:
        return false;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      TransitionComponent={Fade}
      PaperProps={{
        sx: {
          height: '90vh',
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle
        sx={{
          position: 'sticky',
          top: 0,
          bgcolor: 'background.paper',
          zIndex: 1,
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">Dua Kitaplığı</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Box 
          sx={{ 
            mt: 2,
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'background.paper',
            borderRadius: 2,
            p: 1,
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <SearchIcon sx={{ mx: 1, color: 'text.secondary' }} />
          <InputBase
            placeholder="Dua ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
          />
        </Box>
      </DialogTitle>

      <DialogContent 
        sx={{ 
          p: 2,
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(0,0,0,0.1)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '4px',
            '&:hover': {
              background: 'rgba(0,0,0,0.3)',
            }
          }
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ textAlign: 'center', my: 4 }}>
            {error}
          </Typography>
        ) : (
          <>
            <Tabs
              value={selectedTab}
              onChange={(e, newValue) => setSelectedTab(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
            >
              {categories.map((category, index) => (
                <Tab 
                  key={index} 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {category}
                      {category === 'Favoriler' && favorites.length > 0 && (
                        <Chip 
                          label={favorites.length} 
                          size="small" 
                          color="primary"
                        />
                      )}
                    </Box>
                  }
                  sx={{ 
                    textTransform: 'none',
                    fontWeight: selectedTab === index ? 'bold' : 'normal'
                  }}
                />
              ))}
            </Tabs>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {filteredDuas.map((dua) => (
                <Card 
                  key={dua.id}
                  sx={{ 
                    bgcolor: getTimeStatus(dua.category) ? 'primary.main' : 'background.paper',
                    color: getTimeStatus(dua.category) ? 'white' : 'text.primary',
                    '&:hover': { 
                      boxShadow: 3,
                      transform: 'translateY(-2px)',
                      transition: 'all 0.3s ease',
                      bgcolor: getTimeStatus(dua.category) 
                        ? 'primary.dark'
                        : 'background.paper',
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography 
                        variant="h6" 
                        gutterBottom
                        sx={{ 
                          color: getTimeStatus(dua.category) ? 'inherit' : 'text.primary'
                        }}
                      >
                        {dua.title}
                      </Typography>
                      <IconButton 
                        onClick={() => handleToggleFavorite(dua.id)}
                        color={getTimeStatus(dua.category) ? "inherit" : "primary"}
                      >
                        {favorites.includes(dua.id) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                      </IconButton>
                    </Box>

                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 2, 
                        fontFamily: 'Amiri, serif',
                        textAlign: 'right',
                        lineHeight: 2,
                        color: getTimeStatus(dua.category) ? 'inherit' : 'text.primary'
                      }}
                    >
                      {dua.arabic}
                    </Typography>

                    {dua.transliteration && (
                      <Typography 
                        variant="body1" 
                        paragraph
                        sx={{ 
                          fontStyle: 'italic',
                          color: getTimeStatus(dua.category) ? 'inherit' : 'text.secondary',
                          opacity: getTimeStatus(dua.category) ? 0.9 : 0.7
                        }}
                      >
                        {dua.transliteration}
                      </Typography>
                    )}

                    <Typography 
                      variant="body1" 
                      paragraph
                      sx={{ 
                        color: getTimeStatus(dua.category) ? 'inherit' : 'text.primary'
                      }}
                    >
                      {dua.meaning}
                    </Typography>

                    <Chip 
                      label={dua.source}
                      size="small"
                      sx={{ 
                        bgcolor: getTimeStatus(dua.category) ? 'rgba(255,255,255,0.2)' : 'primary.main',
                        color: getTimeStatus(dua.category) ? 'inherit' : 'white'
                      }}
                    />
                  </CardContent>
                </Card>
              ))}
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default DuaLibrary; 