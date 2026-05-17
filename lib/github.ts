export type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

const GRADIENTS = [
  "from-violet-500 to-fuchsia-500",
  "from-cyan-500 to-blue-600",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-pink-500 to-rose-500",
  "from-indigo-500 to-purple-600",
  "from-sky-500 to-cyan-400",
  "from-lime-500 to-emerald-500"
];

export function gradientFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return GRADIENTS[h % GRADIENTS.length];
}

export async function getRepos(username = "mominshaikhdev"): Promise<Repo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`,
      {
        headers: { Accept: "application/vnd.github+json" },
        // ISR: refresh hourly so new repos appear automatically
        next: { revalidate: 3600 }
      }
    );
    if (!res.ok) return [];
    const data = (await res.json()) as Repo[];
    return data
      .filter((r) => !r.fork && !r.archived)
      .sort((a, b) => +new Date(b.pushed_at) - +new Date(a.pushed_at));
  } catch {
    return [];
  }
}
