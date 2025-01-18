// Gamemode carousel functionality
export const initCarousel = () => {
  const elements = {
    slides: document.querySelectorAll('.gamemode-slide'),
    nextBtn: document.querySelector('.next-btn'),
    prevBtn: document.querySelector('.prev-btn')
  };

  if (elements.slides.length === 0) {
    console.warn('No carousel slides found');
    return;
  }

  let currentSlide = 0;
  const totalSlides = elements.slides.length;

  const showSlide = (index) => {
    elements.slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = ((index % totalSlides) + totalSlides) % totalSlides;
    elements.slides[currentSlide].classList.add('active');
  };

  // Event listeners
  elements.nextBtn?.addEventListener('click', () => showSlide(currentSlide + 1));
  elements.prevBtn?.addEventListener('click', () => showSlide(currentSlide - 1));

  // Auto-advance
  const interval = setInterval(() => showSlide(currentSlide + 1), 5000);

  // Cleanup function
  return () => clearInterval(interval);
};