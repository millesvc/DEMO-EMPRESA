/* ══════════════════════════════════════════════════════════
   NEXOVA CONSULTING — script.js
   ══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Navbar scroll ─── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ─── Mobile nav toggle ─── */
  const toggle = document.getElementById('navToggle');
  const mobile = document.getElementById('navMobile');
  toggle?.addEventListener('click', () => {
    const isOpen = mobile.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    // Animate hamburger bars
    const bars = toggle.querySelectorAll('span');
    if (isOpen) {
      bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    }
  });

  // Close mobile nav on link click
  mobile?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobile.classList.remove('open');
      const bars = toggle.querySelectorAll('span');
      bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    });
  });

  /* ─── Scroll reveal (Intersection Observer) ─── */
  const revealElements = document.querySelectorAll('.scroll-reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));

  /* ─── Smooth anchor scrolling with navbar offset ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ─── CTA form submit ─── */
  const ctaBtn = document.querySelector('.btn-cta');
  ctaBtn?.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.form-input, .form-textarea');
    let allFilled = true;
    inputs.forEach(input => {
      if (!input.value.trim()) {
        allFilled = false;
        input.style.borderColor = 'rgba(239, 68, 68, 0.6)';
        input.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.15)';
        setTimeout(() => {
          input.style.borderColor = '';
          input.style.boxShadow = '';
        }, 2000);
      }
    });
    if (allFilled) {
      ctaBtn.textContent = '✓ ¡Mensaje enviado! Te contactamos pronto';
      ctaBtn.style.background = '#059669';
      ctaBtn.style.boxShadow = '0 8px 36px rgba(5, 150, 105, 0.4)';
      ctaBtn.disabled = true;
      inputs.forEach(i => { i.value = ''; i.disabled = true; });
    }
  });

  /* ─── Active nav link on scroll ─── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--cyan)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ─── Subtle parallax on hero orbs ─── */
  const orbs = document.querySelectorAll('.hero-orb');
  window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 0.4;
      orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  }, { passive: true });

  /* ─── Animated counter on stats ─── */
  const stats = document.querySelectorAll('.stat strong');
  const countersStarted = new Set();

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted.has(entry.target)) {
        countersStarted.add(entry.target);
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.8 });

  stats.forEach(s => counterObserver.observe(s));

  function animateCounter(el) {
    const text = el.textContent.trim();
    const numMatch = text.match(/[\d.]+/);
    if (!numMatch) return;
    const finalVal = parseFloat(numMatch[0]);
    const suffix = text.replace(numMatch[0], '');
    const duration = 1200;
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * finalVal);
      el.textContent = (current % 1 === 0 ? current : current.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  /* ─── Chart bar animation (nosotros section) ─── */
  const chartBars = document.querySelectorAll('.chart-bar');
  const chartObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        chartBars.forEach((bar, i) => {
          setTimeout(() => {
            bar.style.transition = 'height 0.6s cubic-bezier(0.4,0,0.2,1)';
            bar.style.height = bar.style.getPropertyValue('--h') || bar.style.cssText.match(/--h:\s*([^;]+)/)?.[1] || '50%';
          }, i * 80);
        });
        chartObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const chartSection = document.querySelector('.visual-chart');
  if (chartSection) chartObserver.observe(chartSection);

  /* ─── Benefit card number count-up on hover ─── */
  document.querySelectorAll('.benefit-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'all 0.35s cubic-bezier(0.4,0,0.2,1)';
    });
  });

});
