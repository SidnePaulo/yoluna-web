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
    alert('Ha ocurrido un error. Por favor contáctame por WhatsApp al 611 419 266');
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