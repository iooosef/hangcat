import React, { useState } from 'react';
import './App.css';

const words = ['VARIABLES', 'DATA TYPES', 'OPERATORS', 'SELECTION', 'LOOPS', 'FUNCTIONS'];
const maxWrongGuesses = 6;

const App = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [letterStatus, setLetterStatus] = useState({});

  const currentWord = words[currentWordIndex];
  const letters = currentWord.split('');

  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter) || gameOver || gameWon) return;

    if (letters.includes(letter)) {
      const allGuessed = letters.every((ltr) => guessedLetters.includes(ltr) || ltr === letter);
      setGuessedLetters([...guessedLetters, letter]);
      setLetterStatus((prev) => ({ ...prev, [letter]: 'correct' }));
      if (allGuessed) setGameWon(true);
    } else {
      const newWrongGuesses = wrongGuesses + 1;
      setWrongGuesses(newWrongGuesses);
      setLetterStatus((prev) => ({ ...prev, [letter]: 'wrong' }));
      if (newWrongGuesses >= maxWrongGuesses) setGameOver(true);
    }
  };

  const resetGame = () => {
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameOver(false);
    setGameWon(false);
    setLetterStatus({});
  };

  const nextRound = () => {
    resetGame();
    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  const renderHangmanImage = () => {
    const parts = [
      { src: wrongGuesses === maxWrongGuesses ? '/assets/death-face.png' : '/assets/head.png', 
        style: { position: 'absolute', top: '190px', left: '770px' } },
      { src: '/assets/torso.png', style: { position: 'absolute', top: '187px', left: '770px' } },
      { src: '/assets/r-arm.png', style: { position: 'absolute', top: '187px', left: '770px'} },
      { src: '/assets/l-arm.png', style: { position: 'absolute', top: '187px', left: '770px'} },
      { src: '/assets/r-leg.png', style: { position: 'absolute', top: '187px', left: '770px'} },
      { src: '/assets/l-leg.png', style: { position: 'absolute', top: '187px', left: '770px'} }
    ];
    
    return (
      <div className="hangman-container">
        <img src="/assets/noose.jpg" alt="Noose" className="noose" />
        {parts.slice(0, wrongGuesses).map((part, index) => (
          <img key={index} src={part.src} alt={`Hangman part ${index + 1}`} className="hangman-part" style={part.style} />
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      {renderHangmanImage()}
      <div className="word">
        {letters.map((letter, index) => (
          <span key={index} className="letter">
            {guessedLetters.includes(letter) ? letter : '_'}
          </span>
        ))}
      </div>
      <div className="keyboard">
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
          <button
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={guessedLetters.includes(letter) || gameOver || gameWon}
            className={`letter-btn ${letterStatus[letter]}`}
          >
            {letter}
          </button>
        ))}
      </div>
      {gameOver && (
        <div className="message">
          <h2>The cat died 😿! The correct word is "{currentWord}".</h2>
          <button onClick={nextRound}>Next Round</button>
        </div>
      )}
      {gameWon && (
        <div className="message">
          <h2>Congratulations! You've guessed the word!</h2>
          <button onClick={nextRound}>Next Round</button>
        </div>
      )}
    </div>
  );
};

export default App;
