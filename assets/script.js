<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Evgeniy Rezanov - Software Developer</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1, h2, h3 {
            color: #2c3e50;
        }
        .header {
            display: flex;
            align-items: center;
            gap: 20px;
        }
        .profile-photo {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            object-fit: cover;
        }
        .contact {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            margin: 20px 0;
        }
        .contact a {
            color: #2c3e50;
            font-size: 24px;
            transition: color 0.3s ease;
        }
        .contact a:hover {
            color: #3498db;
        }
        .booking-btn {
            display: inline-block;
            background-color: #2ecc71;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
            transition: background-color 0.3s ease;
        }
        .booking-btn:hover {
            background-color: #27ae60;
        }
        .bmc-btn {
            height: 36px;
        }
        .reviews {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
        }
        .review-card {
            background-color: #f1f1f1;
            border-radius: 10px;
            overflow: hidden;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        .review-card:hover {
            transform: scale(1.05);
        }
        .review-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .lightbox {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
        }
        .lightbox-content {
            margin: auto;
            display: block;
            width: 80%;
            max-width: 800px;
            max-height: 80%;
            object-fit: contain;
        }
        .close {
            position: absolute;
            top: 15px;
            right: 35px;
            color: #f1f1f1;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
        }
        .github-stats-container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: space-between;
        }
        .github-stats, .github-languages {
            flex: 1;
            min-width: 300px;
            background-color: #f1f1f1;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .stat {
            display: inline-block;
            margin: 10px;
            text-align: center;
        }
        .stat-value {
            font-weight: bold;
            font-size: 24px;
            display: block;
        }
        .language-bar {
            height: 10px;
            margin-bottom: 5px;
            border-radius: 5px;
        }
        .language-name {
            display: flex;
            justify-content: space-between;
        }
        .menu-toggle {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            cursor: pointer;
            font-size: 24px;
        }
        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 999;
        }
        .overlay-content {
            text-align: center;
        }
        .overlay a {
            color: white;
            font-size: 24px;
            display: block;
            margin: 20px 0;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="menu-toggle" onclick="toggleMenu()">
        <i class="fas fa-bars"></i>
    </div>

    <div class="overlay" id="overlay">
        <div class="overlay-content">
            <a href="#about" onclick="toggleMenu()">About Me</a>
            <a href="#experience" onclick="toggleMenu()">Professional Experience</a>
            <a href="#skills" onclick="toggleMenu()">Key Skills</a>
            <a href="#reviews" onclick="toggleMenu()">Client Reviews</a>
            <a href="#github-stats" onclick="toggleMenu()">GitHub Statistics</a>
        </div>
    </div>

    <div class="header">
        <img src="https://lh6.googleusercontent.com/--f1o6IVSYXA/AAAAAAAAAAI/AAAAAAAAA2w/DUv0hzhgCYg/photo.jpg?sz=256" alt="Evgeniy Rezanov" class="profile-photo">
        <div>
            <h1>👋 Hi there, my name is Evgeniy</h1>
            <h2>and I am a Software Developer</h2>
        </div>
    </div>
    
    <div class="contact">
        <a href="mailto:evgrezanov@gmail.com" title="Email" target="_blank"><i class="fas fa-envelope"></i></a>
        <a href="https://www.linkedin.com/in/evgeniy-rezanov" target="_blank" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
        <a href="https://github.com/evgrezanov" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>
        <a href="https://profiles.wordpress.org/redmonkey73" target="_blank" title="WordPress"><i class="fab fa-wordpress"></i></a>
        <a href="https://buymeacoffee.com/evgrezanov" target="_blank" title="Buy Me a Coffee">
            <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" class="bmc-btn">
        </a>
    </div>

    <div style="text-align: center; margin-top: 20px;">
        <a href="https://cal.com/evgrezanov/15min" target="_blank" class="booking-btn">Book a Meeting</a>
    </div>

    <h3 id="about">About Me</h3>
    <p>
        I am Evgeniy, a web developer with a strong background in PHP, JavaScript, and front-end development. 
        I am always eager to learn and expand my skill set, and am currently exploring new technologies such as 
        chatGPT, VueJS, and GatsbyJS.
    </p>

    <h3 id="experience">Professional Experience</h3>
    <p>
        Throughout my career, I have developed a wide range of applications and systems, including corporate EMC 
        systems, company document flow management, and more. With expertise in PHP and WordPress, I am highly 
        proficient in WooCommerce and have extensive experience with databases such as MySQL, PosgreSQL, MS SQL, 
        Redis, and Memcached.
    </p>

    <h3 id="skills">Key Skills</h3>
    <div id="skillsContainer" class="skills">
        <!-- Skills will be dynamically added here -->
    </div>

    <h3 id="reviews">Client Reviews</h3>
    <div class="reviews" id="reviewsContainer">
        <!-- Reviews will be dynamically added here -->
    </div>

    <div id="lightbox" class="lightbox">
        <span class="close">&times;</span>
        <img class="lightbox-content" id="lightboxImage">
    </div>

    <h3 id="github-stats">GitHub Statistics</h3>
    <div class="github-stats-container">
        <div id="githubStats" class="github-stats">
            <!-- GitHub stats will be dynamically added here -->
        </div>
        <div id="githubLanguages" class="github-languages">
            <h4>Top Languages</h4>
            <!-- Top languages will be dynamically added here -->
        </div>
    </div>

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
                { name: "Memcached", icon: "fas fa-database" },
                { name: "VueJS", icon: "fab fa-vuejs" },
                { name: "GatsbyJS", icon: "fab fa-react" }
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