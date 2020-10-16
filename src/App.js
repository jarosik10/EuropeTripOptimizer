import React, { useState } from 'react';

import Layout from './components/Layout/Layout';
import { Helmet } from 'react-helmet';
import Map from './components/Map/Map';
import Header from './components/Header/Header';
import ControlPanel from './components/ControlPanel/ControlPanel';

/* @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap'); */

// const addCapital = (state, {capitalName, countryId}) => {
//   const newState = [...state];
  // if (!state.start) {
  //   newState.start = { capitalName: capitalName, countryId: countryId }
  // }
  // else {
  //   newState.destinations.push({ capitalName: capitalName, countryId: countryId });
  // }

//   return newState;
// }

// const selectedCapitalsInitalState = {
//   start: null,
//   destinations: []
// }

// const selectedCapitalsReducer = (state, action) => {
//   switch (action.type) {
//     case 'ADD':
//       return addCapital(state, action);
//     default:
//       return state;
//   }
// }

function App() {
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(false);
  const handleToggleControlPanel = () => {
    setIsControlPanelOpen(prevState => !prevState);
  }

  // const [selectedCapitals, dispatch] = useReducer(selectedCapitalsReducer, selectedCapitalsInitalState)

  return (
    <Layout>
      <Helmet>
        <html lang="en" />
        <title>
          Europe trip optimizer
        </title>
        <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap" rel="stylesheet"></link>
      </Helmet>
      <Header onControlPanelToggle={handleToggleControlPanel} />
      <Map />
      <ControlPanel isOpen={isControlPanelOpen} />
    </Layout>
  );
}

export default App;
