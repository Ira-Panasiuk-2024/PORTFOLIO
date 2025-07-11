const scrollUpBtn = document.getElementById('scrollUpBtn');

function toggleScrollUpButton() {
  if (window.scrollY > 300) {
    scrollUpBtn.classList.add('show');
  } else {
    scrollUpBtn.classList.remove('show');
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

window.addEventListener('scroll', toggleScrollUpButton);

scrollUpBtn.addEventListener('click', scrollToTop);

toggleScrollUpButton();
