import "../styles/game.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useUser } from "../context/UserContext";
import LeaderboardPreview from "../components/Leaderboard/LeaderboardPreview";
import Footer from "../components/Footer";
import GameHeader from "../components/GameHeader/GameHeader";
import { countryCapitalPairs } from "../data/countryCapitalPairs";

export default function Game() {
  const { mode } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [capital, setCapital] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [showLeaveWarning, setShowLeaveWarning] = useState(false);

  const [heartAnimating, setHeartAnimating] = useState(false);
  const [scoreAnimating, setScoreAnimating] = useState(false);

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

  const handleAnswer = (selected: string) => {
    if (selected === correctAnswer) {
      setScore(prev => prev + 1);
      setScoreAnimating(true);
      setTimeout(() => setScoreAnimating(false), 500);
    } else {
      setLives(prev => prev - 1);
      setHeartAnimating(true);
      setTimeout(() => setHeartAnimating(false), 500);
    }
    generateQuestion();
  };

  const handleHomeClick = () => {
    if (!gameOver) {
      setShowLeaveWarning(true);
    } else {
      navigate("/");
    }
  };

  const saveScore = async () => {
    if (!user) return;

    const gameMode = mode || "capital-to-country";

    const { error } = await supabase
      .from("scores")
      .insert({
        user_id: user.id,
        mode: gameMode,
        score
      });

    if (error) {
      console.error("Error saving score:", error.message);
    }
  };

  const restartGame = () => {
    setScore(0);
    setLives(3);
    setGameOver(false);
    generateQuestion();
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    if (lives <= 0) {
      saveScore();
      setGameOver(true);
    }
  }, [lives]);

  return (
    <div className="game-container">
      <div className="game-wrapper">
        <GameHeader
          modeName="Match Capital to Country"
          lives={lives}
          score={score}
          heartAnimating={heartAnimating}
          scoreAnimating={scoreAnimating}
          onHomeClick={handleHomeClick}
        />

        <div className="game-body">
          {gameOver ? (
            <div className="game-over-overlay">
              <div className="game-over-modal">
                <h2 className="game-over-title">Game Over</h2>
                <p className="final-score">Your score: {score}</p>
                <div className="actions">
                  <button onClick={restartGame} className="btn primary">Play Again</button>
                  <button onClick={() => navigate("/")} className="btn secondary">Back to Home</button>
                </div>

                {user ? (
                  <>
                    <div className="gameover-leaderboard">
                      <div className="leaderboard-title">Top Explorers</div>
                      <LeaderboardPreview mode="capital-to-country" />
                      <button
                        className="btn-tertiary"
                        onClick={() => navigate("/leaderboard")}
                      >
                        View full leaderboard
                      </button>
                    </div>

                    <div className="gameover-feedback-message">
                      Enjoying GEOTRIO? <br />
                      I'd really appreciate your feedback! <br />
                      <span
                        className="feedback-link"
                        onClick={() => navigate("/feedback")}
                      >
                        ✍️ Give Feedback
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="gameover-guest-message">
                    <div className="guest-line1">
                      <span role="img" aria-label="rocket">🚀</span>
                      Want to see how you rank?
                    </div>
                    <div className="guest-line2">
                      <strong>Log in to unlock access</strong> to the leaderboard and view high scores from top explorers!
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="question-box">
                Which country has the capital <span className="highlight">{capital}</span>?
              </div>
              <div className="options-grid">
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className="option-btn"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {showLeaveWarning && (
        <div className="game-overlay-modal">
          <div className="game-warning-modal">
            <h2 className="game-warning-title">⚠️ Are you sure?</h2>
            <p className="game-warning-text">Your progress will be lost if you leave the game.</p>
            <div className="actions">
              <button className="btn secondary" onClick={() => setShowLeaveWarning(false)}>Cancel</button>
              <button className="btn danger" onClick={() => navigate("/")}>Leave</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
