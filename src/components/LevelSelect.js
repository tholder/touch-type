import React from 'react';
import { Link } from 'react-router-dom';
import { levels } from '../data/levels';
import './LevelSelect.css';

function LevelSelect() {
  return (
    <div className="level-select">
      <h2>Select a Level</h2>
      <div className="levels-grid">
        {Object.entries(levels).map(([levelId, level]) => (
          <Link to={`/level/${levelId}`} key={levelId} className="level-card">
            <h3>Level {levelId}</h3>
            <p>{level.description}</p>
            <span className="difficulty">
              Difficulty: {level.difficulty}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default LevelSelect; 