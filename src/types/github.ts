export interface GitHubUserProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  html_url: string;
  followers: number;
  following: number;
  location: string | null;
  company: string | null;
  blog: string | null;
  twitter_username: string | null;
  created_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
  topics?: string[];
  created_at?: string;
  pushed_at?: string;
  updated_at: string;
}

export interface LanguageStat {
  language: string;
  count: number;
  percentage: number;
}

export interface RepoAnalysisResult {
  totalStars: number;
  totalForks: number;
  topLanguages: LanguageStat[];
  featuredProjects: GitHubRepo[];
  oldestRepo: GitHubRepo | null;
  newestRepo: GitHubRepo | null;
  totalAnalyzed: number;
  accountAgeYears: number;
}

export interface GitHubFetchSuccess {
  success: true;
  profile: GitHubUserProfile;
  repos: GitHubRepo[];
}

export interface GitHubFetchError {
  success: false;
  error: string;
}

export type GitHubFetchResult = GitHubFetchSuccess | GitHubFetchError;
