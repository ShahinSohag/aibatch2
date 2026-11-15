const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.filter.active').classList.remove('active');
  button.classList.add('active');
  const category = button.dataset.filter;
  document.querySelectorAll('.project-card').forEach(card => {
    card.hidden = category !== 'all' && card.dataset.category !== category;
  });
}));
document.getElementById('year').textContent = new Date().getFullYear();
const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', event => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.project-card, .service-row, .about-content, .section-heading').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

const themeButton = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('gfx-motion-theme');
if (savedTheme === 'light') document.body.classList.add('light-mode');
function updateThemeButton() {
  const isLight = document.body.classList.contains('light-mode');
  themeButton.setAttribute('aria-pressed', String(isLight));
  themeButton.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} mode`);
  themeButton.querySelector('.theme-label').textContent = isLight ? 'DARK' : 'LIGHT';
  themeButton.querySelector('.theme-icon').textContent = isLight ? '☾' : '☼';
}
updateThemeButton();
themeButton.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  localStorage.setItem('gfx-motion-theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
  updateThemeButton();
});
