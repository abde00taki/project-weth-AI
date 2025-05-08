// JavaScript for index.html
document.addEventListener('DOMContentLoaded', function() {
  // Fetch featured formations for the homepage
  fetchFeaturedFormations();
});

// Fetch featured formations (top 3)
function fetchFeaturedFormations() {
  fetch('/api/formations')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(formations => {
      // Get first 3 formations for the featured section
      const featuredFormations = formations.slice(0, 3);
      displayFeaturedFormations(featuredFormations);
    })
    .catch(error => {
      console.error('Error fetching formations:', error);
      document.getElementById('featured-formations').innerHTML = `
        <div class="col-12">
          <div class="alert alert-danger" role="alert">
            Impossible de charger les formations. Veuillez réessayer plus tard.
          </div>
        </div>
      `;
    });
}

// Display featured formations
function displayFeaturedFormations(formations) {
  const container = document.getElementById('featured-formations');
  container.innerHTML = '';
  
  formations.forEach(formation => {
    const levelBadgeClass = getLevelBadgeClass(formation.level);
    
    const formationCard = document.createElement('div');
    formationCard.className = 'col-md-4 mb-4 formation-item';
    formationCard.innerHTML = `
      <div class="card formation-card h-100 shadow-sm">
        <div class="card-img-container">
          <img src="${formation.image}" alt="${formation.title}" class="card-img-top">
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-between mb-2">
            <span class="category-badge">${formation.category}</span>
            <span class="level-badge ${levelBadgeClass}">${formation.level}</span>
          </div>
          <h5 class="card-title">${formation.title}</h5>
          <p class="card-text">${formation.description}</p>
        </div>
        <div class="card-footer bg-white">
          <div class="d-flex justify-content-between align-items-center">
            <div class="formation-meta">
              <span class="meta-item"><i class="fas fa-clock"></i> ${formation.duration}</span>
            </div>
            <span class="formation-price">${formatPrice(formation.price)}</span>
          </div>
          <a href="/formations.html?id=${formation.id}" class="btn btn-primary mt-3 w-100">
            <i class="fas fa-info-circle me-2"></i> Détails
          </a>
        </div>
      </div>
    `;
    
    container.appendChild(formationCard);
  });
}