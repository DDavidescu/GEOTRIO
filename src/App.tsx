import { Routes, Route } from "react-router-dom"
import Home from "@/pages/Home"
import Game from "@/pages/Capital-to-Country"
import Leaderboard from "@/pages/Leaderboard"
import Info from "@/pages/Info"
import FeedbackForm from "./pages/FeedbackForm"

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/info" element={<Info />} />
        <Route path="/feedback" element={<FeedbackForm />} />
      </Routes>
  )
}

export default App
