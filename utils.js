// Utility functions
export const initUtils = () => {
  // Intersection Observer for animations
  const setupAnimations = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    document.querySelectorAll('section, .feature-box, .timeline-item').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(el);
    });
  };

  // Click outside handler for mobile menu
  const setupClickOutside = () => {
    document.addEventListener('click', (e) => {
      if (document.body.classList.contains('mobile-nav-open') && 
          !e.target.closest('nav') && 
          !e.target.closest('.hamburger-menu')) {
        document.body.classList.remove('mobile-nav-open');
      }
    });
  };

  setupAnimations();
  setupClickOutside();
};

// Theme switching functionality
export const initTheme = () => {
  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const updateThemeIcon = (theme) => {
    const themeIcon = document.querySelector('.theme-switcher svg');
    if (themeIcon) {
      themeIcon.innerHTML = theme === 'dark' 
        ? '<path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"/>'
        : '<path d="M12 7a5 5 0 0 1 5 5a5 5 0 0 1 -5 5a5 5 0 0 1 -5 -5a5 5 0 0 1 5 -5m0 2a3 3 0 0 0 -3 3a3 3 0 0 0 3 3a3 3 0 0 0 3 -3a3 3 0 0 0 -3 -3m0 -2a7 7 0 0 0 -7 7a7 7 0 0 0 7 7a7 7 0 0 0 7 -7a7 7 0 0 0 -7 -7"/>';
    }
  };

  // Initialize theme
  setTheme(getPreferredTheme());

  return {
    toggleTheme
  };
};