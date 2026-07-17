// Nav scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Menú móvil
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// Fade in al scroll
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));

// Formulario con Netlify Forms
async function handleFormSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Enviando...';
  btn.disabled = true;
  try {
    const data = new FormData(form);
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data).toString()
    });
    form.style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
  } catch (err) {
    btn.textContent = 'Enviar mensaje';
    btn.disabled = false;
    alert('Ha ocurrido un error. Por favor contáctame por WhatsApp al 635 498 116');
  }
}

// Resetear formulario
function resetForm() {
  const form = document.getElementById('contactForm');
  form.reset();
  form.style.display = 'flex';
  document.getElementById('formSuccess').style.display = 'none';
  form.querySelector('button[type="submit"]').textContent = 'Enviar mensaje';
  form.querySelector('button[type="submit"]').disabled = false;
}

// ══ AVISO DE COOKIES ══
(function() {
  const COOKIE_NAME = 'yoluna_cookies_ok';
  const banner = document.getElementById('cookieConsent');

  function getCookie(name) {
    return document.cookie.split('; ').some(row => row.startsWith(name + '='));
  }

  function setCookie(name, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 86400000);
    document.cookie = name + '=1; expires=' + d.toUTCString() + '; path=/; SameSite=Lax';
  }

  function acceptCookies() {
    setCookie(COOKIE_NAME, 365);
    banner.classList.remove('show');
    gtag('consent', 'update', {
      'analytics_storage': 'granted',
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted'
    });
  }

  function rejectCookies() {
    setCookie(COOKIE_NAME, 1); /* 1 día para no molestar */
    banner.classList.remove('show');
    /* analytics_storage se queda en 'denied' — GA no recoge datos */
  }

  // Exponer globalmente
  window.acceptCookies = acceptCookies;
  window.rejectCookies = rejectCookies;

  // Mostrar banner si no ha decidido aún
  if (!getCookie(COOKIE_NAME)) {
    // Esperar un toque para que aparezca suave
    setTimeout(() => banner.classList.add('show'), 500);
  }
})();

// FAQ Acordeón
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;
    const answer = button.nextElementSibling;
    const isActive = button.classList.contains('active');
    
    // Cerrar todos los demás
    document.querySelectorAll('.faq-question').forEach(otherBtn => {
      otherBtn.classList.remove('active');
      otherBtn.nextElementSibling.style.maxHeight = null;
    });
    
    if (!isActive) {
      button.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});
