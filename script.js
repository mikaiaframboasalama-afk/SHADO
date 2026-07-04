// ==== Menu mobile ====
document.addEventListener('DOMContentLoaded', () => {
  // ==== Logo : anneau qui se propage à l'arrivée sur la page ====
  document.querySelectorAll('.logo-mark').forEach(mark => {
    requestAnimationFrame(() => mark.classList.add('is-ready'));
    const parentLogo = mark.closest('.logo');
    if (parentLogo) {
      parentLogo.addEventListener('click', () => {
        mark.classList.remove('is-ready');
        void mark.offsetWidth; // relance l'animation
        mark.classList.add('is-ready');
      });
    }
  });

  const burger = document.querySelector('.burger');
  const nav = document.querySelector('nav.links');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('mobile-open');
      if (nav.classList.contains('mobile-open')) {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '68px';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.background = '#F3ECFF';
        nav.style.padding = '24px 32px';
        nav.style.gap = '20px';
        nav.style.borderBottom = '1px solid rgba(59,29,99,.1)';
      } else {
        nav.style.display = '';
      }
    });
  }

  // ==== Halo qui suit le curseur (hero) ====
  const hero = document.querySelector('.hero');
  const aura = document.querySelector('.hero .aura');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (hero && aura && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      aura.style.left = (e.clientX - rect.left) + 'px';
      aura.style.top = (e.clientY - rect.top) + 'px';
      aura.style.opacity = '1';
    });
    hero.addEventListener('mouseleave', () => { aura.style.opacity = '0'; });
  } else if (aura) {
    aura.style.display = 'none';
  }

  // ==== FAQ accordion ====
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // ==== Formulaire de contact (simulation d'envoi) ====
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  if (form && feedback) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      feedback.textContent = "Message envoyé — nous revenons vers vous sous 24h.";
      feedback.classList.add('show');
      form.reset();
    });
  }
});
