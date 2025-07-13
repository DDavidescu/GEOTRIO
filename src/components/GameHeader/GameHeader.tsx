// components/GameHeader/GameHeader.tsx
import { Heart, Target, Clock } from "lucide-react";
import "../../styles/componentStyling/gameHeader.css";

type GameHeaderProps = {
  modeName: string;
  lives: number;
  score: number;
  timeLeft?: number;
  heartAnimating?: boolean;
  scoreAnimating?: boolean;
  onHomeClick: () => void;
};

export default function GameHeader({
  modeName,
  lives,
  score,
  timeLeft,
  heartAnimating = false,
  scoreAnimating = false,
  onHomeClick
}: GameHeaderProps) {
  return (
    <div className="game-header">
      <button className="link" onClick={onHomeClick}>
        Home
      </button>

      <h2 className="mode">{modeName}</h2>

      <div className="status">
        <span className={`badge heart ${heartAnimating ? "animated" : ""}`}>
          <Heart size={18} /> {lives}
        </span>

        <span className={`badge score ${scoreAnimating ? "animated" : ""}`}>
          <Target size={18} /> {score}
        </span>

        {timeLeft !== undefined && (
          <span className="badge timer">
            <Clock size={18} /> {timeLeft}s
          </span>
        )}
      </div>
    </div>
  );
}
