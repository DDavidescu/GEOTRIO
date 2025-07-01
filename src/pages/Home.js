import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "../styles/home.css";
import Globe from "globe.gl";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";
function EarthGlobe() {
    const globeRef = useRef(null);
    useEffect(() => {
        if (globeRef.current) {
            const globe = new Globe(globeRef.current)
                .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
                .backgroundColor('rgba(0, 0, 0, 0)')
                .width(300)
                .height(300);
            globe.controls().autoRotate = true;
            globe.controls().autoRotateSpeed = 3;
            globe.controls().enableZoom = false;
        }
    }, []);
    return _jsx("div", { className: "globe-canvas", ref: globeRef });
}
export default function Home() {
    const [topPlayers, setTopPlayers] = useState([]);
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [showAvatarSelector, setShowAvatarSelector] = useState(false);
    const [, setLoading] = useState(true);
    const [showAuth, setShowAuth] = useState(false);
    const [showGameModeModal, setShowGameModeModal] = useState(false);
    const predefinedAvatars = [
        "src/assets/smiling_globe_profilePicture.png",
        "src/assets/compass_profilePicture.png",
        "src/assets/airplane_profilePicture.png",
        "src/assets/cactus_profilePicture.png",
        "src/assets/statue_profilePicture.png",
        "src/assets/oldmap_profilePicture.png"
    ];
    useEffect(() => {
        const fetchTopScores = async () => {
            const { data: scores, error } = await supabase
                .from("scores")
                .select("score, user_id")
                .order("score", { ascending: false })
                .limit(3);
            if (!scores || error)
                return;
            const userIds = scores.map(s => s.user_id);
            const { data: users } = await supabase
                .from("users")
                .select("id, username")
                .in("id", userIds);
            const enriched = scores.map(score => {
                const match = users?.find(u => u.id === score.user_id);
                return {
                    username: match?.username || "Unknown",
                    score: score.score
                };
            });
            setTopPlayers(enriched);
        };
        fetchTopScores();
    }, []);
    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user: rawUser }, error } = await supabase.auth.getUser();
            if (!rawUser || error) {
                setLoading(false);
                return;
            }
            setUser(rawUser);
            const { data: existingProfile } = await supabase
                .from("users")
                .select("id")
                .eq("id", rawUser.id)
                .maybeSingle();
            if (!existingProfile) {
                await supabase.from("users").insert({
                    id: rawUser.id,
                    username: rawUser.user_metadata?.username || rawUser.email?.split("@")[0]
                });
            }
            const { data: scores } = await supabase
                .from("scores")
                .select("score")
                .eq("user_id", rawUser.id)
                .order("score", { ascending: false })
                .limit(1);
            const { data: profileData } = await supabase
                .from("users")
                .select("username, avatar_url")
                .eq("id", rawUser.id)
                .single();
            if (profileData) {
                let avatarUrl = profileData.avatar_url || predefinedAvatars[0];
                if (!profileData.avatar_url) {
                    await supabase.from("users").update({ avatar_url: avatarUrl }).eq("id", rawUser.id);
                }
                setUserProfile({
                    username: profileData.username,
                    score: scores?.[0]?.score || 0,
                    avatar_url: avatarUrl
                });
            }
            setLoading(false);
        };
        fetchUser();
    }, []);
    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setUserProfile(null);
    };
    const popupRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowAvatarSelector(false);
            }
        }
        if (showAvatarSelector) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showAvatarSelector]);
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "home-page", children: [_jsx(Navbar, { userProfile: userProfile, onAvatarClick: () => setShowAvatarSelector(!showAvatarSelector), showAvatarSelector: showAvatarSelector, predefinedAvatars: predefinedAvatars, onSelectAvatar: async (url) => {
                        if (!user)
                            return;
                        await supabase.from("users").update({ avatar_url: url }).eq("id", user.id);
                        setUserProfile((prev) => prev ? { ...prev, avatar_url: url } : prev);
                        setShowAvatarSelector(false);
                    }, popupRef: popupRef }), _jsxs("div", { className: "home-container", children: [_jsxs("div", { className: "logo-wrapper", children: [_jsx("div", { className: "logo-text", children: "GEOTRIO" }), _jsx("p", { className: "tagline", children: "Test your world knowledge. Play. Climb. Dominate the globe." }), _jsx(EarthGlobe, {})] }), user ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "buttons", children: [_jsx("button", { className: "primary", onClick: () => setShowGameModeModal(true), children: "Start Game" }), _jsx("button", { className: "secondary", onClick: handleLogout, children: "Logout" })] }), _jsxs("div", { className: "leaderboard", children: [_jsx("div", { className: "leaderboard-title", children: "Top Explorers" }), topPlayers.length === 0 ? (_jsx("p", { style: { color: "#999" }, children: "No scores available" })) : (_jsx("div", { className: "leaderboard-list", children: topPlayers.map((player, i) => (_jsxs("div", { className: "leaderboard-row", children: [_jsxs("span", { children: [i + 1, "."] }), _jsx("span", { children: player.username }), _jsx("span", { children: player.score })] }, i))) })), _jsx(Link, { to: "/leaderboard", children: _jsx("button", { className: "btn-tertiary", children: "View full leaderboard" }) })] })] })) : (_jsxs("div", { className: "login-reminder", children: [_jsxs("div", { className: "login-message", children: [_jsxs("div", { className: "login-line1", children: [_jsx("span", { role: "img", "aria-label": "rocket", children: "\uD83D\uDE80" }), "Want to see how you rank?"] }), _jsxs("div", { className: "login-line2", children: [_jsx("strong", { children: "Log in to unlock access" }), " to the leaderboard and view high scores from top explorers!"] })] }), _jsxs("div", { className: "buttons", children: [_jsx("button", { className: "primary", onClick: () => setShowGameModeModal(true), children: "Play as Guest" }), _jsx("button", { className: "primary", onClick: () => setShowAuth(true), children: "Login" })] })] })), showAuth && (_jsx(AuthModal, { onClose: () => setShowAuth(false), onAuthSuccess: () => {
                                setShowAuth(false);
                                window.location.reload();
                            } })), showGameModeModal && (_jsx("div", { className: "gamemode-modal-overlay", children: _jsxs("div", { className: "gamemode-modal", children: [_jsx("button", { className: "back-button", onClick: () => setShowGameModeModal(false), "aria-label": "Back", children: "\u2190" }), _jsx("h2", { children: "Select Game Mode" }), _jsxs("div", { className: "gamemode-list", children: [_jsxs("div", { className: "gamemode-item", children: [_jsx("h3", { children: "Capital to Country" }), _jsx("p", { className: "gamemode-description", children: "Given a capital city, choose its correct country" }), _jsx(Link, { to: "/game", children: _jsx("button", { className: "primary", onClick: () => setShowGameModeModal(false), children: "Start Game" }) })] }), _jsxs("div", { className: "gamemode-item", children: [_jsx("h3", { children: "In progress" }), _jsx("p", { className: "gamemode-description", children: "Coming soon: a new challenging mode" }), _jsx("button", { className: "disabled", disabled: true, children: "Coming Soon" })] }), _jsxs("div", { className: "gamemode-item", children: [_jsx("h3", { children: "In progress" }), _jsx("p", { className: "gamemode-description", children: "Coming soon: more ways to test your knowledge" }), _jsx("button", { className: "disabled", disabled: true, children: "Coming Soon" })] })] })] }) }))] }), _jsx(Footer, {})] }) }));
}
