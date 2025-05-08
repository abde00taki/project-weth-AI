// JavaScript for formations.html
document.addEventListener('DOMContentLoaded', function() {
  // Check if there's an ID in the URL parameters to show formation details
  const urlParams = new URLSearchParams(window.location.search);
  const formationId = urlParams.get('id');
  
  if (formationId) {
    fetchFormationDetails(formationId);
  } else {
    // Fetch all formations
    fetchFormations();
  }
  
  // Set up event listeners
  setupEventListeners();
});

// Set up event listeners
function setupEventListeners() {
  // Search input
  const searchInput = document.getElementById('search-formations');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      applyFilters();
    });
  }
  
  // Category filter
  const categoryFilter = document.getElementById('filter-category');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', function() {
      applyFilters();
    });
  }
  
  // Level filter
  const levelFilter = document.getElementById('filter-level');
  if (levelFilter) {
    levelFilter.addEventListener('change', function() {
      applyFilters();
    });
  }
  
  // Add formation form submission
  const submitFormationBtn = document.getElementById('submit-formation');
  if (submitFormationBtn) {
    submitFormationBtn.addEventListener('click', function() {
      addFormation();
    });
  }
  
  // Delete confirmation
  const confirmDeleteBtn = document.getElementById('confirm-delete');
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', function() {
      const formationId = confirmDeleteBtn.getAttribute('data-id');
      if (formationId) {
        deleteFormation(formationId);
      }
    });
  }
}

// Fetch all formations
function fetchFormations() {
  fetch('/api/formations')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(formations => {
      // Store formations in a global variable for filtering
      window.allFormations = formations;
      displayFormations(formations);
    })
    .catch(error => {
      console.error('Error fetching formations:', error);
      document.getElementById('formations-container').innerHTML = `
        <div class="col-12">
          <div class="alert alert-danger" role="alert">
            Impossible de charger les formations. Veuillez réessayer plus tard.
          </div>
        </div>
      `;
    });
}

