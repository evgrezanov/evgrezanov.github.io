// /src/utils/reviews.js
// https://ibik1t8iqh8ajiw5.public.blob.vercel-storage.com/reviews-IZ4ivrEDidVymsRYl8mVkRywV7ObnH.json

export async function loadReviews() {
    try {
      const response = await fetch('https://ibik1t8iqh8ajiw5.public.blob.vercel-storage.com/reviews-IZ4ivrEDidVymsRYl8mVkRywV7ObnH.json');
      const reviews = await response.json();
      const reviewsContainer = document.getElementById('reviewsContainer');
      
      reviews.forEach(review => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.innerHTML = `
          <h3 class="project-title">${review.projectTitle}</h3>
          <div class="review-meta">
            <div class="rating">
              ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
            </div>
            <span class="review-date">${review.date}</span>
          </div>
          <p class="review-comment">${review.comment}</p>
          <div class="review-footer">
            <span class="review-price">$${review.price.toFixed(2)}</span>
            <span class="price-type">${review.priceType}</span>
          </div>
        `;
        reviewsContainer.appendChild(reviewCard);
      });
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  }