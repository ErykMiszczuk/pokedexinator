import React from 'react';
import './App.css';

import MainMenu from './components/MainMenu/MainMenu';
import AppContentTopBar from './components/AppContentTopBar/AppContentTopBar';
import AppContentArea from './components/AppContentArea/AppContentArea';

function App() {
  return (
    <div className="App">
      <MainMenu />
      <AppContentTopBar />
      <AppContentArea />
    </div>
  );
}

export default App;
