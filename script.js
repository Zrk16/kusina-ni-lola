/* ============================================================
   KUSINA NI LOLA — script.js
   Nav scroll, mobile menu, IntersectionObserver fade-ins
   ============================================================ */

// --- NAV SCROLL BEHAVIOR ---
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 24) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

// --- MOBILE NAV TOGGLE ---
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

if (navToggle && navMobile) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMobile.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close on link click
  navMobile.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('open');
      navToggle.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity = '';
      });
    });
  });
}

// --- SCROLL-TRIGGERED FADE ANIMATIONS ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -48px 0px'
});

// Give browser a frame to render initial invisible state, then observe
requestAnimationFrame(() => {
  document.querySelectorAll('.fade-up, .fade-in').forEach(el => {
    observer.observe(el);
  });
});

// --- CONTACT FORM ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('#name').value.trim();
    const message = contactForm.querySelector('#message').value.trim();

    if (!name || !message) {
      const firstEmpty = !name
        ? contactForm.querySelector('#name')
        : contactForm.querySelector('#message');
      firstEmpty.focus();
      firstEmpty.style.borderColor = 'var(--coral)';
      firstEmpty.style.boxShadow = '0 0 0 3px rgba(255,90,95,0.2)';
      setTimeout(() => {
        firstEmpty.style.borderColor = '';
        firstEmpty.style.boxShadow = '';
      }, 2000);
      return;
    }

    const btn = contactForm.querySelector('.form-submit');
    btn.textContent = 'Sent! Salamat! ✓';
    btn.style.background = '#22c55e';
    btn.style.boxShadow = '0 4px 18px rgba(34,197,94,0.38)';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.style.boxShadow = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3500);
  });
}

// --- ACTIVE NAV LINK (redundant with HTML but safe fallback) ---
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});
