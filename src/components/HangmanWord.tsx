import { useAtom } from "jotai";
import { loserAtom, winnerAtom } from "../atom/atom";

type HangmanWordProps = {
  guessedLetters: string[];
  wordToGuess: string;
};
const HangmanWord = ({ guessedLetters, wordToGuess }: HangmanWordProps) => {
  const [loser] = useAtom(loserAtom);
  const [winner] = useAtom(winnerAtom);

  return (
    <div className="word-container">
      {wordToGuess.split("").map((letter, index) => (
        <span className="letter-container" key={index}>
          <span
            style={{
              visibility:
                guessedLetters.includes(letter) || loser ? "visible" : "hidden",
              color:
                !guessedLetters.includes(letter) && loser
                  ? "red"
                  : winner
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
