import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Dialog
} from '@mui/material';
import {
  Menu as MenuIcon,
  Explore as QiblaIcon,
  AccessTime as PrayerIcon,
  Settings as SettingsIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import QiblaFinder from './QiblaFinder';
import Settings from './Settings';
import About from './About';

function AppMenu({ onMenuSelect }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isQiblaOpen, setIsQiblaOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const menuItems = [
    { 
      text: 'Namaz Vakitleri', 
      icon: <PrayerIcon />, 
      action: () => onMenuSelect('prayer')
    },
    { 
      text: 'Kıble Pusulası', 
      icon: <QiblaIcon />, 
      action: () => setIsQiblaOpen(true)
    },
    { 
      text: 'Ayarlar', 
      icon: <SettingsIcon />, 
      action: () => setIsSettingsOpen(true)
    },
    { 
      text: 'Hakkında', 
      icon: <InfoIcon />, 
      action: () => setIsAboutOpen(true)
    }
  ];

  return (
    <>
      <IconButton 
        onClick={() => setIsDrawerOpen(true)}
        sx={{ position: 'absolute', top: 16, left: 16 }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <List sx={{ width: 250 }}>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text}
              onClick={() => {
                item.action();
                setIsDrawerOpen(false);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Dialog
        open={isQiblaOpen}
        onClose={() => setIsQiblaOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <QiblaFinder />
      </Dialog>

      <Dialog
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <Settings onClose={() => setIsSettingsOpen(false)} />
      </Dialog>

      <Dialog
        open={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <About />
      </Dialog>
    </>
  );
}

export default AppMenu; 