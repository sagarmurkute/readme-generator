import {
  GitHubUserProfile,
  GitHubRepo,
  GitHubFetchResult,
} from "@/types/github";

export async function fetchGitHubData(
  username: string
): Promise<GitHubFetchResult> {
  const cleanedUsername = username.trim();

  if (!cleanedUsername) {
    return {
      success: false,
      error: "Please enter a valid GitHub username.",
    };
  }

  try {
    // 1. Fetch user profile
    const profileResponse = await fetch(
      `https://api.github.com/users/${encodeURIComponent(cleanedUsername)}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (profileResponse.status === 404) {
      return {
        success: false,
        error: `User "${cleanedUsername}" was not found on GitHub. Please verify the username.`,
      };
    }

    if (
      profileResponse.status === 403 ||
      profileResponse.status === 429
    ) {
      return {
        success: false,
        error:
          "GitHub API rate limit reached. Please wait a moment and try again.",
      };
    }

    if (!profileResponse.ok) {
      return {
        success: false,
        error: `Failed to fetch user profile (HTTP ${profileResponse.status}).`,
      };
    }

    const profile: GitHubUserProfile = await profileResponse.json();

    // 2. Fetch user repositories
    const reposResponse = await fetch(
      `https://api.github.com/users/${encodeURIComponent(
        cleanedUsername
      )}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    let repos: GitHubRepo[] = [];

    if (reposResponse.ok) {
      repos = await reposResponse.json();
    } else if (
      reposResponse.status === 403 ||
      reposResponse.status === 429
    ) {
      return {
        success: false,
        error:
          "GitHub API rate limit reached while fetching repositories. Please try again shortly.",
      };
    }

    return {
      success: true,
      profile,
      repos,
    };
  } catch (err) {
    console.error("GitHub fetch error:", err);
    return {
      success: false,
      error:
        "Unable to connect to GitHub. Please check your internet connection and try again.",
    };
  }
}
