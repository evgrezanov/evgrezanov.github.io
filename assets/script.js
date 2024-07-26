<script>
    function toggleMenu() {
        var overlay = document.getElementById("overlay");
        if (overlay.style.display === "flex") {
            overlay.style.display = "none";
        } else {
            overlay.style.display = "flex";
        }
    }

    function loadSkills() {
            const skills = [
                { name: "PHP", icon: "fab fa-php" },
                { name: "JavaScript", icon: "fab fa-js" },
                { name: "WordPress", icon: "fab fa-wordpress" },
                { name: "WooCommerce", icon: "fab fa-wordpress" },
                { name: "MySQL", icon: "fas fa-database" },
                { name: "PostgreSQL", icon: "fas fa-database" },
                { name: "MS SQL", icon: "fas fa-database" },
                { name: "Redis", icon: "fas fa-database" },
                { name: "VueJS", icon: "fab fa-vuejs" }
            ];

            const skillsContainer = document.getElementById('skillsContainer');
            skills.forEach(skill => {
                const skillElement = document.createElement('div');
                skillElement.className = 'skill';
                skillElement.innerHTML = `<i class="${skill.icon}"></i><span>${skill.name}</span>`;
                skillsContainer.appendChild(skillElement);
            });
        }

        function loadReviews() {
            const reviewsData = [
                { "image": "review1.jpg", "width": 300, "height": 150 },
                { "image": "review2.jpg", "width": 300, "height": 250 },
                { "image": "review3.jpg", "width": 300, "height": 250 },
                { "image": "review4.jpg", "width": 300, "height": 200 },
                { "image": "review5.jpg", "width": 300, "height": 300 }
            ];

            const reviewsContainer = document.getElementById('reviewsContainer');

            reviewsData.forEach((review, index) => {
                const reviewCard = document.createElement('div');
                reviewCard.className = 'review-card';
                reviewCard.style.width = `${review.width}px`;
                reviewCard.style.height = `${review.height}px`;
                reviewCard.innerHTML = `<img src="${review.image}" alt="Client Review ${index + 1}">`;
                reviewCard.onclick = () => openLightbox(review.image);
                reviewsContainer.appendChild(reviewCard);
            });
        }

        function openLightbox(imageSrc) {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightboxImage');
            lightbox.style.display = 'flex';
            lightboxImg.src = imageSrc;
        }

        document.querySelector('.close').onclick = function() {
            document.getElementById('lightbox').style.display = 'none';
        }

        window.onclick = function(event) {
            if (event.target == document.getElementById('lightbox')) {
                document.getElementById('lightbox').style.display = 'none';
            }
        }

        function loadGitHubStats() {
            const username = 'evgrezanov'; // Замените на ваш GitHub username
            
            fetch(`https://api.github.com/users/${username}`)
                .then(response => response.json())
                .then(data => {
                    const statsContainer = document.getElementById('githubStats');
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
                .catch(error => console.error('Error:', error));

            fetch(`https://api.github.com/users/${username}/repos`)
                .then(response => response.json())
                .then(repos => {
                    let languages = {};
                    let promises = repos.map(repo => 
                        fetch(repo.languages_url)
                            .then(res => res.json())
                            .then(repoLanguages => {
                                for (let lang in repoLanguages) {
                                    languages[lang] = (languages[lang] || 0) + repoLanguages[lang];
                                }
                            })
                    );

                    Promise.all(promises).then(() => {
                        const languagesContainer = document.getElementById('githubLanguages');
                        const totalBytes = Object.values(languages).reduce((a, b) => a + b, 0);
                        const topLanguages = Object.entries(languages)
                            .sort((a, b) => b[1] - a[1])
                            .slice(0, 5);

                        let languagesHTML = '';
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
                .catch(error => console.error('Error:', error));
        }

        function getRandomColor() {
            return "#" + Math.