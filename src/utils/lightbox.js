// src/utils/lightbox.js

export function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    lightbox.style.display = 'flex';
    lightboxImg.src = imageSrc;
}

export function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

export function setupLightbox() {
    document.querySelector('.close').onclick = closeLightbox;

    window.onclick = function(event) {
        if (event.target == document.getElementById('lightbox')) {
            closeLightbox();
        }
    }
}