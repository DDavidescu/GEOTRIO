// components/GameHeader/GameHeader.tsx
import { Heart, Target } from "lucide-react";
import "../../styles/componentStyling/gameHeader.css"; 

type GameHeaderProps = {
  modeName: string;
  lives: number;
  score: number;
  heartAnimating?: boolean;
  scoreAnimating?: boolean;
  onHomeClick: () => void;
};

export default function GameHeader({
  modeName,
  lives,
  score,
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
      </div>
    </div>
  );
}
