import LeaderboardPreview from "../Leaderboard/LeaderboardPreview";
import "../../styles/componentStyling/gameOverScreen.css";
import { useNavigate } from "react-router-dom";

type GameOverScreenProps = {
  score: number;
  onRestart: () => void;
  onHome: () => void;
  user: any;
  mode: string;
};

export default function GameOverScreen({
  score,
  onRestart,
  onHome,
  user,
  mode
}: GameOverScreenProps) {
  // ✅ HOOK MUST BE HERE INSIDE FUNCTION
  const navigate = useNavigate();

  return (
    <div className="game-over-overlay">
      <div className="game-over-modal">
        <h2 className="game-over-title">Game Over</h2>
        <p className="final-score">Your score: {score}</p>
        <div className="actions">
          <button onClick={onRestart} className="btn primary">Play Again</button>
          <button onClick={onHome} className="btn secondary">Back to Home</button>
        </div>

        {user ? (
          <>
            <div className="gameover-leaderboard">
              <div className="leaderboard-title">Top Explorers</div>
              <LeaderboardPreview mode={mode} />
              <button
                className="btn-tertiary"
                onClick={onHome}
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
  );
}
