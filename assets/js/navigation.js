// Unified Navigation System for Machina.coach

document.addEventListener('DOMContentLoaded', () => {
  // Create navigation HTML
  const createNavigation = () => {
    return `
      <nav class="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-md border-b border-gray-100/50 z-50">
        <div class="container mx-auto px-6 py-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-6">
              <a href="index.html" class="group flex items-center space-x-2 transition-all duration-300">
                <div class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                  <span class="text-white font-bold text-sm">M</span>
                </div>
                <span class="font-display text-xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Machina.coach
                </span>
              </a>
              
              <div class="hidden md:flex items-center space-x-1">
                <a href="index.html" class="nav-link group relative px-3 py-1.5 rounded-lg font-semibold text-gray-600 hover:text-indigo-600 transition-all duration-300 text-sm" data-page="client">
                  <span class="relative z-10 flex items-center space-x-1.5">
                    <span class="text-sm">🎯</span>
                    <span>For Members</span>
                  </span>
                  <div class="absolute inset-0 bg-indigo-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </a>
                
                <a href="guides.html" class="nav-link group relative px-3 py-1.5 rounded-lg font-semibold text-gray-600 hover:text-purple-600 transition-all duration-300 text-sm" data-page="guide">
                  <span class="relative z-10 flex items-center space-x-1.5">
                    <span class="text-sm">💰</span>
                    <span>Become a Guide</span>
                  </span>
                  <div class="absolute inset-0 bg-purple-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </a>
              </div>
            </div>
            
            <div class="flex items-center space-x-3">
              <button id="join-now-btn" class="group bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm">
                <span class="flex items-center space-x-1.5">
                  <span>Join Now</span>
                  <span class="text-sm group-hover:animate-bounce">🚀</span>
                </span>
              </button>
              
              <!-- Mobile menu button -->
              <button id="mobile-menu-btn" class="md:hidden p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Mobile menu -->
          <div id="mobile-menu" class="md:hidden mt-3 pb-3 border-t border-gray-100 hidden">
            <div class="flex flex-col space-y-2 pt-3">
              <a href="index.html" class="nav-link-mobile group flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-indigo-50 transition-all duration-300" data-page="client">
                <span class="text-sm">🎯</span>
                <span class="font-semibold text-gray-700">For Members</span>
              </a>
              <a href="guides.html" class="nav-link-mobile group flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-purple-50 transition-all duration-300" data-page="guide">
                <span class="text-sm">💰</span>
                <span class="font-semibold text-gray-700">Become a Guide</span>
              </a>
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
  document.body.style.paddingTop = '70px';

  // Handle active nav state with enhanced styling
  const currentPage = window.location.pathname.includes('guides.html') ? 'guide' : 'client';
  const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');
  navLinks.forEach(link => {
    if (link.dataset.page === currentPage) {
      // Desktop active state
      if (link.classList.contains('nav-link')) {
        link.classList.add('text-indigo-600', 'font-black');
        link.classList.remove('text-gray-700');
        const bgDiv = link.querySelector('div');
        if (bgDiv) {
          bgDiv.classList.remove('opacity-0');
          bgDiv.classList.add('opacity-100', 'scale-100');
        }
      }
      // Mobile active state
      if (link.classList.contains('nav-link-mobile')) {
        link.classList.add('bg-gradient-to-r', 'from-indigo-100', 'to-purple-100', 'border-indigo-200');
        link.classList.remove('bg-white/30', 'border-white/40');
      }
    }
  });

  // Mobile menu functionality
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  mobileMenuBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('animate-fade-in-up');
      // Update button icon to X
      mobileMenuBtn.innerHTML = `
        <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      `;
    } else {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('animate-fade-in-up');
      // Update button icon back to hamburger
      mobileMenuBtn.innerHTML = `
        <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      `;
    }
  });

  // Close mobile menu when clicking on links
  const mobileNavLinks = document.querySelectorAll('.nav-link-mobile');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('animate-fade-in-up');
      mobileMenuBtn.innerHTML = `
        <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      `;
    });
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

  // Auto-hide navigation on scroll down
  let lastScrollTop = 0;
  const navElement = document.querySelector('nav');
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down - hide nav
      navElement.style.transform = 'translateY(-100%)';
      navElement.style.transition = 'transform 0.3s ease-in-out';
    } else {
      // Scrolling up - show nav
      navElement.style.transform = 'translateY(0)';
      navElement.style.transition = 'transform 0.3s ease-in-out';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  }, false);

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
