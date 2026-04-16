/* =============================================
   NOVACORE BUSINESS — DEMO CORPORATIVA PREMIUM
   app.js
   ============================================= */

'use strict';

/* ─── NAVBAR SCROLL ─── */
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = y;
  }, { passive: true });
})();

/* ─── HAMBURGER MENU ─── */
(function () {
  const burger = document.getElementById('hamburger');
  const links  = document.getElementById('navLinks');
  if (!burger || !links) return;

  burger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      burger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
})();

/* ─── SCROLL ANIMATIONS ─── */
(function () {
  const els = document.querySelectorAll('[data-animate], [data-animate-delay]');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();

/* ─── COUNTER ANIMATION ─── */
(function () {
  const nums = document.querySelectorAll('.metrica-num');
  if (!nums.length) return;

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  function animateCount(el) {
    const target  = parseFloat(el.dataset.target);
    const isDecimal = el.classList.contains('metrica-decimal');
    const duration = 1600;
    const start = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOut(progress);
      const value    = eased * target;

      el.textContent = isDecimal
        ? value.toFixed(1)
        : Math.floor(value).toString();

      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = isDecimal ? target.toFixed(1) : target.toString();
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  nums.forEach(el => observer.observe(el));
})();

/* ─── SMOOTH SCROLL FOR ANCHORS ─── */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ─── CONTACT FORM ─── */
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('[type="submit"]');
    const originalText = btn.textContent;

    btn.textContent = 'Enviando...';
    btn.disabled = true;
    btn.style.opacity = '.7';

    setTimeout(() => {
      btn.textContent = '✓ Solicitud enviada';
      btn.style.background = '#16a34a';
      btn.style.borderColor = '#16a34a';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.opacity = '';
        btn.style.background = '';
        btn.style.borderColor = '';
        form.reset();
      }, 2800);
    }, 1200);
  });
})();

/* ─── ACTIVE NAV LINK ON SCROLL ─── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(a => {
          a.style.color = '';
          a.style.fontWeight = '';
          if (a.getAttribute('href') === `#${id}`) {
            a.style.color = 'var(--blue)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();

/* ─── SUBTLE HOVER PARALLAX ON HERO MOCKUP ─── */
(function () {
  const mockup = document.querySelector('.hero-visual');
  if (!mockup || window.matchMedia('(max-width: 768px)').matches) return;

  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    mockup.style.transform = `perspective(800px) rotateY(${dx * 3}deg) rotateX(${-dy * 2}deg) translateZ(4px)`;
    mockup.style.transition = 'transform .1s ease-out';
  });

  document.addEventListener('mouseleave', () => {
    mockup.style.transform = '';
    mockup.style.transition = 'transform .5s ease-out';
  });
})();

/* ─── PORTAFOLIO CARD DEMO HOVER ─── */
(function () {
  document.querySelectorAll('.portafolio-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.setProperty('--hover', '1');
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--hover', '0');
    });
  });
})();

/* ─── PAGE LOAD FADE IN ─── */
(function () {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity .4s ease';
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });
})();
