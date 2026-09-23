// Make reCAPTCHA callback globally accessible
window.onRecaptchaSuccess = onRecaptchaSuccess;

document.addEventListener('DOMContentLoaded', function () {
  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const mobilePanel = document.querySelector('.mobile-panel');

  if (navToggle && mobilePanel) {
    navToggle.addEventListener('click', function () {
      const isOpen = mobilePanel.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  /* ---------- Desktop dropdown (click/touch support alongside :hover) ---------- */
  const dropdownToggle = document.querySelector('.nav-link-btn');
  const dropdownParent = document.querySelector('.nav-links li.has-dropdown');

  if (dropdownToggle && dropdownParent) {
    dropdownToggle.addEventListener('click', function (e) {
      e.preventDefault();
      const isOpen = dropdownParent.classList.toggle('dropdown-open');
      dropdownToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', function (e) {
      if (!dropdownParent.contains(e.target)) {
        dropdownParent.classList.remove('dropdown-open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Active link highlighting ---------- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('a[data-nav-link]').forEach(function (link) {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
      const group = link.closest('[data-nav-group]');
      if (group) {
        const groupToggle = group.querySelector('.nav-link-btn');
        if (groupToggle) groupToggle.classList.add('active');
      }
    }
  });

  /* ---------- Scroll reveal ---------- */
  const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -60px 0px' };
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
});

/* ---------- reCAPTCHA success handler ---------- */
function onRecaptchaSuccess() {
  const recaptchaIframe = document.querySelector('.g-recaptcha iframe');
  if (recaptchaIframe) {
    recaptchaIframe.style.border = 'none';
  }
  const errorMessage = document.querySelector('.error-message');
  if (errorMessage) {
    errorMessage.style.display = 'none';
  }
}

/* ---------- Contact form submission (Google Forms) ---------- */
const form = document.querySelector('#contactForm');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const captchaResponse = typeof grecaptcha !== 'undefined' ? grecaptcha.getResponse() : '';
    const recaptcha = document.querySelector('.g-recaptcha');
    const iframe = recaptcha ? recaptcha.querySelector('iframe') : null;
    const errorMessage = form.querySelector('.error-message');

    if (!captchaResponse || !captchaResponse.length) {
      if (iframe) {
        iframe.style.border = '1px solid rgba(176, 72, 60, 0.85)';
      }
      if (errorMessage) {
        errorMessage.style.display = 'block';
      }
      return;
    }

    const fd = new FormData(e.target);
    const params = new URLSearchParams(fd);

    fetch('https://docs.google.com/forms/d/e/1FAIpQLSfVlTPvY-DUpcFcyEicAPTPXidQ6v4yBjZK8MUY5FOFmaH7zw/formResponse', {
      method: 'POST',
      body: params,
      mode: 'no-cors'
    })
      .then(function () {
        window.location.href = 'formconfirmation.html';
      })
      .catch(function (err) {
        console.error('Form submission error:', err);
      });
  });
}
