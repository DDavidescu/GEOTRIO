import { useEffect } from "react";
import { Listbox } from "@headlessui/react";
import "../../styles/componentStyling/gamemodeModal.css";

type DifficultyType = "Easy" | "Normal" | "Hard";

type GameModeModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelectAndStart: (mode: string) => void;
  difficulty: DifficultyType;
  setDifficulty: (difficulty: DifficultyType) => void;
};

export default function GameModeModal({
  visible,
  onClose,
  onSelectAndStart,
  difficulty,
  setDifficulty
}: GameModeModalProps) {
  const difficultyOptions: DifficultyType[] = ["Easy", "Normal", "Hard"];

  useEffect(() => {
    if (visible) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="gamemode-modal-overlay">
      <div className="gamemode-modal">
        <button className="back-button" onClick={onClose} aria-label="Back">
          ←
        </button>
        <h2>Select Game Mode</h2>
        <div className="gamemode-list">
          <div className="gamemode-item">
            <h3>Capital to Country</h3>
            <div className="difficulty-select">
              <label className="difficulty-label">Difficulty:</label>
              <Listbox
                value={difficulty}
                onChange={(value: DifficultyType) => setDifficulty(value)}
              >
                <div className="listbox-container">
                  <Listbox.Button className="listbox-button">
                    {difficulty}
                  </Listbox.Button>
                  <Listbox.Options className="listbox-options">
                    {difficultyOptions.map((option) => (
                      <Listbox.Option
                        key={option}
                        value={option}
                        className={({ active }) =>
                          `listbox-option${active ? " active" : ""}`
                        }
                      >
                        {option}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
            <p className="gamemode-description">
              Given a capital city, choose its correct country
            </p>
            <button
              className="primary"
              onClick={() => onSelectAndStart("capital-to-country")}
            >
              Start Game
            </button>
          </div>

          <div className="gamemode-item">
            <h3>Counter Time Challenge</h3>
            <p className="gamemode-description">
              90 seconds to get as many correct answers as possible. 3 lives only!
            </p>
            <button
              className="primary"
              onClick={() => onSelectAndStart("counter-time")}
            >
              Start Game
            </button>
          </div>

          <div className="gamemode-item">
            <h3>In progress</h3>
            <p className="gamemode-description">
              Coming soon: more ways to test your knowledge
            </p>
            <button className="disabled" disabled>
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
