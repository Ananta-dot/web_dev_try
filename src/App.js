import React from 'react';
import { DarkModeProvider } from './contexts/DarkModeContext';
import Homepage from './components/Homepage';
import './index.css';

function App() {
  return (
    <DarkModeProvider>
      <div className="App">
        <Homepage />
      </div>
    </DarkModeProvider>
  );
}

export default App;
