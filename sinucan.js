// ===== Inicializar Swiper Banner =====
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
    delay: 3000,
    disableOnInteraction: false,
  },
});

// ===== Inicializar Swiper Servicios =====
const swiperServicios = new Swiper('.servicios-swiper', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 20,
  autoplay: { 
    delay: 5000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

// ===== Inicializar AOS =====
AOS.init({
  duration: 1000,
  once: true
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

// ===== Redirigir a formulario con servicio seleccionado =====
document.querySelectorAll('#servicios a.btn, #food .agregar-carrito').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    // Obtener nombre del servicio
    let servicio = btn.dataset.servicio || '';
    if(!servicio && btn.getAttribute('href')){
      const urlParams = new URLSearchParams(btn.getAttribute('href').split('?')[1]);
      servicio = urlParams ? urlParams.get('servicio') : '';
    }

    // Llenar input del formulario
    const contactoForm = document.getElementById('contacto');
    const inputMensaje = contactoForm?.querySelector('#mensaje');
    if(inputMensaje && servicio){
      inputMensaje.value = `Quiero información sobre: ${servicio}`;
    }

    
  });
});

// ===== Carrito Food =====
// ===== Carrito Food =====
let carrito = [];

function actualizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  lista.innerHTML = '';
  let total = 0;

  carrito.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    const li = document.createElement('li');
    li.innerHTML = `${item.nombre} x${item.cantidad} = ${subtotal} COP 
                    <button onclick="eliminarProducto(${index})">X</button>`;
    lista.appendChild(li);
  });

  document.getElementById('total').textContent = total;
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// Agregar productos al carrito
document.querySelectorAll('.agregar-carrito').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.card');
    const nombre = card.querySelector('.card-title').textContent;
    const precio = parseInt(card.querySelector('.precio').dataset.precio);
    const cantidad = parseInt(card.querySelector('.cantidad').value);

    const existente = carrito.find(p => p.nombre === nombre);
    if(existente){
      existente.cantidad += cantidad;
    } else {
      carrito.push({nombre, precio, cantidad});
    }

    actualizarCarrito();
  });
});

// Finalizar pedido a WhatsApp
document.getElementById('finalizar').addEventListener('click', () => {
  if(carrito.length === 0) return alert("Agrega productos al carrito");

  let mensaje = "Hola, quiero pedir:\n";
  carrito.forEach(item => {
    mensaje += `- ${item.nombre} x${item.cantidad}\n`;
  });

  const url = `https://wa.me/573235882174?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
});



// Detecta clicks en los botones de los planes
document.querySelectorAll('.btn-plan').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const servicio = btn.dataset.servicio;

    // Asignar al input del formulario
    const contactoForm = document.querySelector('#contacto');
    const mensajeInput = contactoForm.querySelector('#mensaje');
    if(mensajeInput){
      mensajeInput.value = `Quiero información sobre: ${servicio}`;
      contactoForm.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Autocompletar plan o servicio en el formulario
document.querySelectorAll('#servicios .plan-card button').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const servicio = btn.closest('.plan-card').dataset.servicio;
    const contactoForm = document.getElementById('contacto');
    const mensajeInput = contactoForm.querySelector('#mensaje');

    if(mensajeInput && servicio){
      mensajeInput.value = `Quiero información sobre: ${servicio}`;
    }

    if(contactoForm){
      contactoForm.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
// Inicializar AOS
AOS.init({
  duration: 1000,
  once: true,
  mirror: false,
});

// Autocompletar plan o servicio en el formulario
document.querySelectorAll('#servicios .plan-card button').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const servicio = btn.closest('.plan-card').dataset.servicio;
    const contactoForm = document.getElementById('contacto');
    const mensajeInput = contactoForm.querySelector('#mensaje');

    if(mensajeInput && servicio){
      mensajeInput.value = `Quiero información sobre: ${servicio}`;
    }

    if(contactoForm){
      contactoForm.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
// Inicializar AOS
AOS.init({
  duration: 1000,
  once: true,
  mirror: false,
});

// Autocompletar plan o servicio en el formulario
document.querySelectorAll('#servicios .plan-card button').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const servicio = btn.closest('.plan-card').dataset.servicio;
    const contactoForm = document.getElementById('contacto');
    const mensajeInput = contactoForm.querySelector('#mensaje');

    if(mensajeInput && servicio){
      mensajeInput.value = `Quiero información sobre: ${servicio}`;
    }

    if(contactoForm){
      contactoForm.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
// Inicializar AOS
AOS.init({
  duration: 1000,
  once: true,
  mirror: false,
});

// Autocompletar plan o servicio en el formulario
document.querySelectorAll('#servicios .plan-card button').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const servicio = btn.closest('.plan-card').dataset.servicio;
    const contactoForm = document.getElementById('contacto');
    const mensajeInput = contactoForm.querySelector('#mensaje');

    if(mensajeInput && servicio){
      mensajeInput.value = `Quiero información sobre: ${servicio}`;
    }

    if(contactoForm){
      contactoForm.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
// Inicializar AOS
AOS.init({
  duration: 1000,
  once: true,
  mirror: false,
});

// Autocompletar plan o servicio en el formulario
document.querySelectorAll('#servicios .plan-card button').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const servicio = btn.closest('.plan-card').dataset.servicio;
    const contactoForm = document.getElementById('contacto');
    const mensajeInput = contactoForm.querySelector('#mensaje');

    if(mensajeInput && servicio){
      mensajeInput.value = `Quiero información sobre: ${servicio}`;
    }

    if(contactoForm){
      contactoForm.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== FAQ toggle con flecha =====
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    item.classList.toggle('active');
  });
});



// ===== Inicializar AOS para animaciones =====
AOS.init({
  duration: 1000,
  once: true
});

// =========================
//   Servicios - Botones
// =========================
document.querySelectorAll(".btn-plan").forEach(boton => {
  boton.addEventListener("click", () => {
    const servicio = boton.closest(".plan-card").dataset.servicio;

    // 👉 Aquí decides cómo redirigir:
    // Opción A: mandar a WhatsApp con el nombre del plan
    const mensaje = `¡Hola! Estoy interesado en el servicio: ${servicio}. ¿Podrías darme más información?`;
    const url = `https://wa.me/573235882174?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");

    // Opción B (si usas formulario interno):
    // document.querySelector("#servicio").value = servicio;
    // document.querySelector("#contacto").scrollIntoView({ behavior: "smooth" });
  });
});

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Abrir/cerrar menú al tocar hamburguesa
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Cerrar menú al tocar cualquier enlace
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

