// Main initialization script
document.addEventListener('DOMContentLoaded', () => {
  // Theme switcher initialization
  const themeSwitcher = document.querySelector('.theme-switcher');
  const root = document.documentElement;

  const setTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
  };

  const updateThemeIcon = (theme) => {
    const themeIcon = themeSwitcher?.querySelector('svg');
    if (themeIcon) {
      themeIcon.innerHTML = theme === 'dark' 
        ? '<path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"/>'
        : '<path d="M12 7a5 5 0 0 1 5 5a5 5 0 0 1 -5 5a5 5 0 0 1 -5 -5a5 5 0 0 1 5 -5m0 2a3 3 0 0 0 -3 3a3 3 0 0 0 3 3a3 3 0 0 0 3 -3a3 3 0 0 0 -3 -3m0 -2a7 7 0 0 0 -7 7a7 7 0 0 0 7 7a7 7 0 0 0 7 -7a7 7 0 0 0 -7 -7"/>';
    }
  };

  // Initialize theme
  const preferredTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(preferredTheme);

  // Theme switcher click handler
  themeSwitcher?.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

  // Mobile navigation
  const hamburger = document.querySelector('.hamburger-menu');
  const body = document.body;
  const navLinks = document.querySelectorAll('nav ul li a');

  hamburger?.addEventListener('click', () => {
    body.classList.toggle('mobile-nav-open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      body.classList.remove('mobile-nav-open');
    });
  });

  // Server status check
  const checkServerStatus = async () => {
    const indicator = document.querySelector('.status-indicator');
    const statusText = document.querySelector('.status-text');
    const playerCount = document.querySelector('.player-count');

    if (!indicator || !statusText || !playerCount) return;

    try {
      const response = await fetch('https://mcapi.us/server/status?ip=greencastle.es&port=25552');
      const data = await response.json();

      if (data.online) {
        indicator.classList.remove('offline');
        indicator.classList.add('online');
        statusText.textContent = 'Servidor Online';
        playerCount.textContent = `${data.players.now || 0}/${data.players.max || 0} jugadores`;
      } else {
        throw new Error('Server offline');
      }
    } catch (error) {
      indicator.classList.remove('online');
      indicator.classList.add('offline');
      statusText.textContent = 'Servidor Offline';
      playerCount.textContent = '0/0 jugadores';
    }
  };

  // Check server status initially and every 30 seconds
  checkServerStatus();
  setInterval(checkServerStatus, 30000);

  // Gamemode carousel
  const carousel = {
    slides: document.querySelectorAll('.gamemode-slide'),
    nextBtn: document.querySelector('.next-btn'),
    prevBtn: document.querySelector('.prev-btn'),
    currentSlide: 0
  };

  const showSlide = (index) => {
    carousel.slides.forEach(slide => slide.classList.remove('active'));
    carousel.currentSlide = ((index % carousel.slides.length) + carousel.slides.length) % carousel.slides.length;
    carousel.slides[carousel.currentSlide].classList.add('active');
  };

  carousel.nextBtn?.addEventListener('click', () => showSlide(carousel.currentSlide + 1));
  carousel.prevBtn?.addEventListener('click', () => showSlide(carousel.currentSlide - 1));

  // Auto-advance carousel
  setInterval(() => showSlide(carousel.currentSlide + 1), 5000);

  // Initialize particles
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 50, density: { enable: true, value_area: 800 } },
        color: { value: "#2ac148" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#2ac148",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true
        }
      }
    });
  }
});