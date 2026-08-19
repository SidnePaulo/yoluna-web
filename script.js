// Nav scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Menú móvil accesible
function toggleMenu() {
  const burger = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  const isOpen = menu.classList.toggle('open');

  // Sincronizar estado con lectores de pantalla
  burger.setAttribute('aria-expanded', String(isOpen));
  burger.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');

  // Mover el foco al botón de cerrar al abrir (evita que el usuario
  // quede tabulando por contenido oculto), y devolverlo al cerrar.
  const closeBtn = document.querySelector('.mobile-close');
  if (isOpen && closeBtn) {
    closeBtn.focus();
  } else if (!isOpen) {
    burger.focus();
  }
}

// Soporte de teclado: Enter y Espacio activan la hamburguesa
document.getElementById('hamburger').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault(); // evita el scroll con Espacio
    toggleMenu();
  }
});

// Escape cierra el menú móvil si está abierto
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const menu = document.getElementById('mobileMenu');
    if (menu.classList.contains('open')) toggleMenu();
  }
});

// Los enlaces del menú cierran sin mover el foco (el navegador
// navega a la sección destino; robar el foco interferiría).
function closeMenu() {
  const burger = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  menu.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', 'Abrir menú');
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
    
    // Cerrar todos los demás (y sincronizar su estado)
    document.querySelectorAll('.faq-question').forEach(otherBtn => {
      otherBtn.classList.remove('active');
      otherBtn.nextElementSibling.style.maxHeight = null;
      otherBtn.setAttribute('aria-expanded', 'false');
    });
    
    if (!isActive) {
      button.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + "px";
      button.setAttribute('aria-expanded', 'true');
    }
  });
});
