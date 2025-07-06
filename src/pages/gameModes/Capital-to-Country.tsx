import { useEffect, useState } from "react";
import { countryCapitalPairs } from "../../data/countryCapitalPairs";
import "../../styles/game.css";

type GameModeProps = {
  onAnswer: (correct: boolean) => void;
  gameOver: boolean;
};

export default function CapitalToCountry({ onAnswer, gameOver }: GameModeProps) {
  const [capital, setCapital] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const generateQuestion = () => {
    const pair = countryCapitalPairs[Math.floor(Math.random() * countryCapitalPairs.length)];
    setCapital(pair.capital);
    setCorrectAnswer(pair.country);

    const wrongOptions = countryCapitalPairs
      .filter(p => p.country !== pair.country)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(p => p.country);

    setOptions([...wrongOptions, pair.country].sort(() => 0.5 - Math.random()));
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleOptionClick = (selected: string) => {
    if (gameOver) return;
    onAnswer(selected === correctAnswer);
    generateQuestion();
  };

  return (
    <>
      <div className="question-box">
        Which country has the capital <span className="highlight">{capital}</span>?
      </div>
      <div className="options-grid">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            className="option-btn"
            disabled={gameOver}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );
}
