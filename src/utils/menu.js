// src/utils/menu.js

// В файле menu.js или main.js

export function toggleMenu() {
    const overlay = document.getElementById('overlay');
    if (overlay.style.display === 'flex') {
        overlay.style.display = 'none';
        document.body.style.overflow = 'visible'; // Разрешаем прокрутку body
    } else {
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Запрещаем прокрутку body
    }
}

// Убедитесь, что функция toggleMenu доступна глобально
window.toggleMenu = toggleMenu;

// Закрытие меню при клике на ссылку
document.querySelectorAll('.overlay-content a').forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// Закрытие меню при нажатии клавиши Esc
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const overlay = document.getElementById('overlay');
        if (overlay.style.display === 'flex') {
            toggleMenu();
        }
    }
});