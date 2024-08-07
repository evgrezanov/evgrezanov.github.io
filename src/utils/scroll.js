export function setupStickyHeader() {
    const header = document.getElementById("sticky-header");
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            header.classList.add('visible');
        } else {
            header.classList.remove('visible');
        }
    });
}