import {
  GitHubUserProfile,
  GitHubRepo,
  RepoAnalysisResult,
  LanguageStat,
} from "@/types/github";

export function analyzeRepositories(
  profile: GitHubUserProfile,
  repos: GitHubRepo[]
): RepoAnalysisResult {
  const totalAnalyzed = repos.length;

  // 1. Calculate Total Stars & Total Forks
  let totalStars = 0;
  let totalForks = 0;

  for (const repo of repos) {
    totalStars += repo.stargazers_count || 0;
    totalForks += repo.forks_count || 0;
  }

  // 2. Compute Language Statistics
  const languageCounts: Record<string, number> = {};
  let totalLanguageCount = 0;

  for (const repo of repos) {
    if (repo.language) {
      languageCounts[repo.language] =
        (languageCounts[repo.language] || 0) + 1;
      totalLanguageCount++;
    }
  }

  const topLanguages: LanguageStat[] = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([language, count]) => ({
      language,
      count,
      percentage:
        totalLanguageCount > 0
          ? Math.round((count / totalLanguageCount) * 100)
          : 0,
    }));

  // 3. Find Oldest & Newest Repositories
  let oldestRepo: GitHubRepo | null = null;
  let newestRepo: GitHubRepo | null = null;

  if (repos.length > 0) {
    const sortedByCreation = [...repos].sort((a, b) => {
      const dateA = new Date(a.created_at || a.updated_at).getTime();
      const dateB = new Date(b.created_at || b.updated_at).getTime();
      return dateA - dateB;
    });

    oldestRepo = sortedByCreation[0];
    newestRepo = sortedByCreation[sortedByCreation.length - 1];
  }

  // 4. Select Top 6 Featured Repositories
  const sortedFeatured = [...repos].sort((a, b) => {
    // Non-fork priority
    if (!a.fork && b.fork) return -1;
    if (a.fork && !b.fork) return 1;

    // Stars priority
    if (b.stargazers_count !== a.stargazers_count) {
      return b.stargazers_count - a.stargazers_count;
    }

    // Forks priority
    if (b.forks_count !== a.forks_count) {
      return b.forks_count - a.forks_count;
    }

    // Recent activity priority
    return (
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
  });

  const featuredProjects = sortedFeatured.slice(0, 6);

  // 5. Account Age Calculation
  const createdAtYear = new Date(profile.created_at).getFullYear();
  const currentYear = new Date().getFullYear();
  const accountAgeYears = Math.max(1, currentYear - createdAtYear);

  return {
    totalStars,
    totalForks,
    topLanguages,
    featuredProjects,
    oldestRepo,
    newestRepo,
    totalAnalyzed,
    accountAgeYears,
  };
}
