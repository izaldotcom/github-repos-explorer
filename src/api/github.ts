export type GithubUser = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
};

export type GithubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  archived: boolean;
  fork: boolean;
};

const BASE = "https://api.github.com";
const TOKEN = "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";

function authHeaders() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  if (TOKEN) headers["Authorization"] = `Bearer ${TOKEN}`;
  return headers;
}

export async function searchUsers(q: string): Promise<GithubUser[]> {
  if (!q.trim()) return [];
  const url = new URL(BASE + "/search/users");
  url.searchParams.set("q", q.trim());
  url.searchParams.set("per_page", "5");

  const res = await fetch(url.toString(), { headers: authHeaders() });
  if (!res.ok) {
    const msg = await safeErr(res);
    throw new Error(
      `Search failed: ${res.status} ${res.statusText}${msg ? " - " + msg : ""}`
    );
  }
  const data = await res.json();
  return (data.items ?? []) as GithubUser[];
}

export async function fetchUserRepos(username: string): Promise<GithubRepo[]> {
  const all: GithubRepo[] = [];
  let page = 1;
  while (true) {
    const url = new URL(BASE + `/users/${encodeURIComponent(username)}/repos`);
    url.searchParams.set("per_page", "100");
    url.searchParams.set("page", String(page));
    url.searchParams.set("sort", "updated");

    const res = await fetch(url.toString(), { headers: authHeaders() });
    if (!res.ok) {
      const msg = await safeErr(res);
      throw new Error(
        `Repos fetch failed: ${res.status} ${res.statusText}${
          msg ? " - " + msg : ""
        }`
      );
    }
    const chunk: GithubRepo[] = await res.json();
    all.push(...chunk);

    const link = res.headers.get("Link") || "";
    const hasNext = /<[^>]+>;\s*rel="next"/i.test(link);
    if (!hasNext || chunk.length === 0) break;
    page++;

    if (page > 10) break;
  }
  all.sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1));
  return all;
}

async function safeErr(res: Response): Promise<string | null> {
  try {
    const t = await res.text();
    return t.slice(0, 200);
  } catch {
    return null;
  }
}
