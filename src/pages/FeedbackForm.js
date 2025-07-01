import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    const handleSubmit = async (e) => {
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
        }
        catch (err) {
            console.error("Error submitting feedback:", err);
            alert("Something went wrong. Please try again!");
        }
        finally {
            setSubmitting(false);
        }
    };
    return (_jsxs("div", { className: "feedback-page", children: [_jsx("button", { className: "home-button", onClick: () => navigate("/"), children: "Home" }), _jsx("h1", { className: "feedback-geotrio-title", children: "GEOTRIO" }), _jsxs("div", { className: "feedback-container", children: [!submitted && (_jsx("h2", { className: "feedback-title", children: "Share Your Feedback" })), submitted ? (_jsxs("div", { className: "feedback-thankyou", children: [_jsx("p", { children: "\uD83D\uDC8C Thanks a ton for sending your feedback!" }), _jsx("p", { children: "Your feedback means a lot and helps me keep making Geotrio better for explorers like you." }), _jsx("button", { className: "feedback-back-button", onClick: () => navigate("/"), children: "Back to Home" })] })) : (_jsxs("form", { onSubmit: handleSubmit, className: "feedback-form", children: [_jsx("label", { children: "Email" }), _jsx("input", { type: "email", value: userEmail, disabled: true, className: "input-disabled" }), _jsxs("label", { children: ["Name ", _jsx("span", { className: "optional", children: "(optional)" })] }), _jsx("input", { type: "text", placeholder: "Your name", value: name, onChange: (e) => setName(e.target.value) }), _jsx("label", { children: "Your Feedback" }), _jsx("textarea", { required: true, placeholder: "Write your feedback here...", value: feedback, onChange: (e) => setFeedback(e.target.value) }), _jsx("button", { type: "submit", className: "submit-button", disabled: submitting, children: submitting ? "Submitting..." : "Submit" })] }))] }), _jsx(Footer, {})] }));
}
