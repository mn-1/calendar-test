import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#2E8B57',
      contrastText: '#f5f5f5',
    },
    secondary: {
      main: '#696969',
      contrastText: '#696969',
    },
    error: {
      main: red.A400,
    },

    text: {
      primary: '#000000',
      secondary: '#696969',
    },
  },
});

export default theme;
