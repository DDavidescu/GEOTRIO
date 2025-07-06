import "../styles/game.css";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useUser } from "../context/UserContext";
import GameHeader from "../components/GameHeader/GameHeader";
import LeaveWarningModal from "../components/GameHeader/LeaveWarningModal";
import GameOverScreen from "../components/GameOverScreen/GameOverScreen";
import Footer from "../components/Footer";

import CapitalToCountry from "../pages/gameModes/Capital-to-Country";

type DifficultyType = "Easy" | "Normal" | "Hard";

export default function Game() {
  const { mode } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [showLeaveWarning, setShowLeaveWarning] = useState(false);

  const [heartAnimating, setHeartAnimating] = useState(false);
  const [scoreAnimating, setScoreAnimating] = useState(false);

  // ✅ NEW: Get difficulty from URL param
  const query = new URLSearchParams(location.search);
  const difficultyParam = (query.get("difficulty") as DifficultyType) || "Easy";

  const saveScore = async () => {
    if (!user) return;
    const gameMode = mode || "default";
    const { error } = await supabase
      .from("scores")
      .insert({
        user_id: user.id,
        mode: gameMode,
        score
      });
    if (error) console.error("Error saving score:", error.message);
  };

  useEffect(() => {
    if (lives <= 0) {
      saveScore();
      setGameOver(true);
    }
  }, [lives]);

  const handleAnswer = (correct: boolean) => {
    if (gameOver) return;

    if (correct) {
      setScore((prev) => prev + 1);
      setScoreAnimating(true);
      setTimeout(() => setScoreAnimating(false), 500);
    } else {
      setLives((prev) => prev - 1);
      setHeartAnimating(true);
      setTimeout(() => setHeartAnimating(false), 500);
    }
  };

  const restartGame = () => {
    setScore(0);
    setLives(3);
    setGameOver(false);
    navigate(`/game/${mode}?difficulty=${difficultyParam}`);
  };

  const handleHomeClick = () => {
    if (!gameOver) setShowLeaveWarning(true);
    else navigate("/");
  };

  const handleLeaveConfirm = () => navigate("/");
  const handleLeaveCancel = () => setShowLeaveWarning(false);

  let ModeComponent;
  let modeName;

  switch (mode) {
    case "capital-to-country":
      ModeComponent = CapitalToCountry;
      modeName = "Match Capital to Country";
      break;
    default:
      return <div className="game-container">Invalid game mode selected.</div>;
  }

  return (
    <div className="game-container">
      <div className="game-wrapper">
        <GameHeader
          modeName={modeName}
          lives={lives}
          score={score}
          heartAnimating={heartAnimating}
          scoreAnimating={scoreAnimating}
          onHomeClick={handleHomeClick}
        />

        <div className="game-body">
          {gameOver ? (
            <GameOverScreen
              score={score}
              onRestart={restartGame}
              onHome={() => navigate("/")}
              user={user}
              mode={mode || ""}
            />
          ) : (
            <ModeComponent
              onAnswer={handleAnswer}
              gameOver={gameOver}
              difficulty={difficultyParam}
            />
          )}
        </div>
      </div>

      <LeaveWarningModal
        visible={showLeaveWarning}
        onCancel={handleLeaveCancel}
        onConfirm={handleLeaveConfirm}
      />

      <Footer />
    </div>
  );
}
