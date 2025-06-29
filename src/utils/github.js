// src/utils/github.js

import { getRandomColor } from "./colors.js";

export function loadGitHubStats() {
  const username = "evgrezanov";

  // Set a timeout to show fallback content if API calls take too long or fail
  setTimeout(() => {
    const statsContainer = document.getElementById("githubStats");
    const languagesContainer = document.getElementById("githubLanguages");

    // Only show fallback if containers are empty (meaning API failed)
    if (statsContainer && statsContainer.innerHTML.trim() === "") {
      console.log("Showing fallback stats due to timeout/failure");
      statsContainer.innerHTML = `
                <h4>Account Overview</h4>
                <div class="stat">
                    <span class="stat-value">20+</span>
                    Repositories
                </div>
                <div class="stat">
                    <span class="stat-value">15+</span>
                    Followers
                </div>
                <div class="stat">
                    <span class="stat-value">10+</span>
                    Following
                </div>
                <div class="stat">
                    <span class="stat-value">2020</span>
                    Joined GitHub
                </div>
                <small style="color: #666; font-style: italic; display: block; margin-top: 10px;">
                    * Live stats temporarily limited by GitHub API
                </small>
            `;
    }

    if (languagesContainer && languagesContainer.children.length <= 1) {
      // Only has h3 title
      console.log("Showing fallback languages due to timeout/failure");
      const fallbackLanguages = [
        { name: "PHP", percentage: 45, color: "#777bb4" },
        { name: "JavaScript", percentage: 30, color: "#f7df1e" },
        { name: "HTML", percentage: 15, color: "#e34f26" },
        { name: "CSS", percentage: 7, color: "#1572b6" },
        { name: "Vue", percentage: 3, color: "#4fc08d" },
      ];

      let languagesHTML = "";
      fallbackLanguages.forEach(({ name, percentage, color }) => {
        languagesHTML += `
                    <div>
                        <div class="language-bar" style="width: ${percentage}%; background-color: ${color};"></div>
                        <div class="language-name">
                            <span>${name}</span>
                            <span>${percentage}%</span>
                        </div>
                    </div>
                `;
      });

      languagesContainer.innerHTML = `
                <h3>Top Languages</h3>
                ${languagesHTML}
                <small style="color: #666; font-style: italic; display: block; margin-top: 10px;">
                    * Live language stats temporarily limited by GitHub API
                </small>
            `;
    }
  }, 2000); // Wait 2 seconds for API calls to complete

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
      console.log(
        "GitHub API unavailable, showing fallback stats:",
        error.message,
      );
      const statsContainer = document.getElementById("githubStats");
      console.log("Stats container found:", !!statsContainer);
      if (statsContainer) {
        // Provide static fallback data when API is unavailable
        statsContainer.innerHTML = `
                    <h4>Account Overview</h4>
                    <div class="stat">
                        <span class="stat-value">20+</span>
                        Repositories
                    </div>
                    <div class="stat">
                        <span class="stat-value">15+</span>
                        Followers
                    </div>
                    <div class="stat">
                        <span class="stat-value">10+</span>
                        Following
                    </div>
                    <div class="stat">
                        <span class="stat-value">2020</span>
                        Joined GitHub
                    </div>
                    <small style="color: #666; font-style: italic; display: block; margin-top: 10px;">
                        ${error.message.includes("rate limit") ? "* Live stats temporarily limited by GitHub API" : "* GitHub stats temporarily unavailable"}
                    </small>
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
      console.log(
        "GitHub Languages API unavailable, showing fallback data:",
        error.message,
      );
      const languagesContainer = document.getElementById("githubLanguages");
      console.log("Languages container found:", !!languagesContainer);
      if (languagesContainer) {
        // Provide static fallback programming languages
        const fallbackLanguages = [
          { name: "PHP", percentage: 45, color: "#777bb4" },
          { name: "JavaScript", percentage: 30, color: "#f7df1e" },
          { name: "HTML", percentage: 15, color: "#e34f26" },
          { name: "CSS", percentage: 7, color: "#1572b6" },
          { name: "Vue", percentage: 3, color: "#4fc08d" },
        ];

        let languagesHTML = "";
        fallbackLanguages.forEach(({ name, percentage, color }) => {
          languagesHTML += `
                        <div>
                            <div class="language-bar" style="width: ${percentage}%; background-color: ${color};"></div>
                            <div class="language-name">
                                <span>${name}</span>
                                <span>${percentage}%</span>
                            </div>
                        </div>
                    `;
        });

        languagesContainer.innerHTML = `
                    <h3>Top Languages</h3>
                    ${languagesHTML}
                    <small style="color: #666; font-style: italic; display: block; margin-top: 10px;">
                        ${error.message.includes("rate limit") ? "* Live language stats temporarily limited by GitHub API" : "* Language stats temporarily unavailable"}
                    </small>
                `;
      }
    });
}
