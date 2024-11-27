import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TypingGame from './components/TypingGame';
import LevelSelect from './components/LevelSelect';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Touch Type Tutor</h1>
        <Routes>
          <Route path="/" element={<LevelSelect />} />
          <Route path="/level/:levelId" element={<TypingGame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 