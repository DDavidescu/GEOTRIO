import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "../styles/home.css";
import Globe from "globe.gl";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";
import LeaderboardPreview from "../components/Leaderboard/LeaderboardPreview";
import GameModeModal from "../components/GamemodeModal/GamemodeModal";
import "../styles/componentStyling/navbar.css"

type DifficultyType = "Easy" | "Normal" | "Hard";

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
  const navigate = useNavigate();

  const [user, setUser] = useState<UserType | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [showGameModeModal, setShowGameModeModal] = useState(false);

  const [difficulty, setDifficulty] = useState<DifficultyType>("Easy");

  const predefinedAvatars = [
    "assets/smiling_globe_profilePicture.png",
    "assets/compass_profilePicture.png",
    "assets/airplane_profilePicture.png",
    "assets/cactus_profilePicture.png",
    "assets/statue_profilePicture.png",
    "assets/oldmap_profilePicture.png"
  ];

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
          username: rawUser.user_metadata?.username || rawUser.email?.split("@")[0],
          avatar_url: predefinedAvatars[0]
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
        setUserProfile({
          username: profileData.username,
          score: scores?.[0]?.score || 0,
          avatar_url: profileData.avatar_url || predefinedAvatars[0]
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

  // ✅ Separate handlers for modal
  const handleModalDismiss = () => {
    setShowGameModeModal(false);
  };

  const handleStartGame = () => {
    setShowGameModeModal(false);
    navigate(`/game/capital-to-country?difficulty=${difficulty}`);
  };

  return (
    <>
      <div className="home-page">
        <Navbar
          userProfile={userProfile}
          onAvatarClick={() => setShowAvatarSelector(!showAvatarSelector)}
          showAvatarSelector={showAvatarSelector}
          predefinedAvatars={predefinedAvatars}
          onSelectAvatar={async (url) => {
            if (!user) {
              alert("Please log in first!");
              return;
            }
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
                <LeaderboardPreview mode="capital-to-country" />
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

          <GameModeModal
            visible={showGameModeModal}
            onClose={handleModalDismiss}
            onStart={handleStartGame}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}
