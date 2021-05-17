import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import Root from './Root';
import theme from './theme';

ReactDOM.render(
  <React.StrictMode>
    <Root>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Root>
  </React.StrictMode>,
  document.getElementById('root'),
);
