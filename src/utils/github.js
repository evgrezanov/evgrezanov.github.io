// src/utils/github.js

import { getRandomColor } from "./colors.js";

export function loadGitHubStats() {
  const username = "evgrezanov";

  fetch(`https://api.github.com/users/${username}`)
    .then((response) => response.json())
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
    .catch((error) => console.error("Error:", error));

  fetch(`https://api.github.com/users/${username}/repos`)
    .then((response) => response.json())
    .then((repos) => {
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
    .catch((error) => console.error("Error:", error));
}
