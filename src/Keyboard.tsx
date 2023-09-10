const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const Keyboard = () => {
  return (
    <div className="keyboard-container">
      {KEYS.map((key) => {
        return (
          <button key={key} className={`keyboard-btn`}>
            {key}
          </button>
        );
      })}
    </div>
  );
};

export default Keyboard;
