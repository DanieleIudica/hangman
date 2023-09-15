type HangmanWordProps = {
  guessedLetters: string[];
  wordToGuess: string;
  revealWord: boolean;
  isWinner: boolean;
};
const HangmanWord = ({
  guessedLetters,
  wordToGuess,
  revealWord,
  isWinner,
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
                  : isWinner
                  ? "lightgreen"
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
