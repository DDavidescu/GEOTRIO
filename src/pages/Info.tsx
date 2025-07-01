import "../styles/info.css";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const InfoPage = () => {
  return (
    <div className="info-page">
      <div className="info-top-bar">
        <Link to="/" className="home-link-button">Home</Link>
        <h1 className="info-title">GEOTRIO</h1>
      </div>

      <div className="info-content">
        <section className="info-section">
          <h2>About This Game</h2>
          <p>
            GeoTrio is a fast-paced, web-based geography quiz game where you test your knowledge
            of countries, capitals, and flags across three game modes. It's built for speed,
            fun, and a challenge to your memory.
          </p>
        </section>

        <section className="info-section">
          <h2>How to Play</h2>
          <ul>
            <li>🎯 Choose a game mode: Capital → Country, In progress, In progress</li>
            <li>❤️ You start with 3 lives — one mistake costs a life</li>
            <li>🛑 The game ends when all lives are lost</li>
            <li>🏆 Scores are saved if you're logged in</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>Accounts & Leaderboards</h2>
          <p>
            You can play as a guest or sign up with email. Only logged-in players have
            scores saved and ranked. Leaderboards track top players per mode.
          </p>
        </section>

        <section className="info-section">
          <h2>Credits</h2>
          <p>
            This game was designed and developed entirely by <strong>Bau David</strong>.
          </p>
          <p className="info-subtext">
            Built with React, Vite, TypeScript, Supabase, Formspree, Tailwind and vanilla CSS.
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default InfoPage;
