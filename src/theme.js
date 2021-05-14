import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: '#ff8800',
      },
      secondary: {
        main: '#2A93FC',
      },
      tertiary: {
        main: '#2AE619',
      },
    },
    typography: {
      fontFamily: 'Montserrat, sans-serif',
      h1: {
        fontWeight: 300,
        color: '#fff',
        letterSpacing: '1.8rem',
        lineHeight: 1.5,
      },
      body1: {
        fontFamily: 'Montserrat, sans-serif',
        lineHeight: 2,
        fontSize: '1rem',
      },
    },
  }),
);

export default theme;
