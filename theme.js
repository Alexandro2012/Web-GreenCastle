// Theme management functionality
export const initTheme = () => {
  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
  };

  const updateThemeIcon = (theme) => {
    const themeIcon = document.querySelector('.theme-switcher svg');
    if (themeIcon) {
      themeIcon.innerHTML = theme === 'dark' 
        ? '<path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"/>'
        : '<path d="M12 7a5 5 0 0 1 5 5a5 5 0 0 1 -5 5a5 5 0 0 1 -5 -5a5 5 0 0 1 5 -5m0 2a3 3 0 0 0 -3 3a3 3 0 0 0 3 3a3 3 0 0 0 3 -3a3 3 0 0 0 -3 -3m0 -2a7 7 0 0 0 -7 7a7 7 0 0 0 7 7a7 7 0 0 0 7 -7a7 7 0 0 0 -7 -7"/>';
    }
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  // Set initial theme
  setTheme(getPreferredTheme());

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });

  return { toggleTheme, setTheme };
};