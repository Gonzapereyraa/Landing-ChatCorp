document.addEventListener("DOMContentLoaded", function () {
  const chatBubble = document.getElementById("chat-bubble");
  const chatBox = document.getElementById("chat-box");
  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.getElementById("chat-messages");
  const closeButton = document.getElementById("close-chat");
  const sendMessageButton = document.getElementById("send-message");

  // Al cargar la página, aseguramos que el chat esté oculto
  chatBox.style.display = "none";

  // Mostrar / ocultar el chatbot
  chatBubble.addEventListener("click", toggleChat);
  closeButton.addEventListener("click", toggleChat);

  // Enviar mensaje al presionar Enter
  chatInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && chatInput.value.trim() !== "") {
      enviarMensaje();
    }
  });

  // Enviar mensaje al hacer clic en la flecha
  sendMessageButton.addEventListener("click", enviarMensaje);

  // Función para enviar mensaje
  function enviarMensaje() {
    const userMessage = chatInput.value.trim();
    if (userMessage !== "") {
      mostrarMensaje("Tú", userMessage, "user");
      chatInput.value = "";
      responderAlUsuario(userMessage.toLowerCase());
    }
  }

  // Función para mostrar mensajes
  function mostrarMensaje(remitente, texto, tipo) {
    const mensaje = document.createElement("div");
    mensaje.className = "chat-message " + tipo;
    mensaje.innerHTML = `<strong>${remitente}:</strong> ${texto}`;
    chatMessages.appendChild(mensaje);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Función que genera respuesta basada en palabras clave
  function responderAlUsuario(mensaje) {
    let respuesta = "Lo siento, no entendí tu pregunta. ¿Podés reformularla?";

    const respuestas = [
      {
        palabrasClave: ["hola", "buenas", "qué tal", "hey"],
        respuesta: "¡Hola! Soy un chatbot. ¿En qué puedo ayudarte hoy?"
      },
      {
        palabrasClave: ["planes", "precios", "costos", "cuánto cuesta", "qué planes tenes", "cuál es el costo"],
        respuesta: "Tenemos varias opciones de planes. ¿Te gustaría saber más sobre los precios?"
      },
      {
        palabrasClave: ["contacto", "teléfono", "número", "dirección", "cómo contactar"],
        respuesta: "Podés contactarnos al (+54) 260-4555450 o enviarnos un email a gonzalopereyra.1170@gmail.com."
      },
      {
        palabrasClave: ["soporte", "ayuda", "atención", "soporte técnico", "necesito ayuda"],
        respuesta: "Sí, ofrecemos soporte en todo momento. ¿Necesitas ayuda con algo específico?"
      },
      {
        palabrasClave: ["starter", "plan starter", "básico", "plan básico"],
        respuesta: "Nuestro plan Starter cuesta $9,000/mes e incluye 1 canal (WhatsApp o Web), respuestas automáticas básicas, y hasta 500 mensajes mensuales. No incluye soporte personalizado."
      },
      {
        palabrasClave: ["pro", "plan pro", "avanzado", "plan avanzado"],
        respuesta: "El plan Pro cuesta $18,000/mes e incluye hasta 3 canales, personalización avanzada, mensajes ilimitados, y soporte prioritario."
      },
      {
        palabrasClave: ["empresarial", "plan empresarial", "empresa", "integración crm", "plan crm"],
        respuesta: "El plan Empresarial comienza desde $30,000 y ofrece integración con CRM, entrenamiento personalizado, reportes y analítica, e implementación a medida."
      },
      {
        palabrasClave: ["gracias", "muchas gracias", "te agradezco", "gracias bot"],
        respuesta: "¡De nada! Estoy para ayudarte. ¿Necesitás algo más?"
      },
      {
        palabrasClave: ["ubicación", "dirección", "dónde están", "ubicados"],
        respuesta: "Nos encontramos en San Rafael, Mendoza. ¿Te gustaría saber cómo llegar?"
      },
      {
        palabrasClave: ["bot", "asistente virtual", "quién sos", "quién eres", "quién eres tú"],
        respuesta: "Soy un chatbot diseñado para ayudarte con preguntas sobre nuestros servicios. ¡Estoy aquí para ayudarte!"
      },
      {
        palabrasClave: ["preguntas frecuentes", "faqs", "frequently asked questions"],
        respuesta: "Puedes consultar las preguntas frecuentes en nuestra página. ¿Te gustaría que te las envíe?"
      },
      {
        palabrasClave: ["error", "problema", "no funciona", "no responde", "fallo"],
        respuesta: "Lo siento por el inconveniente. ¿Podrías especificar el problema para poder ayudarte?"
      },
      {
        palabrasClave: ["24hs", "disponible", "siempre", "tiempo completo", "siempre disponible"],
        respuesta: "Sí, todos nuestros bots están activos 24/7 para garantizar respuestas inmediatas a tus clientes."
      },
      {
        palabrasClave: ["Horarios", "Horario", "horario", "horarios", "disponible"],
        respuesta: "Nuestro horario de atención es de lunes a viernes de 9:00 a 18:00 hs"
      }
    ];

    for (let i = 0; i < respuestas.length; i++) {
      for (let palabra of respuestas[i].palabrasClave) {
        if (mensaje.includes(palabra.toLowerCase())) {
          respuesta = respuestas[i].respuesta;
          break;
        }
      }
      if (respuesta !== "Lo siento, no entendí tu pregunta. ¿Podés reformularla?") break;
    }

    setTimeout(() => {
      mostrarMensaje("Bot", respuesta, "bot");
    }, 500);
  }

  // Alternar visibilidad del chat
  function toggleChat() {
    if (chatBox.style.display === "flex") {
      chatBox.style.opacity = "0";
      chatBox.style.transform = "scale(0.8)";
      setTimeout(() => {
        chatBox.style.display = "none";
      }, 300);
    } else {
      chatBox.style.display = "flex";
      setTimeout(() => {
        chatBox.style.opacity = "1";
        chatBox.style.transform = "scale(1)";
      }, 10);
    }
  }
});
