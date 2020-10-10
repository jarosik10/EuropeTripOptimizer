import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
// import './App.css';
import { Helmet } from 'react-helmet';
import Map from './components/Map/Map';
import Header from './components/Header/Header';
import ControlPanel from './components/ControlPanel/ControlPanel';

/* @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap'); */

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



function App() {
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(false);
  const handleToggleControlPanel = () => {
    setIsControlPanelOpen(prevState => !prevState);
  }
  return (
    <>
      <GlobalStyles />
      <Helmet>
        <html lang="en" />
        <title>
          Europe trip optimizer
        </title>
        <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap" rel="stylesheet"></link>
      </Helmet>
      <Header onControlPanelToggle={handleToggleControlPanel}/>
      <Map />
      <ControlPanel isOpen={isControlPanelOpen} />
    </>
  );
}

export default App;
