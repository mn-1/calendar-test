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
      main: '#559ED6',
      contrastText: '#f5f5f5',
    },
    error: {
      main: red.A400,
    },
    // text: {
    //   primary: '#ff0000',
    // },
  },
});

export default theme;
