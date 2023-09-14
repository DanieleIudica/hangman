import { useCallback, useEffect, useState } from "react";
import engWords from "./engWordList.json";
import itaWords from "./itaWordList.json";

import "./App.css";
import HangmanDrawing from "./HangmanDrawing";
import HangmanWord from "./HangmanWord";
import Keyboard from "./Keyboard";

function getNewEnglishWord() {
  return engWords[Math.floor(Math.random() * engWords.length)];
}

function getNewItalianWord() {
  return itaWords[Math.floor(Math.random() * itaWords.length)];
}

function App() {
  const [wordToGuess, setWordToGuess] = useState("");

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner =
    wordToGuess !== "" &&
    wordToGuess.split("").every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (
        guessedLetters.includes(letter) ||
        isLoser ||
        isWinner ||
        !wordToGuess
      )
        return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isLoser, isWinner, wordToGuess]
  );

  function restartEng() {
    setWordToGuess(getNewEnglishWord()), setGuessedLetters([]);
  }

  function restartIta() {
    setWordToGuess(getNewItalianWord()), setGuessedLetters([]);
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [addGuessedLetter, guessedLetters]);

  console.log(wordToGuess);
  return (
    <div className="container">
      <HangmanDrawing numberOfWrongGuesses={incorrectLetters.length} />
      <div className="title">
        {isWinner && "YOU WON!"}
        {isLoser && "NICE TRY.."}
      </div>
      <HangmanWord
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
        revealWord={isLoser}
        isWinner={isWinner}
      />
      <div className="keyboard-wrapper">
        <Keyboard
          disabled={isWinner || isLoser || !wordToGuess}
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
      <div className="btns-container">
        <button onClick={() => restartEng()}>English Word</button>
        <button onClick={() => restartIta()}>Italian Word</button>
      </div>
    </div>
  );
}

export default App;
