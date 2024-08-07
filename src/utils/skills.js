// src/utils/skills.js

export function loadSkills() {
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
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill';
        skillDiv.innerHTML = `<i class="${skill.icon}"></i><span>${skill.name}</span>`;
        skillsContainer.appendChild(skillDiv);
    });
}