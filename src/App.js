import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from './components/Layout/Layout';
import { Helmet } from 'react-helmet';
import Map from './components/Map/Map';
import Header from './components/Header/Header';
import ControlPanel from './components/ControlPanel/ControlPanel';

const AppWrapper = styled.div`
    ${({ theme }) => theme.media.smallDesktop} {
      display: flex;
    }
`;

function App() {
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(false);
  const handleToggleControlPanel = () => {
    setIsControlPanelOpen(prevState => !prevState);
  }

  return (
    <Layout>
      <Helmet>
        <html lang="en" />
        <title>
          Europe trip optimizer
        </title>
        <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap" rel="stylesheet"></link>
      </Helmet>
      <AppWrapper>
        <Header onControlPanelToggle={handleToggleControlPanel} />
        <ControlPanel isOpen={isControlPanelOpen} />
        <Map />
      </AppWrapper>
    </Layout>
  );
}

export default App;
