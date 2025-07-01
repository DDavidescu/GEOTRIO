import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import "../styles/game.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useUser } from "../context/UserContext";
import LeaderboardPreview from "../components/LeaderboardPreview";
import Footer from "../components/Footer";
import { Heart, Target } from "lucide-react";
const countryCapitalPairs = [
    { country: "Germany", capital: "Berlin" },
    { country: "France", capital: "Paris" },
    { country: "Italy", capital: "Rome" },
    { country: "Spain", capital: "Madrid" },
    { country: "Austria", capital: "Vienna" },
    { country: "Greece", capital: "Athens" },
    { country: "Portugal", capital: "Lisbon" }
];
export default function Game() {
    const { mode } = useParams();
    const navigate = useNavigate();
    const { user } = useUser();
    const [capital, setCapital] = useState("");
    const [options, setOptions] = useState([]);
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
    const handleAnswer = (selected) => {
        if (selected === correctAnswer) {
            setScore(prev => prev + 1);
            setScoreAnimating(true);
            setTimeout(() => setScoreAnimating(false), 500);
        }
        else {
            setLives(prev => prev - 1);
            setHeartAnimating(true);
            setTimeout(() => setHeartAnimating(false), 500);
        }
        generateQuestion();
    };
    const saveScore = async () => {
        if (!user)
            return;
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
    return (_jsxs("div", { className: "game-container", children: [_jsxs("div", { className: "game-wrapper", children: [_jsxs("div", { className: "game-header", children: [_jsx("button", { className: "link", onClick: () => {
                                    if (!gameOver) {
                                        setShowLeaveWarning(true);
                                    }
                                    else {
                                        navigate("/");
                                    }
                                }, children: "Home" }), _jsx("h2", { className: "mode", children: "Match Capital to Country" }), _jsxs("div", { className: "status", children: [_jsxs("span", { className: `badge heart ${heartAnimating ? "animated" : ""}`, children: [_jsx(Heart, { size: 18 }), " ", lives] }), _jsxs("span", { className: `badge score ${scoreAnimating ? "animated" : ""}`, children: [_jsx(Target, { size: 18 }), " ", score] })] })] }), _jsx("div", { className: "game-body", children: gameOver ? (_jsx("div", { className: "game-over-overlay", children: _jsxs("div", { className: "game-over-modal", children: [_jsx("h2", { className: "game-over-title", children: "Game Over" }), _jsxs("p", { className: "final-score", children: ["Your score: ", score] }), _jsxs("div", { className: "actions", children: [_jsx("button", { onClick: restartGame, className: "btn primary", children: "Play Again" }), _jsx("button", { onClick: () => navigate("/"), className: "btn secondary", children: "Back to Home" })] }), user ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "gameover-leaderboard", children: [_jsx("div", { className: "leaderboard-title", children: "Top Explorers" }), _jsx(LeaderboardPreview, { mode: "capital-to-country" }), _jsx("button", { className: "btn-tertiary", onClick: () => navigate("/leaderboard"), children: "View full leaderboard" })] }), _jsxs("div", { className: "gameover-feedback-message", children: ["Enjoying Geotrio? ", _jsx("br", {}), "I'd really appreciate your feedback! ", _jsx("br", {}), _jsx("span", { className: "feedback-link", onClick: () => navigate("/feedback"), children: "\u270D\uFE0F Give Feedback" })] })] })) : (_jsxs("div", { className: "gameover-guest-message", children: [_jsxs("div", { className: "guest-line1", children: [_jsx("span", { role: "img", "aria-label": "rocket", children: "\uD83D\uDE80" }), "Want to see how you rank?"] }), _jsxs("div", { className: "guest-line2", children: [_jsx("strong", { children: "Log in to unlock access" }), " to the leaderboard and view high scores from top explorers!"] })] }))] }) })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "question-box", children: ["Which country has the capital ", _jsx("span", { className: "highlight", children: capital }), "?"] }), _jsx("div", { className: "options-grid", children: options.map((option) => (_jsx("button", { onClick: () => handleAnswer(option), className: "option-btn", children: option }, option))) })] })) })] }), showLeaveWarning && (_jsx("div", { className: "game-overlay-modal", children: _jsxs("div", { className: "game-warning-modal", children: [_jsx("h2", { className: "game-warning-title", children: "\u26A0\uFE0F Are you sure?" }), _jsx("p", { className: "game-warning-text", children: "Your progress will be lost if you leave the game." }), _jsxs("div", { className: "actions", children: [_jsx("button", { className: "btn secondary", onClick: () => setShowLeaveWarning(false), children: "Cancel" }), _jsx("button", { className: "btn danger", onClick: () => navigate("/"), children: "Leave" })] })] }) })), _jsx(Footer, {})] }));
}
