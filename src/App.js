import React from 'react'
import './App.css';

import MainMenu from './components/MainMenu/MainMenu.jsx';
import AppContentTopBar from './components/AppContentTopBar/AppContentTopBar.jsx';
import AppContentArea from './components/AppContentArea/AppContentArea.jsx';

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
