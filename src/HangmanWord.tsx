type HangmanWordProps = {
  guessedLetters: string[];
  wordToGuess: string;
  revealWord: boolean;
};

const HangmanWord = ({
  guessedLetters,
  wordToGuess,
  revealWord,
}: HangmanWordProps) => {
  return (
    <div className="word-container">
      {wordToGuess.split("").map((letter, index) => (
        <span className="letter-container" key={index}>
          <span
            style={{
              visibility:
                guessedLetters.includes(letter) || revealWord
                  ? "visible"
                  : "hidden",
              color:
                !guessedLetters.includes(letter) && revealWord
                  ? "red"
                  : "black",
            }}
          >
            {" "}
            {letter}{" "}
          </span>
        </span>
      ))}
    </div>
  );
};

export default HangmanWord;
