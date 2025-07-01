import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import "../styles/leaderboard.css";
import { Link, useNavigate } from 'react-router-dom'
import { Info } from 'lucide-react'

type ScoreRow = {
  score: number
  mode: string
  user_id: string
}

type Entry = {
  score: number
  mode: string
  username: string
}

export default function Leaderboard() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true)

      const { data: scores, error } = await supabase
        .from('scores')
        .select('score, mode, user_id')

      if (error || !scores) {
        console.error('Error fetching scores:', error)
        setLoading(false)
        return
      }

      const bestByUser = new Map<string, ScoreRow>()
      scores.forEach((row) => {
        const existing = bestByUser.get(row.user_id)
        if (!existing || row.score > existing.score) {
          bestByUser.set(row.user_id, row)
        }
      })

      let topScores = Array.from(bestByUser.values())
      topScores.sort((a, b) => b.score - a.score)
      topScores = topScores.slice(0, 50)

      const userIds = topScores.map(row => row.user_id)
      const { data: users } = await supabase
        .from('users')
        .select('id, username')
        .in('id', userIds)

      const userMap = new Map(users?.map(u => [u.id, u.username]))

      const resolved: Entry[] = topScores.map((row) => ({
        score: row.score,
        mode: row.mode,
        username: userMap.get(row.user_id) || 'Anonymous',
      }))

      setEntries(resolved)
      setLoading(false)
    }

    fetchLeaderboard()
  }, [])

  const podium = entries.slice(0, 3)
  const others = entries.slice(3)

  return (
    <section className="leaderboard-page">
      <div className="leaderboard-top-bar">
        <button className="home-link-button" onClick={() => navigate('/')}>Home</button>
        <Link to="/info">
          <button className="info-button">
            <Info size={20} strokeWidth={2.5} />
          </button>
        </Link>
      </div>

      <h1 className="leaderboard-game-title">GEOTRIO</h1>

      {loading ? (
        <p className="leaderboard-loading">Loading...</p>
      ) : entries.length === 0 ? (
        <p className="leaderboard-loading">No scores yet!</p>
      ) : (
        <>
          <div className="podium-container">
            {podium.length > 0 && (
              <>
                {podium[0] && (
                  <div className="podium-slot first">
                    <div className="medal">🥇</div>
                    <div className="name">{podium[0].username}</div>
                    <div className="score">{podium[0].score}</div>
                  </div>
                )}
                {podium[1] && (
                  <div className="podium-slot second">
                    <div className="medal">🥈</div>
                    <div className="name">{podium[1].username}</div>
                    <div className="score">{podium[1].score}</div>
                  </div>
                )}
                {podium[2] && (
                  <div className="podium-slot third">
                    <div className="medal">🥉</div>
                    <div className="name">{podium[2].username}</div>
                    <div className="score">{podium[2].score}</div>
                  </div>
                )}
              </>
            )}
          </div>

          {others.length > 0 && (
            <div className="leaderboard-table">
              <div className="leaderboard-row leaderboard-header-row">
                <span>Rank</span>
                <span>Username</span>
                <span>Score</span>
              </div>
              {others.map((entry, index) => (
                <div key={index + 3} className="leaderboard-row standard">
                  <span>#{index + 4}</span>
                  <span>{entry.username}</span>
                  <span>{entry.score}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}
