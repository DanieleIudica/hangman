type HangmanWordProps = {
  guessedLetters: string[];
  wordToGuess: string;
};

const HangmanWord = ({ guessedLetters, wordToGuess }: HangmanWordProps) => {
  // const word = "test";
  // const guessedLetters = [""];
  return (
    <div className="word-container">
      {wordToGuess.split("").map((letter, index) => (
        <span className="letter-container" key={index}>
          <span
            style={{
              visibility: guessedLetters.includes(letter)
                ? "visible"
                : "hidden",
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
