const noCopyElements = document.querySelectorAll('.no-copy');

noCopyElements.forEach(element => {
  element.addEventListener('copy', (e) => e.preventDefault());
  element.addEventListener('contextmenu', (e) => e.preventDefault());
});