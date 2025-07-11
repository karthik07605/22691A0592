import React from 'react';
import { Route, Routes } from 'react-router-dom';
import URLShortener from './URLShortener';
import URLStats from './URLStats';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<URLShortener />} />
          <Route path="/stats" element={<URLStats />} />
          <Route path="/:shortcode" element={<URLShortener />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;