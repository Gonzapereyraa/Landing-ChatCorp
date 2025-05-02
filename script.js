document.addEventListener("DOMContentLoaded", function () {
  // Hamburguesa
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.getElementById("main-nav");

  console.log("menuToggle:", menuToggle);
  console.log("navLinks:", navLinks);

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
      console.log("Botón de hamburguesa clickeado. Clase 'show' de navLinks:", navLinks.classList.contains("show"));
    });
  } else {
    console.log("No se encontraron menuToggle o navLinks");
  }

  // AOS Init (se mantiene igual)
  AOS.init();

  // Preguntas frecuentes - cada una funciona de forma independiente (se mantiene igual)
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

  // Palabras rotativas (se mantiene igual)
  const words = ["Multiagente", "de automatización", "De centralización", "de gestión"];
  let currentWordIndex = 0;
  const rotatingWordElement = document.querySelector(".rotating-word");

  function changeWord() {
    rotatingWordElement.textContent = words[currentWordIndex];
    rotatingWordElement.style.animation = "none";
    void rotatingWordElement.offsetWidth;
    rotatingWordElement.style.animation = null;
    currentWordIndex = (currentWordIndex + 1) % words.length;
  }

  rotatingWordElement.addEventListener("animationend", changeWord);
  changeWord();

  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links li a:not(.login-btn)");

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + 100; // Ajusta si tu navbar es más alta o más baja

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });

        if (rotatingWordElement) {
          rotatingWordElement.textContent = words[currentWordIndex];
          rotatingWordElement.style.animation = "none";
          void rotatingWordElement.offsetWidth;
          rotatingWordElement.style.animation = null;
          currentWordIndex = (currentWordIndex + 1) % words.length;
        }
      }
    });
  });

  // Cerrar el menú al hacer clic fuera de él
  document.addEventListener("click", function (event) {
    const nav = document.getElementById("main-nav");
    const menuToggle = document.querySelector(".menu-toggle");
    if (nav && menuToggle && !nav.contains(event.target) && !menuToggle.contains(event.target)) {
      nav.classList.remove("show");
      console.log("Clic fuera del menú. Clase 'show' removida de nav:", nav ? nav.classList.contains("show") : 'nav is null');
    }
  });
});
