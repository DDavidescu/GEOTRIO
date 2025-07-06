import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

type ScoreRow = {
  score: number
  user_id: string
}

export default function LeaderboardPreview({ mode }: { mode: string }) {
  const [entries, setEntries] = useState<{ username: string; score: number }[]>([])

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
        .select('id, username')
        .in('id', userIds)

      const userMap = new Map(users?.map((u) => [u.id, u.username]))

      const result = topScores.map((row) => ({
        score: row.score,
        username: userMap.get(row.user_id) || 'Anonymous',
      }))

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
          <div key={idx} className="leaderboard-row">
            <span>{idx + 1}.</span>
            <span>{entry.username}</span>
            <span>{entry.score}</span>
          </div>
        ))
      )}
    </div>
  )
}
