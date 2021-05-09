import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = responsiveFontSizes(
  createMuiTheme({
    typography: {
      fontFamily: 'Montserrat, sans-serif',
      h1: {
        fontWeight: 100,
        color: '#fff',
        letterSpacing: '1.8rem',
        lineHeight: 1.5,
      },
    },
  }),
);

export default theme;
