import { useEffect, useState } from "react";
import { countryCapitalPairs } from "../../data/countryCapitalPairs";
import "../../styles/game.css";

type DifficultyType = "Easy" | "Normal" | "Hard";

type GameModeProps = {
  onAnswer: (correct: boolean) => void;
  gameOver: boolean;
  difficulty: DifficultyType;
};

export default function CapitalToCountry({ onAnswer, gameOver, difficulty }: GameModeProps) {
  const [capital, setCapital] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [recentQuestions, setRecentQuestions] = useState<string[]>([]);

  const updateRecentQuestions = (newCapital: string) => {
    setRecentQuestions((prev) => {
      const updated = [newCapital, ...prev];
      return updated.slice(0, 5);
    });
  };

  const generateQuestion = () => {
    if (!countryCapitalPairs || countryCapitalPairs.length === 0) return;

    let pair;
    do {
      pair = countryCapitalPairs[Math.floor(Math.random() * countryCapitalPairs.length)];
    } while (recentQuestions.includes(pair.capital) && countryCapitalPairs.length > 5);

    setCapital(pair.capital);
    setCorrectAnswer(pair.country);
    updateRecentQuestions(pair.capital);

    let filteredOptions = countryCapitalPairs.filter(p => p.country !== pair.country);

    if (difficulty === "Normal") {
      filteredOptions = filteredOptions.filter(p => p.continent === pair.continent);
    } else if (difficulty === "Hard") {
      let neighborOptions: typeof countryCapitalPairs = [];
      let regionOptions: typeof countryCapitalPairs = [];
      let continentOptions: typeof countryCapitalPairs = [];

      // Neighbors
      if (pair.neighbors && pair.neighbors.length > 0) {
        neighborOptions = countryCapitalPairs.filter(
          p => p.country !== pair.country && pair.neighbors?.includes(p.country)
        );
      }

      // Region
      if (pair.region) {
        regionOptions = countryCapitalPairs.filter(
          p => p.country !== pair.country && p.region === pair.region
        );
      }

      // Continent
      continentOptions = countryCapitalPairs.filter(
        p => p.country !== pair.country && p.continent === pair.continent
      );

      // Combine all
      filteredOptions = [
        ...neighborOptions,
        ...regionOptions,
        ...continentOptions
      ];

      // Deduplicate by country
      const uniqueCountries = new Map();
      for (const option of filteredOptions) {
        uniqueCountries.set(option.country, option);
      }
      filteredOptions = Array.from(uniqueCountries.values());
    }

    let wrongOptions = filteredOptions
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(p => p.country);

    while (wrongOptions.length < 3) {
      const filler = filteredOptions[Math.floor(Math.random() * filteredOptions.length)];
      if (filler && !wrongOptions.includes(filler.country)) {
        wrongOptions.push(filler.country);
      }
    }

    const allOptions = [...wrongOptions, pair.country].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
  };

  useEffect(() => {
    generateQuestion();
  }, [difficulty]);

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
