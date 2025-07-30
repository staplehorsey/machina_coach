// Unified Navigation System for Machina.coach

document.addEventListener('DOMContentLoaded', () => {
  // Create navigation HTML
  const createNavigation = () => {
    return `
      <nav class="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
        <div class="container mx-auto px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-8">
              <a href="index.html" class="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Machina.coach
              </a>
              <div class="hidden md:flex space-x-6">
                <a href="index.html" class="nav-link text-gray-700 hover:text-primary font-medium" data-page="client">
                  For Clients
                </a>
                <a href="guides.html" class="nav-link text-gray-700 hover:text-primary font-medium" data-page="guide">
                  Become a Guide
                </a>
              </div>
            </div>
            
            <div class="flex items-center space-x-4">
              <button id="join-now-btn" class="btn-primary">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </nav>
    `;
  };

  // Insert navigation at the beginning of body
  const nav = document.createElement('div');
  nav.innerHTML = createNavigation();
  document.body.insertBefore(nav.firstElementChild, document.body.firstChild);

  // Add top padding to body to account for fixed nav
  document.body.style.paddingTop = '80px';

  // Handle active nav state
  const currentPage = window.location.pathname.includes('guides.html') ? 'guide' : 'client';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.dataset.page === currentPage) {
      link.classList.add('active');
    }
  });

  // Handle Join Now button
  const joinBtn = document.getElementById('join-now-btn');
  joinBtn.addEventListener('click', () => {
    // Scroll to waitlist section
    const waitlistSection = document.querySelector('[id*="waitlist"]') || 
                           document.querySelector('section:last-of-type');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
      
      // Add attention-grabbing animation to the form
      const form = waitlistSection.querySelector('form');
      if (form) {
        form.classList.add('animate-pulse-gentle');
        setTimeout(() => form.classList.remove('animate-pulse-gentle'), 2000);
      }
    }
  });

  // Mobile menu toggle (for future enhancement)
  const createMobileMenu = () => {
    // Mobile menu implementation can be added here
  };
});

// Smooth scrolling for anchor links
document.addEventListener('click', (e) => {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

// Add scroll-based animations
const observeElements = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
      }
    });
  }, { threshold: 0.1 });

  // Observe all sections and cards
  document.querySelectorAll('section, .card, .card-feature').forEach(el => {
    observer.observe(el);
  });
};

// Initialize animations after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(observeElements, 100);
});
