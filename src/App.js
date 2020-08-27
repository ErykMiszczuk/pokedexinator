import React from 'react';
import './App.css';

import MainMenu from './components/MainMenu/MainMenu';
import AppContent from './components/AppContent/AppContent';

function App() {
  return (
    <div className="App">
      <MainMenu />
      <AppContent />
    </div>
  );
}

export default App;
