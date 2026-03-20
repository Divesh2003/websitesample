// ===== PRELOADER =====
const preloadText = "Dr. Komal's Homoeopathy";
const preloadEl = document.getElementById('preload-text');
if (preloadEl) {
  preloadText.split('').forEach((ch, i) => {
    const s = document.createElement('span');
    s.textContent = ch === ' ' ? '\u00A0' : ch;
    s.style.animationDelay = `${1.4 + i * 0.08}s`;
    preloadEl.appendChild(s);
  });
}
const crossSvg = document.querySelector('#preloader svg.cross');
if (crossSvg) setTimeout(() => crossSvg.classList.add('cross-done'), 1600);
setTimeout(() => {
  const preloader = document.getElementById('preloader');
  if (preloader) preloader.classList.add('hide');
  document.body.style.overflow = '';
}, 3000);
document.body.style.overflow = 'hidden';

// ===== CUSTOM CURSOR =====
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animCursor() {
  rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
  if (dot) { dot.style.left = mx - 4 + 'px'; dot.style.top = my - 4 + 'px'; }
  if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
  requestAnimationFrame(animCursor);
}
animCursor();
document.querySelectorAll('a,button,.service-card,.remedy-card').forEach(el => {
  el.addEventListener('mouseenter', () => ring?.classList.add('hover'));
  el.addEventListener('mouseleave', () => ring?.classList.remove('hover'));
});

// ===== NAV SCROLL =====
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 80);
  // Parallax hero
  const hero = document.querySelector('.hero-content');
  if (hero) hero.style.transform = `translateY(${window.scrollY * 0.3}px)`;
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
}

// ===== SECTION NAVIGATION =====
// (Removed SPA slide logic for Multi-Page layout)

// ===== SCROLL REVEAL (IntersectionObserver) =====
function triggerReveals() {
  const reveals = document.querySelectorAll('.reveal:not(.visible)');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 120);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach(el => obs.observe(el));
}
triggerReveals();
// Also trigger credentials check animation and timeline dots
const credObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      credObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.credentials').forEach(el => credObs.observe(el));

const dotObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const dots = e.target.querySelectorAll('.timeline-dot');
      dots.forEach((d, i) => setTimeout(() => d.classList.add('visible'), i * 400));
      dotObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.timeline').forEach(el => dotObs.observe(el));

// Contact stitch
const stitchObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      stitchObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.contact-stitch').forEach(el => stitchObs.observe(el));

// ===== FLOATING PARTICLES =====
function createParticles(container, count, color) {
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'float-particle';
    const size = 6 + Math.random() * 16;
    p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 90}%;bottom:${-20 - Math.random() * 40}px;animation-duration:${6 + Math.random() * 8}s;animation-delay:${Math.random() * 6}s;border-color:${color}`;
    container.appendChild(p);
  }
}
const home = document.getElementById('home');
if (home) createParticles(home, 5, 'rgba(201,168,76,.25)');

// Remedy particles
document.querySelectorAll('.remedy-card').forEach(card => {
  for (let i = 0; i < 6; i++) {
    const p = document.createElement('div');
    p.className = 'remedy-particle';
    p.style.cssText = `left:${10 + Math.random() * 80}%;bottom:0;animation-duration:${4 + Math.random() * 6}s;animation-delay:${Math.random() * 4}s`;
    card.appendChild(p);
  }
});

// ===== TESTIMONIALS CAROUSEL =====
const slides = document.querySelectorAll('.testi-slide');
let currentSlide = 0;
function nextSlide() {
  if (slides.length === 0) return;
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}
if (slides.length > 0) setInterval(nextSlide, 5000);

// ===== FORM SUBMIT =====
window.handleSubmit = function (e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  if (!btn) return false;
  btn.classList.add('loading');
  setTimeout(() => {
    btn.classList.remove('loading');
    btn.classList.add('success');
    setTimeout(() => {
      btn.classList.remove('success');
      e.target.reset();
    }, 2000);
  }, 1500);
  return false;
}

// ===== STAGGER SERVICE CARDS =====
const cardObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      const cards = document.querySelectorAll('.service-card.reveal');
      cards.forEach((c, i) => {
        setTimeout(() => c.classList.add('visible'), i * 150);
      });
      cardObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
const sGrid = document.querySelector('.services-grid');
if (sGrid) cardObs.observe(sGrid);

// Touch support fallback for cursor
if ('ontouchstart' in window) {
  if (dot) dot.style.display = 'none';
  if (ring) ring.style.display = 'none';
  document.body.style.cursor = 'auto';
}

// ===== MODAL LOGIC =====  
const modal = document.getElementById('bookingModal');
const closeBtn = document.getElementById('closeModal');
function openModal(e) { e.preventDefault(); if (modal) modal.classList.add('active'); }
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    if (modal) modal.classList.remove('active');
  });
}
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('active');
});
document.querySelectorAll('.btn-gold').forEach(btn => {
  if (btn.textContent.includes('Book')) btn.addEventListener('click', openModal);
});
