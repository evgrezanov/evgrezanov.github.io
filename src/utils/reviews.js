// /src/utils/reviews.js
// https://ibik1t8iqh8ajiw5.public.blob.vercel-storage.com/reviews-IZ4ivrEDidVymsRYl8mVkRywV7ObnH.json

export async function loadReviews() {
  try {
    const response = await fetch(
      "https://ibik1t8iqh8ajiw5.public.blob.vercel-storage.com/reviews-IZ4ivrEDidVymsRYl8mVkRywV7ObnH.json",
    );
    const reviews = await response.json();
    const reviewsContainer = document.getElementById("reviewsContainer");

    // Create two-column layout structure
    const reviewsRow = document.createElement("div");
    reviewsRow.className = "reviews-row";

    // Left column (67% width) - Featured review
    const leftColumn = document.createElement("div");
    leftColumn.className = "review-column left";

    if (reviews.length > 0) {
      const featuredReview =
        reviews.find((r) => r.projectTitle.includes("WordPress CMS")) ||
        reviews[0];
      const leftReviewCard = document.createElement("div");
      leftReviewCard.className = "review-card";
      leftReviewCard.innerHTML = `
          <h3 class="project-title">${featuredReview.projectTitle}</h3>
          <div class="review-meta">
            <div class="rating">
              ${"★".repeat(featuredReview.rating)}${"☆".repeat(5 - featuredReview.rating)}
            </div>
            <span class="review-date">${featuredReview.date}</span>
          </div>
          <p class="review-comment">${featuredReview.comment}</p>
          <div class="review-footer">
            <span class="review-price">$${featuredReview.price.toFixed(2)}</span>
            <span class="price-type">${featuredReview.priceType}</span>
          </div>
        `;
      leftColumn.appendChild(leftReviewCard);
    }

    // Right column (33% width) - Secondary review
    const rightColumn = document.createElement("div");
    rightColumn.className = "review-column right";

    if (reviews.length > 1) {
      const secondaryReview =
        reviews.find((r) => r.projectTitle.includes("gratis-lezen")) ||
        reviews[1];
      const rightReviewCard = document.createElement("div");
      rightReviewCard.className = "review-card";
      rightReviewCard.innerHTML = `
          <h3 class="project-title">${secondaryReview.projectTitle}</h3>
          <div class="review-meta">
            <div class="rating">
              ${"★".repeat(secondaryReview.rating)}${"☆".repeat(5 - secondaryReview.rating)}
            </div>
            <span class="review-date">${secondaryReview.date}</span>
          </div>
          <p class="review-comment">${secondaryReview.comment}</p>
          <div class="review-footer">
            <span class="review-price">$${secondaryReview.price.toFixed(2)}</span>
            <span class="price-type">${secondaryReview.priceType}</span>
          </div>
        `;
      rightColumn.appendChild(rightReviewCard);
    }

    reviewsRow.appendChild(leftColumn);
    reviewsRow.appendChild(rightColumn);
    reviewsContainer.appendChild(reviewsRow);
  } catch (error) {
    console.error("Error loading reviews:", error);
  }
}
