const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('is-open', !expanded);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia('(min-width: 701px)').addEventListener('change', closeMenu);
document.querySelector('#year').textContent = new Date().getFullYear();
const art = document.querySelector('.hero-art');
const model = document.querySelector('.model');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let pointerX = 0;
let pointerY = 0;
let framePending = false;
function renderModel() {
  framePending = false;
  if (motionPreference.matches) {
    model.style.removeProperty('--rx');
    model.style.removeProperty('--ry');
    return;
  }
  model.style.setProperty('--rx', `${-18 + pointerY * 22 + window.scrollY * .035}deg`);
  model.style.setProperty('--ry', `${25 + pointerX * 32 + window.scrollY * .07}deg`);
}
function scheduleModel() {
  if (!framePending) {
    framePending = true;
    requestAnimationFrame(renderModel);
  }
}
art.addEventListener('pointermove', event => {
  const bounds = art.getBoundingClientRect();
  pointerX = (event.clientX - bounds.left) / bounds.width - .5;
  pointerY = (event.clientY - bounds.top) / bounds.height - .5;
  scheduleModel();
});
art.addEventListener('pointerleave', () => {
  pointerX = pointerY = 0;
  scheduleModel();
});
window.addEventListener('scroll', scheduleModel, { passive: true });
motionPreference.addEventListener('change', scheduleModel);
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.section-heading, .project, .about-grid, .principles article').forEach(element => {
    element.classList.add('reveal');
    observer.observe(element);
  });
}
