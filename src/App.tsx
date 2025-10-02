
import { useCallback, useMemo, useState } from 'react'
import SearchBox from './components/SearchBox'
import UserResults from './components/UserResults'
import RepoList from './components/RepoList'
import { GithubRepo, GithubUser, fetchUserRepos, searchUsers } from './api/github'

export default function App() {
  const [users, setUsers] = useState<GithubUser[]>([])
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [selected, setSelected] = useState<GithubUser | null>(null)
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [loadingRepos, setLoadingRepos] = useState(false)
  const [userError, setUserError] = useState<string | null>(null)
  const [repoError, setRepoError] = useState<string | null>(null)

  const onSearch = useCallback(async (q: string) => {
    setUserError(null)
    setLoadingUsers(true)
    try {
      const res = await searchUsers(q)
      setUsers(res)
    } catch (e: any) {
      setUserError(e?.message || 'Failed to search users')
      setUsers([])
    } finally {
      setLoadingUsers(false)
    }
  }, [])

  const pickUser = useCallback(async (u: GithubUser) => {
    setSelected(u)
    setRepoError(null)
    setRepos([])
    setLoadingRepos(true)
    try {
      const rs = await fetchUserRepos(u.login)
      setRepos(rs)
    } catch (e: any) {
      setRepoError(e?.message || 'Failed to fetch repositories')
    } finally {
      setLoadingRepos(false)
    }
  }, [])

  return (
    <div className="container">
      <header>
        <h1>GitHub Repositories Explorer</h1>
        <a href="https://developer.github.com/v3/" target="_blank" rel="noreferrer" style={{color:'#9fb0c0'}}>API Docs</a>
      </header>

      <div className="panel" style={{marginBottom:12}}>
        <SearchBox onSearch={onSearch} loading={loadingUsers} />
      </div>

      <div className="split">
        <UserResults
          users={users}
          onPick={pickUser}
          loading={loadingUsers}
          error={userError}
          selectedLogin={selected?.login ?? null}
        />
        <RepoList
          login={selected?.login ?? null}
          repos={repos}
          loading={loadingRepos}
          error={repoError}
        />
      </div>

      <footer>
        Built with React + TypeScript. Use an env token (VITE_GITHUB_TOKEN) to avoid rate limits.
      </footer>
    </div>
  )
}
