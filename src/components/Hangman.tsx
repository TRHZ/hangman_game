import React, { useEffect, useState } from 'react';
import { getRandomWord } from './Categories';
import '../css/main.css';

interface HangmanProps {
    category: string;
    word: string;
}

const Hangman: React.FC<HangmanProps> = ({ category, word }) => {
    const [selectedWord, setSelectedWord] = useState<string>(word); // The word to guess
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]); // The letters that have been guessed
    const [errorCount, setErrorCount] = useState<number>(0);  // The number of errors
    const [gameStarted, setGameStarted] = useState<boolean>(false); // Whether the game has started
    const [gameOver, setGameOver] = useState<boolean>(false);   // Whether the game is over

    useEffect(() => {
        console.log("Selected word: ", selectedWord); 
    }, [selectedWord]); 

    const displayWord = selectedWord.split('').map((letter, index) => {
        if (guessedLetters.includes(letter)) {
            return letter;
        } else {
            return '_';
        }
    });

    const handleGuess = (e: React.ChangeEvent<HTMLInputElement>) => {
        const letter = e.target.value;
        e.target.value = ''; // Clear the input field after each guess
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
    }

    return (
        <div className='strike'>
            {!gameStarted && (
                <button onClick={() => setGameStarted(true)}>Start Game</button>
            )}
            {gameStarted && (
                <>
                    <h3>Categoría: {category}</h3>
                    <p>{displayWord.join(' ')}</p>
                    <input maxLength={1} onChange={handleGuess} disabled={gameOver || displayWord.join('') === selectedWord} />

                    {(displayWord.join('') === selectedWord || errorCount >= 5) && (
                        <>
                            <button onClick={restartGame}>Select New Word</button>
                            <p>Cantidad de errores: {errorCount}</p>
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
    )
}
export default Hangman;
