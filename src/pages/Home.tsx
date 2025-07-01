import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "../styles/home.css";
import Globe from "globe.gl";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";

type UserProfile = {
  username: string;
  score: number;
  avatar_url: string;
};

type UserType = {
  id: string;
  email?: string;
  user_metadata?: { username?: string };
};

function EarthGlobe() {
  const globeRef = useRef<HTMLDivElement>(null);
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
  return <div className="globe-canvas" ref={globeRef} />;
}

export default function Home() {
  const [topPlayers, setTopPlayers] = useState<{ username: string; score: number }[]>([]);
  const [user, setUser] = useState<UserType | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [showGameModeModal, setShowGameModeModal] = useState(false);

  const predefinedAvatars = [
    "assets/smiling_globe_profilePicture.png",
    "assets/compass_profilePicture.png",
    "assets/airplane_profilePicture.png",
    "assets/cactus_profilePicture.png",
    "assets/statue_profilePicture.png",
    "assets/oldmap_profilePicture.png"
  ];

  useEffect(() => {
    const fetchTopScores = async () => {
      const { data: scores, error } = await supabase
        .from("scores")
        .select("score, user_id")
        .order("score", { ascending: false })
        .limit(3);

      if (!scores || error) return;

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

  const popupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
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

  return (
    <>
      <div className="home-page">
        <Navbar
          userProfile={userProfile}
          onAvatarClick={() => setShowAvatarSelector(!showAvatarSelector)}
          showAvatarSelector={showAvatarSelector}
          predefinedAvatars={predefinedAvatars}
          onSelectAvatar={async (url) => {
            if (!user) return;
            await supabase.from("users").update({ avatar_url: url }).eq("id", user.id);
            setUserProfile((prev) => prev ? { ...prev, avatar_url: url } : prev);
            setShowAvatarSelector(false);
          }}
          popupRef={popupRef}
        />

        <div className="home-container">
          <div className="logo-wrapper">
            <div className="logo-text">GEOTRIO</div>
            <p className="tagline">Test your world knowledge. Play. Climb. Dominate the globe.</p>
            <EarthGlobe />
          </div>

          {user ? (
            <>
              <div className="buttons">
                <button className="primary" onClick={() => setShowGameModeModal(true)}>Start Game</button>
                <button className="secondary" onClick={handleLogout}>Logout</button>
              </div>

              <div className="leaderboard">
                <div className="leaderboard-title">Top Explorers</div>
                {topPlayers.length === 0 ? (
                  <p style={{ color: "#999" }}>No scores available</p>
                ) : (
                  <div className="leaderboard-list">
                    {topPlayers.map((player, i) => (
                      <div key={i} className="leaderboard-row">
                        <span>{i + 1}.</span>
                        <span>{player.username}</span>
                        <span>{player.score}</span>
                      </div>
                    ))}
                  </div>
                )}
                <Link to="/leaderboard">
                  <button className="btn-tertiary">View full leaderboard</button>
                </Link>
              </div>
            </>
          ) : (
            <div className="login-reminder">
              <div className="login-message">
                <div className="login-line1">
                  <span role="img" aria-label="rocket">🚀</span>
                  Want to see how you rank?
                </div>
                <div className="login-line2">
                  <strong>Log in to unlock access</strong> to the leaderboard and view high scores from top explorers!
                </div>
              </div>

              <div className="buttons">
                <button className="primary" onClick={() => setShowGameModeModal(true)}>Play as Guest</button>
                <button className="primary" onClick={() => setShowAuth(true)}>Login</button>
              </div>
            </div>
          )}

          {showAuth && (
            <AuthModal
              onClose={() => setShowAuth(false)}
              onAuthSuccess={() => {
                setShowAuth(false);
                window.location.reload();
              }}
            />
          )}

          {showGameModeModal && (
            <div className="gamemode-modal-overlay">
              <div className="gamemode-modal">
                <button className="back-button" onClick={() => setShowGameModeModal(false)} aria-label="Back">
                  ←
                </button>
                <h2>Select Game Mode</h2>
                <div className="gamemode-list">
                  <div className="gamemode-item">
                    <h3>Capital to Country</h3>
                    <p className="gamemode-description">Given a capital city, choose its correct country</p>
                    <Link to="/game">
                      <button className="primary" onClick={() => setShowGameModeModal(false)}>Start Game</button>
                    </Link>
                  </div>
                  <div className="gamemode-item">
                    <h3>In progress</h3>
                    <p className="gamemode-description">Coming soon: a new challenging mode</p>
                    <button className="disabled" disabled>Coming Soon</button>
                  </div>
                  <div className="gamemode-item">
                    <h3>In progress</h3>
                    <p className="gamemode-description">Coming soon: more ways to test your knowledge</p>
                    <button className="disabled" disabled>Coming Soon</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
