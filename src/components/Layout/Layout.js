import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '../../utils/theme';

const GlobalStyles = createGlobalStyle`
*, *::before, *::after {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  padding: 0;
  font-family: "Merriweather", serif;
}
`;

const Layout = ({ children }) => (
    <ThemeProvider theme={theme}>
        <GlobalStyles />
            {children}
    </ThemeProvider>
);

export default Layout;