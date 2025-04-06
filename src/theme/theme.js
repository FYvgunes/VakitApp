import { createTheme } from '@mui/material/styles';

export const getTheme = (darkMode) => createTheme({
  palette: {
    mode: darkMode ? 'dark' : 'light',
    primary: {
      main: darkMode ? '#81c784' : '#2E7D32',
      light: darkMode ? '#a5d6a7' : '#4CAF50',
      dark: darkMode ? '#519657' : '#1B5E20',
    },
    secondary: {
      main: '#C3A375',
      light: '#D4BC94',
      dark: '#A88B5E',
    },
    background: {
      default: darkMode ? '#0A1929' : '#f5f5f5',
      paper: darkMode ? '#001E3C' : '#ffffff',
      card: darkMode ? '#132F4C' : '#ffffff',
    },
    text: {
      primary: darkMode ? '#ffffff' : '#333333',
      secondary: darkMode ? '#B2BAC2' : '#666666',
    },
    custom: {
      gradients: {
        primary: darkMode 
          ? 'linear-gradient(45deg, #081F37 30%, #132F4C 90%)'
          : 'linear-gradient(45deg, #4CAF50 30%, #2E7D32 90%)',
        secondary: darkMode
          ? 'linear-gradient(45deg, #001E3C 30%, #0A1929 90%)'
          : 'linear-gradient(45deg, #81C784 30%, #4CAF50 90%)',
      },
      nextPrayer: {
        background: '#94B49F',
        text: '#FFFFFF',
      },
      card: {
        hover: 'rgba(148, 180, 159, 0.1)',
      },
    },
  },
  typography: {
    fontFamily: "'Roboto', 'sans-serif'",
    h4: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body2: {
      fontSize: '0.875rem',
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: darkMode 
            ? '0 3px 10px rgba(0,0,0,0.5)'
            : '0 1px 3px rgba(0,0,0,0.12)',
          borderRadius: 12,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: darkMode 
              ? '0 5px 15px rgba(0,0,0,0.7)'
              : '0 3px 10px rgba(0,0,0,0.15)',
          }
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500
        }
      }
    }
  },
}); 