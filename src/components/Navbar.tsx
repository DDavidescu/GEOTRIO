import React from "react";
import { Link } from "react-router-dom";
import { Info } from "lucide-react";
import "../styles/componentStyling/navbar.css"

type NavbarProps = {
  userProfile: {
    username: string;
    score: number;
    avatar_url: string;
  } | null;
  onAvatarClick: () => void;
  showAvatarSelector: boolean;
  predefinedAvatars: string[];
  onSelectAvatar: (url: string) => void;
  popupRef: React.RefObject<HTMLDivElement | null>;
};

export default function Navbar({
  userProfile,
  onAvatarClick,
  showAvatarSelector,
  predefinedAvatars,
  onSelectAvatar,
  popupRef
}: NavbarProps) {
  return (
    <div className="navbar-wrapper">
      {showAvatarSelector && <div className="overlay" />}

      <div className="navbar">
        <div className="navbar-left">
          {userProfile ? (
            <div className="user-profile">
              <img
                src={userProfile.avatar_url}
                alt="Avatar"
                className="avatar"
                onClick={onAvatarClick}
              />
              <div>
                <p className="username">{userProfile.username}</p>
                <p className="score">High Score: {userProfile.score}</p>
              </div>
            </div>
          ) : (
            <div style={{ width: "64px" }} />
          )}
        </div>

        <Link to="/info">
          <button className="info-button">
            <Info size={18} strokeWidth={2.5} />
          </button>
        </Link>
      </div>

      {showAvatarSelector && (
        <div className="avatar-popup" ref={popupRef}>
          <div className="avatar-bubble">
            <p className="avatar-box-title">Choose your profile picture</p>
            <div className="avatar-selector">
              {predefinedAvatars.map((url) => (
                <img
                  key={url}
                  src={url}
                  alt="Avatar option"
                  className="avatar option"
                  onClick={() => onSelectAvatar(url)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
