import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import "../styles/leaderboard.css";
import { Link, useNavigate } from 'react-router-dom';
import { Info } from 'lucide-react';
export default function Leaderboard() {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchLeaderboard = async () => {
            setLoading(true);
            const { data: scores, error } = await supabase
                .from('scores')
                .select('score, mode, user_id');
            if (error || !scores) {
                console.error('Error fetching scores:', error);
                setLoading(false);
                return;
            }
            const bestByUser = new Map();
            scores.forEach((row) => {
                const existing = bestByUser.get(row.user_id);
                if (!existing || row.score > existing.score) {
                    bestByUser.set(row.user_id, row);
                }
            });
            let topScores = Array.from(bestByUser.values());
            topScores.sort((a, b) => b.score - a.score);
            topScores = topScores.slice(0, 50);
            const userIds = topScores.map(row => row.user_id);
            const { data: users } = await supabase
                .from('users')
                .select('id, username')
                .in('id', userIds);
            const userMap = new Map(users?.map(u => [u.id, u.username]));
            const resolved = topScores.map((row) => ({
                score: row.score,
                mode: row.mode,
                username: userMap.get(row.user_id) || 'Anonymous',
            }));
            setEntries(resolved);
            setLoading(false);
        };
        fetchLeaderboard();
    }, []);
    const podium = entries.slice(0, 3);
    const others = entries.slice(3);
    return (_jsxs("section", { className: "leaderboard-page", children: [_jsxs("div", { className: "leaderboard-top-bar", children: [_jsx("button", { className: "home-link-button", onClick: () => navigate('/'), children: "Home" }), _jsx(Link, { to: "/info", children: _jsx("button", { className: "info-button", children: _jsx(Info, { size: 20, strokeWidth: 2.5 }) }) })] }), _jsx("h1", { className: "leaderboard-game-title", children: "GEOTRIO" }), loading ? (_jsx("p", { className: "leaderboard-loading", children: "Loading..." })) : entries.length === 0 ? (_jsx("p", { className: "leaderboard-loading", children: "No scores yet!" })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "podium-container", children: podium.length > 0 && (_jsxs(_Fragment, { children: [podium[0] && (_jsxs("div", { className: "podium-slot first", children: [_jsx("div", { className: "medal", children: "\uD83E\uDD47" }), _jsx("div", { className: "name", children: podium[0].username }), _jsx("div", { className: "score", children: podium[0].score })] })), podium[1] && (_jsxs("div", { className: "podium-slot second", children: [_jsx("div", { className: "medal", children: "\uD83E\uDD48" }), _jsx("div", { className: "name", children: podium[1].username }), _jsx("div", { className: "score", children: podium[1].score })] })), podium[2] && (_jsxs("div", { className: "podium-slot third", children: [_jsx("div", { className: "medal", children: "\uD83E\uDD49" }), _jsx("div", { className: "name", children: podium[2].username }), _jsx("div", { className: "score", children: podium[2].score })] }))] })) }), others.length > 0 && (_jsxs("div", { className: "leaderboard-table", children: [_jsxs("div", { className: "leaderboard-row leaderboard-header-row", children: [_jsx("span", { children: "Rank" }), _jsx("span", { children: "Username" }), _jsx("span", { children: "Score" })] }), others.map((entry, index) => (_jsxs("div", { className: "leaderboard-row standard", children: [_jsxs("span", { children: ["#", index + 4] }), _jsx("span", { children: entry.username }), _jsx("span", { children: entry.score })] }, index + 3)))] }))] }))] }));
}
