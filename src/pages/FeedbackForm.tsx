import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Footer from "../components/Footer";
import "../styles/feedback.css";

export default function FeedbackForm() {
  const navigate = useNavigate();
  const { user } = useUser();

  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const userEmail = user?.email || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch("https://formspree.io/f/xovwryqw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          name,
          message: feedback
        }),
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting feedback:", err);
      alert("Something went wrong. Please try again!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="feedback-page">
      <button className="home-button" onClick={() => navigate("/")}>
        Home
      </button>

      <h1 className="feedback-geotrio-title">GEOTRIO</h1>

      <div className="feedback-container">
        {!submitted && (
          <h2 className="feedback-title">Share Your Feedback</h2>
        )}

        {submitted ? (
          <div className="feedback-thankyou">
            <p>💌 Thanks a ton for sending your feedback!</p>
            <p>Your feedback means a lot and helps me keep making Geotrio better for explorers like you.</p>
            <button className="feedback-back-button" onClick={() => navigate("/")}>
              Back to Home
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="feedback-form">
            <label>Email</label>
            <input
              type="email"
              value={userEmail}
              disabled
              className="input-disabled"
            />

            <label>Name <span className="optional">(optional)</span></label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Your Feedback</label>
            <textarea
              required
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <button type="submit" className="submit-button" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}
      </div>

      <Footer />
    </div>
  );
}