// Display formations
function displayFormations(formations) {
  const container = document.getElementById('formations-container');
  container.innerHTML = '';
  
  if (formations.length === 0) {
    container.innerHTML = `
      <div class="col-12">
        <div class="alert alert-info" role="alert">
          <i class="fas fa-info-circle me-2"></i> Aucune formation ne correspond à votre recherche.
        </div>
      </div>
    `;
    return;
  }
  
  formations.forEach(formation => {
    const levelBadgeClass = getLevelBadgeClass(formation.level);
    
    const formationCard = document.createElement('div');
    formationCard.className = 'col-md-6 col-lg-4 mb-4 formation-item';
    formationCard.innerHTML = `
      <div class="card formation-card h-100 shadow-sm">
        <div class="card-img-container">
          <img src="${formation.image || 'img/default-formation.jpg'}" alt="${formation.title}" class="card-img-top">
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
          <div class="d-flex mt-3">
            <button class="btn btn-primary flex-grow-1 me-2 view-details" data-id="${formation.id}">
              <i class="fas fa-info-circle me-1"></i> Détails
            </button>
            <button class="btn btn-danger delete-formation" data-id="${formation.id}">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    
    container.appendChild(formationCard);
  });
  
  // Add event listeners for the detail buttons
  document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', function() {
      const formationId = this.getAttribute('data-id');
      fetchFormationDetails(formationId);
    });
  });
  
  // Add event listeners for the delete buttons
  document.querySelectorAll('.delete-formation').forEach(button => {
    button.addEventListener('click', function() {
      const formationId = this.getAttribute('data-id');
      const confirmDeleteBtn = document.getElementById('confirm-delete');
      confirmDeleteBtn.setAttribute('data-id', formationId);
      
      // Show the confirmation modal
      const deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
      deleteModal.show();
    });
  });
}

// Fetch formation details and show in modal
function fetchFormationDetails(id) {
  fetch(`/api/formations/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(formation => {
      displayFormationDetails(formation);
    })
    .catch(error => {
      console.error('Error fetching formation details:', error);
      showAlert('Impossible de charger les détails de la formation.', 'danger', 'alert-container');
    });
}

// Display formation details in the modal
function displayFormationDetails(formation) {
  const levelBadgeClass = getLevelBadgeClass(formation.level);
  
  const detailsContainer = document.getElementById('formation-details-content');
  detailsContainer.innerHTML = `
    <div class="row">
      <div class="col-md-5 mb-4 mb-md-0">
        <img src="${formation.image || 'img/default-formation.jpg'}" alt="${formation.title}" class="img-fluid rounded shadow">
      </div>
      <div class="col-md-7">
        <div class="d-flex justify-content-between mb-2">
          <span class="category-badge">${formation.category}</span>
          <span class="level-badge ${levelBadgeClass}">${formation.level}</span>
        </div>
        <h3>${formation.title}</h3>
        <p class="lead">${formation.description}</p>
        
        <div class="d-flex justify-content-between my-3">
          <div class="meta-item">
            <i class="fas fa-clock me-2 text-primary"></i> 
            <strong>Durée:</strong> ${formation.duration}
          </div>
          <div class="meta-item">
            <i class="fas fa-tag me-2 text-primary"></i> 
            <strong>Prix:</strong> <span class="formation-price">${formatPrice(formation.price)}</span>
          </div>
        </div>
        
        <h5 class="mt-4">Description détaillée</h5>
        <p>${formation.details || 'Aucune description détaillée disponible pour cette formation.'}</p>
      </div>
    </div>
  `;
  
  // Show the modal
  const formationModal = new bootstrap.Modal(document.getElementById('formationDetailsModal'));
  formationModal.show();
}

// Filter formations based on search and filters
function applyFilters() {
  if (!window.allFormations) return;
  
  const searchTerm = document.getElementById('search-formations').value.toLowerCase();
  const categoryFilter = document.getElementById('filter-category').value;
  const levelFilter = document.getElementById('filter-level').value;
  
  const filteredFormations = window.allFormations.filter(formation => {
    // Search term filter
    const matchesSearch = formation.title.toLowerCase().includes(searchTerm) || 
                         formation.description.toLowerCase().includes(searchTerm);
    
    // Category filter
    const matchesCategory = categoryFilter === '' || formation.category === categoryFilter;
    
    // Level filter
    const matchesLevel = levelFilter === '' || formation.level.includes(levelFilter);
    
    return matchesSearch && matchesCategory && matchesLevel;
  });
  
  displayFormations(filteredFormations);
}

// Add a new formation
function addFormation() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;
  const level = document.getElementById('level').value;
  const duration = document.getElementById('duration').value;
  const price = document.getElementById('price').value;
  const details = document.getElementById('details').value;
  const image = document.getElementById('image').value;
  
  if (!title || !description) {
    showAlert('Veuillez remplir les champs obligatoires.', 'danger', 'alert-container');
    return;
  }
  
  const formationData = {
    title,
    description,
    category,
    level,
    duration,
    price: parseFloat(price) || 0,
    details,
    image: image || 'img/default-formation.jpg'
  };
  
  fetch('/api/formations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formationData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Clear form
      document.getElementById('add-formation-form').reset();
      
      // Close the modal
      const addFormationModal = bootstrap.Modal.getInstance(document.getElementById('addFormationModal'));
      addFormationModal.hide();
      
      // Show success message
      showAlert('Formation ajoutée avec succès!', 'success', 'alert-container');
      
      // Refresh formations list
      fetchFormations();
    })
    .catch(error => {
      console.error('Error adding formation:', error);
      showAlert('Erreur lors de l\'ajout de la formation.', 'danger', 'alert-container');
    });
}

// Delete a formation
function deleteFormation(id) {
  fetch(`/api/formations/${id}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Close the modal
      const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteConfirmModal'));
      deleteModal.hide();
      
      // Show success message
      showAlert('Formation supprimée avec succès!', 'success', 'alert-container');
      
      // Refresh formations list
      fetchFormations();
    })
    .catch(error => {
      console.error('Error deleting formation:', error);
      showAlert('Erreur lors de la suppression de la formation.', 'danger', 'alert-container');
    });
}