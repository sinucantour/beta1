// ===== Inicializar Swiper Banner Principal =====
const swiper = new Swiper('.mySwiper', {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  effect: 'slide',
  speed: 600,
  grabCursor: true,
});

// ===== Inicializar AOS (Animaciones) =====
AOS.init({
  duration: 1000,
  once: true,
  offset: 50
});

// ===== Cerrar menú móvil al hacer clic en enlaces =====
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      new bootstrap.Collapse(navbarCollapse).hide();
    }
  });
});

// ===== Activar link del menú según scroll =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ===== FAQ Toggle =====
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    
    // Cerrar otros FAQs abiertos
    document.querySelectorAll('.faq-item').forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('active');
      }
    });
    
    // Toggle del FAQ actual
    item.classList.toggle('active');
  });
});

// ===== CARRITO DE COMPRAS (FOOD) =====
let carrito = [];

function actualizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  const totalElement = document.getElementById('total');
  
  if (!lista || !totalElement) return;
  
  lista.innerHTML = '';
  let total = 0;

  carrito.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.nombre} x${item.cantidad} = ${subtotal.toLocaleString()} COP</span>
      <button onclick="eliminarProducto(${index})">X</button>
    `;
    lista.appendChild(li);
  });

  totalElement.textContent = total.toLocaleString();
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// Agregar productos al carrito
document.querySelectorAll('.agregar-carrito').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.card');
    const nombre = card.querySelector('.card-title').textContent.trim();
    const precio = parseInt(card.querySelector('.precio').dataset.precio);
    const cantidadInput = card.querySelector('.cantidad');
    const cantidad = parseInt(cantidadInput.value);

    if (cantidad <= 0) {
      alert('Por favor ingresa una cantidad válida');
      return;
    }

    const existente = carrito.find(p => p.nombre === nombre);
    if (existente) {
      existente.cantidad += cantidad;
    } else {
      carrito.push({ nombre, precio, cantidad });
    }

    actualizarCarrito();
    
    // Feedback visual
    btn.textContent = '¡Agregado!';
    btn.style.background = '#4CAF50';
    setTimeout(() => {
      btn.textContent = 'Agregar';
      btn.style.background = '';
    }, 1000);
  });
});

// Finalizar pedido (WhatsApp)
const finalizarBtn = document.getElementById('finalizar');
if (finalizarBtn) {
  finalizarBtn.addEventListener('click', () => {
    if (carrito.length === 0) {
      alert('El carrito está vacío. Agrega productos antes de continuar.');
      return;
    }

    let mensaje = '🐾 *Hola! Quiero hacer un pedido de SinucanTOUR* 🐾\n\n';
    let total = 0;
    
    carrito.forEach(item => {
      const subtotal = item.precio * item.cantidad;
      total += subtotal;
      mensaje += `• ${item.nombre} x${item.cantidad} = ${subtotal.toLocaleString()} COP\n`;
    });
    
    mensaje += `\n*Total: ${total.toLocaleString()} COP*`;

    const url = `https://wa.me/573235882174?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
    
    // Opcional: limpiar carrito después de enviar
    // carrito = [];
    // actualizarCarrito();
  });
}

// ===== BOTONES DE PLANES -> FORMULARIO =====
document.querySelectorAll('.btn-plan').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const servicio = btn.closest('.plan-card').dataset.servicio;

    // Rellenar el campo de mensaje del formulario
    const contactoSection = document.getElementById('contacto');
    const mensajeInput = document.querySelector('#mensaje');
    
    if (mensajeInput && servicio) {
      mensajeInput.value = `Hola, estoy interesado en el ${servicio}. ¿Podrían darme más información?`;
    }

    // Scroll suave al formulario
    if (contactoSection) {
      contactoSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== AUTOPLAY DEL CARRUSEL DE MASCOTAS =====
const carouselMascotas = document.getElementById('carouselMascotas');
if (carouselMascotas) {
  const mascotasCarousel = new bootstrap.Carousel(carouselMascotas, {
    interval: 3000,
    wrap: true,
    keyboard: true,
    pause: 'hover'
  });
}

// ===== Scroll Suave para todos los enlaces internos =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Ignorar enlaces vacíos o solo con #
    if (href === '#' || href === '') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== Efecto de carga =====
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  console.log('✅ SinucanTOUR cargado correctamente');
});

// ===== Detectar dispositivo móvil =====
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
  console.log('📱 Modo móvil detectado');
}

// ===== Performance: Lazy loading de imágenes (si el navegador no lo soporta nativamente) =====
if ('loading' in HTMLImageElement.prototype) {
  console.log('✅ Lazy loading nativo soportado');
} else {
  console.log('⚠️ Lazy loading no soportado, usa un polyfill si es necesario');
}
