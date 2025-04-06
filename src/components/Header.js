import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import MosqueIcon from '@mui/icons-material/Mosque';

const Header = () => {
  return (
    <AppBar position="static" color="primary" sx={{ mb: 4 }}>
      <Container maxWidth="lg">
        <Toolbar>
          <MosqueIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div">
            Namaz Vakitleri
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;