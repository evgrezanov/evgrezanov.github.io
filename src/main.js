// src/main.js

import './styles.css'
import { loadSkills } from './utils/skills.js'
import { loadReviews } from './utils/reviews.js'
import { loadGitHubStats } from './utils/github.js'
import { setupLightbox } from './utils/lightbox.js'
import { setupStickyHeader } from './utils/scroll.js'
import { toggleMenu } from './utils/menu.js';

// Привязываем функцию к глобальному объекту
window.toggleMenu = toggleMenu;
window.onload = function() {
    loadSkills();
    loadReviews();
    loadGitHubStats();
    setupStickyHeader();
};