import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import '../../styles/componentStyling/leaderboardPreview.css';

type ScoreRow = {
  score: number
  user_id: string
}

type LeaderboardEntry = {
  username: string
  score: number
  avatar_url: string
}

export default function LeaderboardPreview({ mode }: { mode: string }) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])

  useEffect(() => {
    const fetchPreview = async () => {
      const { data: scores, error } = await supabase
        .from('scores')
        .select('score, user_id')
        .eq('mode', mode)

      if (!scores || error) return

      const bestByUser = new Map<string, ScoreRow>()
      scores.forEach((row) => {
        const existing = bestByUser.get(row.user_id)
        if (!existing || row.score > existing.score) {
          bestByUser.set(row.user_id, row)
        }
      })

      let topScores = Array.from(bestByUser.values())
      topScores.sort((a, b) => b.score - a.score)
      topScores = topScores.slice(0, 3)

      const userIds = topScores.map((row) => row.user_id)
      const { data: users } = await supabase
        .from('users')
        .select('id, username, avatar_url')
        .in('id', userIds)

      const userMap = new Map(users?.map((u) => [u.id, { username: u.username, avatar_url: u.avatar_url }]))

      const result = topScores.map((row) => {
        const user = userMap.get(row.user_id)
        return {
          score: row.score,
          username: user?.username || 'Anonymous',
          avatar_url: user?.avatar_url || 'assets/smiling_globe_profilePicture.png'
        }
      })

      setEntries(result)
    }

    fetchPreview()
  }, [mode])

  return (
    <div className="leaderboard-list">
      {entries.length === 0 ? (
        <p className="text-gray-500 text-center">No scores yet.</p>
      ) : (
        entries.map((entry, idx) => (
          <div key={idx} className="leaderboard-preview-row">
            <img
              src={entry.avatar_url}
              alt={entry.username}
              className="avatar-image"
            />
              <div className="leaderboard-text">
                <span className="leaderboard-position">{idx + 1}.</span>
                <span className="leaderboard-name">{entry.username}</span>
                <span className="leaderboard-score">{entry.score}</span>
              </div>
          </div>
        ))
      )}
    </div>
  )
}
