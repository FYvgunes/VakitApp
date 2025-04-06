import React, { useState } from 'react';
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
  Fade
} from '@mui/material';
import {
  Close as CloseIcon,
  Search as SearchIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon
} from '@mui/icons-material';

function DuaLibrary({ open, onClose }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  const categories = [
    'Sabah Duaları',
    'Akşam Duaları',
    'Yemek Duaları',
    'Namaz Duaları',
    'Kuran Duaları'
  ];

  const duas = {
    'Sabah Duaları': [
      {
        id: 1,
        title: 'Sabah Duası',
        arabic: 'اَللّٰهُمَّ بِكَ اَصْبَحْنَا وَبِكَ اَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَاِلَيْكَ النُّشُورُ',
        meaning: 'Allah'ım! Senin rahmetinle sabahladık, senin rahmetinle akşamladık. Senin sayende yaşar, senin sayende ölürüz. En son dönüşümüz de sanadır.',
        source: 'Tirmizi, Daavat, 13'
      },
      // ... diğer dualar
    ],
    // ... diğer kategoriler
  };

  const handleToggleFavorite = (duaId) => {
    setFavorites(prev => 
      prev.includes(duaId) 
        ? prev.filter(id => id !== duaId)
        : [...prev, duaId]
    );
  };

  const filteredDuas = duas[categories[selectedTab]]?.filter(dua =>
    dua.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dua.meaning.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      TransitionComponent={Fade}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">Dua Kitaplığı</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        {/* Arama Kutusu */}
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

      <DialogContent>
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
              label={category}
              sx={{ 
                textTransform: 'none',
                fontWeight: selectedTab === index ? 'bold' : 'normal'
              }}
            />
          ))}
        </Tabs>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filteredDuas?.map((dua) => (
            <Card 
              key={dua.id}
              sx={{ 
                '&:hover': { 
                  boxShadow: 3,
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {dua.title}
                  </Typography>
                  <IconButton 
                    onClick={() => handleToggleFavorite(dua.id)}
                    color="primary"
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
                    lineHeight: 2
                  }}
                >
                  {dua.arabic}
                </Typography>

                <Typography variant="body1" color="text.secondary" paragraph>
                  {dua.meaning}
                </Typography>

                <Chip 
                  label={dua.source}
                  size="small"
                  sx={{ bgcolor: 'primary.main', color: 'white' }}
                />
              </CardContent>
            </Card>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default DuaLibrary; 