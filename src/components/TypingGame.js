import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { levels } from '../data/levels';
import './TypingGame.css';

function TypingGame() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const [words, setWords] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [mistakes, setMistakes] = useState(0);

  useEffect(() => {
    const levelWords = levels[levelId]?.words || [];
    setWords(levelWords);
  }, [levelId]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    const currentWord = words[currentWordIndex];
    
    if (input.length <= currentWord.length) {
      if (currentWord.startsWith(input)) {
        setCurrentInput(input);
        
        if (!startTime) {
          setStartTime(Date.now());
        }
        
        if (input === currentWord) {
          if (currentWordIndex === words.length - 1) {
            setEndTime(Date.now());
          } else {
            setCurrentWordIndex(currentWordIndex + 1);
            setCurrentInput('');
          }
        }
      } else {
        setMistakes(mistakes + 1);
      }
    }
  };

  const calculateResults = useCallback(() => {
    const timeInSeconds = (endTime - startTime) / 1000;
    const wordsPerMinute = Math.round((words.length / timeInSeconds) * 60);
    const accuracy = Math.round(
      ((words.join(' ').length - mistakes) / words.join(' ').length) * 100
    );
    
    return { wordsPerMinute, accuracy, timeInSeconds };
  }, [endTime, startTime, words, mistakes]);

  if (endTime) {
    const results = calculateResults();
    return (
      <div className="results">
        <h2>Level Complete!</h2>
        <p>Words per minute: {results.wordsPerMinute}</p>
        <p>Accuracy: {results.accuracy}%</p>
        <p>Time: {Math.round(results.timeInSeconds)}s</p>
        <button onClick={() => navigate('/')}>Back to Levels</button>
      </div>
    );
  }

  return (
    <div className="typing-game">
      <div className="words-display">
        {words.map((word, index) => (
          <span
            key={index}
            className={`word ${index === currentWordIndex ? 'current' : ''} 
                       ${index < currentWordIndex ? 'completed' : ''}`}
          >
            {word}
          </span>
        ))}
      </div>
      <input
        type="text"
        value={currentInput}
        onChange={handleInputChange}
        className="typing-input"
        autoFocus
      />
    </div>
  );
}

export default TypingGame; 