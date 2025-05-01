document.addEventListener("DOMContentLoaded", function () {
  // Hamburguesa
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

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

  // Palabras rotativas
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
    }
  });
});

});
