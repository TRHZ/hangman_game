// App.tsx
import React, { useState } from 'react';
import Welcome from './components/Welcome';
import Hangman from './components/Hangman';
import Clock from './components/Clock';
import { getRandomCategory, getRandomWord } from './components/Categories';

const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const startGame = () => {
    setGameStarted(true);
  };

  const endGame = () => {
    setGameStarted(false);
  };

  const selectedCategory: string = getRandomCategory();
  const selectedWord: string = getRandomWord(selectedCategory);

  return (
    <div className="App">
      <Welcome />
      <Clock gameStarted={gameStarted} />
      <Hangman
        category={selectedCategory}
        word={selectedWord}
        gameStarted={gameStarted}
        onGameStart={startGame}
        onGameEnd={endGame}
      />
    </div>
  );
};

export default App;
