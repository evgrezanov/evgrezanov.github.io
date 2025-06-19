// src/utils/github.js

import { getRandomColor } from "./colors.js";

export function loadGitHubStats() {
  const username = "evgrezanov";

  fetch(`https://api.github.com/users/${username}`)
    .then((response) => {
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error(
            "GitHub API rate limit exceeded. Please try again later.",
          );
        }
        throw new Error(`GitHub API error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const statsContainer = document.getElementById("githubStats");
      if (!statsContainer) {
        console.warn('Element with id "githubStats" not found');
        return;
      }
      statsContainer.innerHTML = `
                <h4>Account Overview</h4>
                <div class="stat">
                    <span class="stat-value">${data.public_repos}</span>
                    Repositories
                </div>
                <div class="stat">
                    <span class="stat-value">${data.followers}</span>
                    Followers
                </div>
                <div class="stat">
                    <span class="stat-value">${data.following}</span>
                    Following
                </div>
                <div class="stat">
                    <span class="stat-value">${new Date(data.created_at).getFullYear()}</span>
                    Joined GitHub
                </div>
            `;
    })
    .catch((error) => {
      console.error("GitHub Stats Error:", error.message);
      const statsContainer = document.getElementById("githubStats");
      if (statsContainer) {
        statsContainer.innerHTML = `
                    <h4>Account Overview</h4>
                    <p style="color: #666; font-style: italic;">GitHub stats temporarily unavailable. ${error.message.includes("rate limit") ? "API rate limit exceeded." : "Please try again later."}</p>
                `;
      }
    });

  fetch(`https://api.github.com/users/${username}/repos`)
    .then((response) => {
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error(
            "GitHub API rate limit exceeded. Please try again later.",
          );
        }
        throw new Error(`GitHub API error: ${response.status}`);
      }
      return response.json();
    })
    .then((repos) => {
      // Check if repos is actually an array
      if (!Array.isArray(repos)) {
        console.error("GitHub API did not return an array of repos:", repos);
        return;
      }

      let languages = {};
      let promises = repos.map((repo) =>
        fetch(repo.languages_url)
          .then((res) => res.json())
          .then((repoLanguages) => {
            for (let lang in repoLanguages) {
              languages[lang] = (languages[lang] || 0) + repoLanguages[lang];
            }
          }),
      );

      Promise.all(promises).then(() => {
        const languagesContainer = document.getElementById("githubLanguages");
        if (!languagesContainer) {
          console.warn('Element with id "githubLanguages" not found');
          return;
        }
        const totalBytes = Object.values(languages).reduce((a, b) => a + b, 0);
        const topLanguages = Object.entries(languages)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5);

        let languagesHTML = "";
        topLanguages.forEach(([lang, bytes]) => {
          const percentage = ((bytes / totalBytes) * 100).toFixed(1);
          const color = getRandomColor();
          languagesHTML += `
                        <div>
                            <div class="language-bar" style="width: ${percentage}%; background-color: ${color};"></div>
                            <div class="language-name">
                                <span>${lang}</span>
                                <span>${percentage}%</span>
                            </div>
                        </div>
                    `;
        });

        languagesContainer.innerHTML += languagesHTML;
      });
    })
    .catch((error) => {
      console.error("GitHub Languages Error:", error.message);
      const languagesContainer = document.getElementById("githubLanguages");
      if (languagesContainer) {
        languagesContainer.innerHTML = `
                    <h3>Top Languages</h3>
                    <p style="color: #666; font-style: italic;">Language stats temporarily unavailable. ${error.message.includes("rate limit") ? "API rate limit exceeded." : "Please try again later."}</p>
                `;
      }
    });
}
