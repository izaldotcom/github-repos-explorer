
import { GithubUser } from '../api/github'

type Props = {
  users: GithubUser[]
  onPick: (user: GithubUser) => void
  loading?: boolean
  error?: string | null
  selectedLogin?: string | null
}

export default function UserResults({ users, onPick, loading = false, error = null, selectedLogin = null }: Props) {
  return (
    <div className="panel">
      <h2 style={{marginTop: 0}}>Users</h2>
      {error && <div className="error" role="alert">{error}</div>}
      <div className="users">
        {loading && <div className="empty">Loading users…</div>}
        {!loading && users.length === 0 && <div className="empty">No users yet. Try searching above.</div>}
        {users.map(u => (
          <button
            key={u.id}
            className="user-item"
            onClick={() => onPick(u)}
            aria-pressed={selectedLogin === u.login}
          >
            <img className="avatar" src={u.avatar_url} alt={u.login} loading="lazy" />
            <div>
              <div className="username">{u.login}</div>
              <a href={u.html_url} target="_blank" rel="noreferrer" style={{fontSize:12, color:'#9fb0c0'}}>Open on GitHub</a>
            </div>
            <span aria-hidden>›</span>
          </button>
        ))}
      </div>
    </div>
  )
}
