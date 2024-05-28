import React, { useEffect, useState } from 'react';
import { getRandomWord } from './Categories';
import '../css/main.css';

interface HangmanProps {
    category: string;
    word: string;
    gameStarted: boolean;
    onGameStart: () => void;
    onGameEnd: () => void;
}

const Hangman: React.FC
    = ({ category, word, gameStarted, onGameStart, onGameEnd }) => {
        const [selectedWord, setSelectedWord] = useState<string>(word);
        const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
        const [errorCount, setErrorCount] = useState<number>(0);
        const [gameOver, setGameOver] = useState<boolean>(false);

        useEffect(() => {
            if (!gameStarted) {
                // Reset game state and timer when game ends
                setSelectedWord(word);
                setGuessedLetters([]);
                setErrorCount(0);
                setGameOver(false);
            }
        }, [gameStarted, word]);

        const displayWord = selectedWord.split('').map((letter, index) => {
            if (guessedLetters.includes(letter)) {
                return letter;
            } else {
                return '_';
            }
        });

        const handleGuess = (e: React.ChangeEvent<HTMLInputElement>) => {
            const letter = e.target.value;
            e.target.value = '';
            if (!guessedLetters.includes(letter)) {
                setGuessedLetters([...guessedLetters, letter]);
                if (!selectedWord.includes(letter)) {
                    setErrorCount(prev => prev + 1);
                    if (errorCount + 1 >= 5) {
                        setGameOver(true);
                    }
                }
            }
        };

        const restartGame = () => {
            const newWord = getRandomWord(category);
            setSelectedWord(newWord);
            setGuessedLetters([]);
            setErrorCount(0);
            setGameOver(false);
            onGameStart(); // Start the game again
        };

        return (
            <div className='strike'>
                {!gameStarted && (
                    <button onClick={onGameStart}>Start Game</button>
                )}
                {gameStarted && (
                    <>
                        <h3>Categoría: {category}</h3>
                        <p>{displayWord.join(' ')}</p>
                        <input maxLength={1} onChange={handleGuess} disabled={gameOver || displayWord.join('') === selectedWord} />
                        <button onClick={() => {
                            setGameOver(true);
                            onGameEnd(); // End the game
                        }}>End game</button>
                        {(displayWord.join('') === selectedWord || errorCount >= 5) && (
                            <>
                                <button onClick={restartGame}>Select New Word</button>
                                <p>Number of errors: {errorCount}</p>
                                {errorCount >= 5 && (
                                    <p>Sorry, you lost. The word was: {selectedWord}</p>
                                )}
                                {displayWord.join('') === selectedWord && (
                                    <>
                                        <p>You won in this round</p>
                                        <p>Congratulations!</p>
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        );
    };

export default Hangman;