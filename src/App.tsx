import { useCallback, useEffect, useState } from "react";
import engWords from "./data/engWordList.json";
import itaWords from "./data/itaWordList.json";
import Button from "./components/Button";

import "./style/App.css";
import HangmanDrawing from "./components/HangmanDrawing";
import HangmanWord from "./components/HangmanWord";
import Keyboard from "./components/Keyboard";

import { loserAtom, winnerAtom, wordToGuessAtom } from "./atom/atom";
import { useAtom } from "jotai";

function getNewEnglishWord() {
  return engWords[Math.floor(Math.random() * engWords.length)];
}

function getNewItalianWord() {
  return itaWords[Math.floor(Math.random() * itaWords.length)];
}

function App() {
  const [loser, setLoser] = useAtom(loserAtom);
  const [winner, setWinner] = useAtom(winnerAtom);

  const [wordToGuess, setWordToGuess] = useAtom(wordToGuessAtom);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  useEffect(() => {
    setLoser(incorrectLetters.length >= 6);
    setWinner(
      wordToGuess !== "" &&
        wordToGuess.split("").every((letter) => guessedLetters.includes(letter))
    );
  }, [
    guessedLetters,
    incorrectLetters.length,
    loser,
    setLoser,
    setWinner,
    wordToGuess,
  ]);

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || loser || winner || !wordToGuess)
        return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, loser, winner, wordToGuess]
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

  // console.log(wordToGuess);
  return (
    <div className="container">
      <HangmanDrawing numberOfWrongGuesses={incorrectLetters.length} />
      <div className="title">
        {winner && "YOU WON!"}
        {loser && "NICE TRY.."}
      </div>
      <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div className="keyboard-wrapper">
        <Keyboard
          disabled={winner || loser || !wordToGuess}
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
      <div className="btns-container">
        <Button onClick={() => restartEng()}>English Word</Button>
        <Button onClick={() => restartIta()}>Italian Word</Button>
      </div>
    </div>
  );
}

export default App;
