// Common JavaScript functions for all pages

// Initialize Bootstrap tooltips
document.addEventListener('DOMContentLoaded', function() {
  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Add active class to current navigation item
  const currentLocation = location.pathname;
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentLocation) {
      link.classList.add('active');
    } else if (link.getAttribute('href') !== '/' && currentLocation.includes(link.getAttribute('href'))) {
      link.classList.add('active');
    } else if (link.getAttribute('href') === '/' && currentLocation === '/') {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Helper function to show alert messages
function showAlert(message, type, container) {
  const alertContainer = document.getElementById(container);
  if (!alertContainer) return;

  const alertElement = document.createElement('div');
  alertElement.className = `alert alert-${type} alert-dismissible fade show`;
  alertElement.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
  
  alertContainer.innerHTML = '';
  alertContainer.appendChild(alertElement);
  
  // Auto-dismiss after 5 seconds
  setTimeout(() => {
    alertElement.classList.remove('show');
    setTimeout(() => {
      alertContainer.removeChild(alertElement);
    }, 150);
  }, 5000);
}

// Format price as a nice string
function formatPrice(price) {
  return new Intl.NumberFormat('fr-FR', { 
    style: 'currency', 
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

// Get level badge class
function getLevelBadgeClass(level) {
  if (level.includes('Débutant')) return 'beginner';
  if (level.includes('Intermédiaire')) return 'intermediate';
  if (level.includes('Avancé')) return 'advanced';
  return 'beginner';
}