document.addEventListener("DOMContentLoaded", function () {
  // Hamburguesa
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinksContainer = document.getElementById("main-nav");
  const navItems = document.querySelectorAll("nav#main-nav a");
  const navLine = document.querySelector("nav#main-nav .nav-line");

  console.log("navLine:", navLine);
  console.log("navLinksContainer:", navLinksContainer);

  if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener("click", () => {
      navLinksContainer.classList.toggle("show");
    });
  }

  // Función para actualizar la posición de la línea
  function updateNavLinePosition(activeLink) {
    if (activeLink && navLine && navLinksContainer) {
      const linkRect = activeLink.getBoundingClientRect();
      const navRect = navLinksContainer.getBoundingClientRect();
      navLine.style.left = linkRect.left - navRect.left + 'px';
      navLine.style.width = linkRect.width + 'px';
    } else {
      console.log("Uno de los elementos (activeLink, navLine, navLinksContainer) es null dentro de updateNavLinePosition.");
    }
  }

  // AOS Init
  AOS.init();

  // Preguntas frecuentes
  const faqs = document.querySelectorAll(".faq-question");
  faqs.forEach(btn => {
    btn.addEventListener("click", () => {
      const answer = btn.nextElementSibling;
      btn.classList.toggle("active");
      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // Detectar el scroll y cambiar la clase activa en los enlaces y la línea
  const sections = document.querySelectorAll("section[id], form[id]"); // Incluimos los formularios con ID

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + 100; // Ajusta si tu navbar es más alta o más baja
    let currentActiveLink = null;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      // Cambiar la clase activa en el menú de navegación
      navItems.forEach(link => {
        link.classList.remove("active");
        if (scrollPos >= top && scrollPos < top + height && link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
          currentActiveLink = link;
        }
      });

      // Actualizar la posición de la línea si hay un enlace activo
      if (currentActiveLink) {
        updateNavLinePosition(currentActiveLink);
      }
    });
  });

  // Establecer la posición inicial de la línea al cargar la página
  const initialActiveLink = document.querySelector("nav#main-nav a.active");
  console.log("initialActiveLink:", initialActiveLink);
  if (initialActiveLink) {
    updateNavLinePosition(initialActiveLink);
  }

  // Cerrar el menú al hacer clic fuera de él
  document.addEventListener("click", function (event) {
    const nav = document.getElementById("main-nav");
    const menuToggle = document.querySelector(".menu-toggle");
    if (nav && menuToggle && !nav.contains(event.target) && !menuToggle.contains(event.target)) {
      nav.classList.remove("show");
    }
  });

  // Actualizar la posición de la línea en el resize de la ventana
  window.addEventListener('resize', () => {
    const currentActive = document.querySelector("nav#main-nav a.active");
    if (currentActive) {
      updateNavLinePosition(currentActive);
    }
  });
});