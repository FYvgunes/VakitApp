import React from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Notifications as NotificationIcon,
  DarkMode as DarkModeIcon,
  Language as LanguageIcon,
  VolumeUp as VolumeIcon
} from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';

function Settings({ onClose }) {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Ayarlar
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <NotificationIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Namaz Vakti Bildirimleri"
            secondary="Vakit girdiğinde bildirim al"
          />
          <Switch defaultChecked />
        </ListItem>
        
        <Divider />
        
        <ListItem>
          <ListItemIcon>
            <DarkModeIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Karanlık Mod"
            secondary="Koyu tema kullan"
          />
          <Switch 
            checked={darkMode}
            onChange={toggleDarkMode}
          />
        </ListItem>
        
        <Divider />
        
        <ListItem>
          <ListItemIcon>
            <VolumeIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Ezan Sesi"
            secondary="Vakit girdiğinde ezan çal"
          />
          <Switch defaultChecked />
        </ListItem>
        
        <Divider />
        
        <ListItem>
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <FormControl fullWidth sx={{ ml: 2 }}>
            <InputLabel>Dil</InputLabel>
            <Select
              value="tr"
              label="Dil"
              size="small"
            >
              <MenuItem value="tr">Türkçe</MenuItem>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="ar">العربية</MenuItem>
            </Select>
          </FormControl>
        </ListItem>
      </List>
    </Paper>
  );
}

export default Settings; 