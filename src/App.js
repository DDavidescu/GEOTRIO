import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Game from "@/pages/Capital-to-Country";
import Leaderboard from "@/pages/Leaderboard";
import Info from "@/pages/Info";
import FeedbackForm from "./pages/FeedbackForm";
function App() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/game", element: _jsx(Game, {}) }), _jsx(Route, { path: "/leaderboard", element: _jsx(Leaderboard, {}) }), _jsx(Route, { path: "/info", element: _jsx(Info, {}) }), _jsx(Route, { path: "/feedback", element: _jsx(FeedbackForm, {}) })] }));
}
export default App;
