import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Link,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

function About() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Hakkında
      </Typography>
      
      <Typography variant="body1" paragraph>
        Bu uygulama, Müslümanların günlük ibadetlerini kolaylaştırmak için geliştirilmiştir.
        Namaz vakitlerini takip edebilir, kıble yönünü bulabilir ve daha fazlasını yapabilirsiniz.
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" gutterBottom>
        Özellikler
      </Typography>
      
      <List dense>
        <ListItem>
          <ListItemText 
            primary="Namaz Vakitleri"
            secondary="Günlük namaz vakitlerini görüntüleme"
          />
        </ListItem>
        <ListItem>
          <ListItemText 
            primary="Kıble Pusulası"
            secondary="Bulunduğunuz konuma göre kıble yönünü bulma"
          />
        </ListItem>
        <ListItem>
          <ListItemText 
            primary="Bildirimler"
            secondary="Namaz vakti girdiğinde bildirim alma"
          />
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" gutterBottom>
        İletişim
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2">
          Öneri ve şikayetleriniz için:
          <Link href="mailto:contact@example.com" sx={{ ml: 1 }}>
            contact@example.com
          </Link>
        </Typography>
      </Box>

      <Typography variant="caption" color="text.secondary" display="block">
        Versiyon 1.0.0
      </Typography>
    </Paper>
  );
}

export default About; 