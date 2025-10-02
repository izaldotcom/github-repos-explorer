
import { GithubRepo } from '../api/github'

type Props = {
  login: string | null
  repos: GithubRepo[]
  loading?: boolean
  error?: string | null
}

function formatDate(iso: string) {
  try {
    const d = new Date(iso)
    return d.toLocaleString()
  } catch {
    return iso
  }
}

export default function RepoList({ login, repos, loading = false, error = null }: Props) {
  return (
    <div className="panel">
      <h2 style={{marginTop: 0}}>Repositories {login ? `of ${login}` : ''}</h2>
      {error && <div className="error" role="alert">{error}</div>}
      {loading && <div className="empty">Loading repositories…</div>}
      {!loading && login && repos.length === 0 && <div className="empty">No repositories found.</div>}
      {!loading && !login && <div className="empty">Pick a user to see their repositories.</div>}
      {!loading && repos.length > 0 && (
        <div className="repos">
          {repos.map(r => (
            <div className="repo" key={r.id}>
              <h3>
                <a href={r.html_url} target="_blank" rel="noreferrer">{r.name}</a>
                {r.archived && <span style={{marginLeft:8, fontSize:12, color:'#ffb4ae'}}>(archived)</span>}
                {r.fork && <span style={{marginLeft:8, fontSize:12, color:'#9fb0c0'}}>(fork)</span>}
              </h3>
              {r.description && <p style={{margin:'4px 0 6px', color:'#c5d1dc'}}>{r.description}</p>}
              <div className="meta">
                <span>★ {r.stargazers_count}</span>
                <span>⑂ {r.forks_count}</span>
                {r.language && <span>{r.language}</span>}
                <span>Updated {formatDate(r.updated_at)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
