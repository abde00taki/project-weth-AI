// JavaScript for contact.html
document.addEventListener('DOMContentLoaded', function() {
  // Set up contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      handleContactFormSubmission();
    });
  }
});

// Handle contact form submission
function handleContactFormSubmission() {
  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  // In a real application, we would send this data to the server
  // For this demo, we'll just show a success message
  
  // Show success message
  document.getElementById('contact-success').classList.remove('d-none');
  
  // Reset form
  document.getElementById('contact-form').reset();
  
  // Scroll to the success message
  document.getElementById('contact-success').scrollIntoView({ behavior: 'smooth' });
  
  // Hide success message after 5 seconds
  setTimeout(() => {
    document.getElementById('contact-success').classList.add('d-none');
  }, 5000);
}