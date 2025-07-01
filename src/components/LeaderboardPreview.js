import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
export default function LeaderboardPreview({ mode }) {
    const [entries, setEntries] = useState([]);
    useEffect(() => {
        const fetchPreview = async () => {
            const { data: scores, error } = await supabase
                .from('scores')
                .select('score, user_id')
                .eq('mode', mode);
            if (!scores || error)
                return;
            const bestByUser = new Map();
            scores.forEach((row) => {
                const existing = bestByUser.get(row.user_id);
                if (!existing || row.score > existing.score) {
                    bestByUser.set(row.user_id, row);
                }
            });
            let topScores = Array.from(bestByUser.values());
            topScores.sort((a, b) => b.score - a.score);
            topScores = topScores.slice(0, 3);
            const userIds = topScores.map((row) => row.user_id);
            const { data: users } = await supabase
                .from('users')
                .select('id, username')
                .in('id', userIds);
            const userMap = new Map(users?.map((u) => [u.id, u.username]));
            const result = topScores.map((row) => ({
                score: row.score,
                username: userMap.get(row.user_id) || 'Anonymous',
            }));
            setEntries(result);
        };
        fetchPreview();
    }, [mode]);
    return (_jsx("div", { className: "leaderboard-list", children: entries.length === 0 ? (_jsx("p", { className: "text-gray-500 text-center", children: "No scores yet." })) : (entries.map((entry, idx) => (_jsxs("div", { className: "leaderboard-row", children: [_jsxs("span", { children: [idx + 1, "."] }), _jsx("span", { children: entry.username }), _jsx("span", { children: entry.score })] }, idx)))) }));
}
