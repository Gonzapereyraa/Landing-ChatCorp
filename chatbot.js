document.addEventListener("DOMContentLoaded", function () {
  const chatBubble = document.getElementById("chat-bubble");
  const chatBox = document.getElementById("chat-box");
  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.getElementById("chat-messages");
  const closeButton = document.getElementById("close-chat");
  const sendMessageButton = document.getElementById("send-message");

  // Al cargar la página, aseguramos que el chat esté oculto
  chatBox.style.display = "none"; // El chat está oculto al inicio
    
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

  // Función para enviar mensaje cuando se hace clic en la flecha
  function enviarMensaje() {
    if (chatInput.value.trim() !== "") {
      const userMessage = chatInput.value.trim();
      mostrarMensaje("Tú", userMessage, "user");
      chatInput.value = "";
      responderAlUsuario(userMessage.toLowerCase());
    }
  }

  // Función para mostrar los mensajes en el chat
  function mostrarMensaje(remitente, texto, tipo) {
    const mensaje = document.createElement("div");
    mensaje.className = "chat-message " + tipo;
    mensaje.innerHTML = `<strong>${remitente}:</strong> ${texto}`;
    chatMessages.appendChild(mensaje);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Función para calcular la distancia de Levenshtein
  function levenshteinDistance(a, b) {
      const matrix = [];
    
      for (let i = 0; i <= b.length; i++) {
          matrix[i] = [i];
      }
    
      for (let j = 0; j <= a.length; j++) {
          matrix[0][j] = j;
      }
    
      for (let i = 1; i <= b.length; i++) {
          for (let j = 1; j <= a.length; j++) {
              if (b.charAt(i - 1) == a.charAt(j - 1)) {
                  matrix[i][j] = matrix[i - 1][j - 1];
              } else {
                  matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                                          Math.max(matrix[i][j - 1] + 1, // insertion
                                                   matrix[i - 1][j] + 1)); // deletion
              }
          }
      }
    
      return matrix[b.length][a.length];
  }

  // Función que genera la respuesta del chatbot
  function responderAlUsuario(mensaje) {
    let respuesta = "Lo siento, no entendí tu pregunta. ¿Podés reformularla?";
    // Umbral de similitud más estricto, o adaptable.
    // Un umbral de 0 significa coincidencia exacta.
    // Un umbral de 1 o 2 es para errores tipográficos leves.
    const umbralBaseSimilitud = 1; 
    
    let mejorCoincidenciaDistancia = Infinity;
    let mejorRespuesta = respuesta;
    let coincidenciaExactaEncontrada = false;

    // Respuestas personalizadas
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
        palabrasClave: ["ubicación", "dirección", "dónde están", "ubicados",], 
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

    // Normalizar el mensaje del usuario dividiéndolo en palabras
    const palabrasMensajeUsuario = mensaje.split(/\s+/);

    // Buscar respuesta usando Levenshtein Distance y coincidencia de palabras
    for (let i = 0; i < respuestas.length; i++) {
      for (let palabraClave of respuestas[i].palabrasClave) {
        // Primero, verificar si hay una coincidencia exacta de la palabra clave completa
        if (mensaje.includes(palabraClave)) {
          mejorRespuesta = respuestas[i].respuesta;
          coincidenciaExactaEncontrada = true;
          break; // Salir del bucle interno, ya encontramos una coincidencia exacta
        }

        // Si no hay coincidencia exacta, revisar palabras individuales con Levenshtein
        for (let palabraUsuario of palabrasMensajeUsuario) {
          const distancia = levenshteinDistance(palabraUsuario, palabraClave);
          
          // Definir un umbral de similitud adaptable.
          // Para palabras clave más cortas (ej. "dos"), el umbral debe ser 0 o 1.
          // Para palabras clave más largas, puede ser un poco más permisivo.
          let umbralActual = umbralBaseSimilitud;
          if (palabraClave.length > 4) { // Por ejemplo, palabras de 5 o más letras
              umbralActual = Math.min(Math.floor(palabraClave.length / 3), 2); // Hasta 2 errores para palabras largas
          }
          if (palabraClave.length <= 3) { // Para palabras muy cortas como "dos"
              umbralActual = 0; // Exige coincidencia exacta o casi exacta
          }

          if (distancia <= umbralActual && distancia < mejorCoincidenciaDistancia) {
              mejorCoincidenciaDistancia = distancia;
              mejorRespuesta = respuestas[i].respuesta;
              // No rompemos aquí para seguir buscando la mejor coincidencia posible
              // si hay varias palabras clave que pueden coincidir.
          }
        }
      }
      if (coincidenciaExactaEncontrada) break; // Si ya encontramos una coincidencia exacta, salir
    }

    setTimeout(() => {
      mostrarMensaje("Bot", mejorRespuesta, "bot");
    }, 500);
  }

  // Función para alternar la visibilidad del chat
  function toggleChat() {
    if (chatBox.style.display === "flex") {
      chatBox.style.opacity = "0";
      chatBox.style.transform = "scale(0.8)";
      setTimeout(() => {
        chatBox.style.display = "none";  // Ocultar después de la animación
      }, 300); // Tiempo igual a la duración de la transición
    } else {
      chatBox.style.display = "flex";
      setTimeout(() => {
        chatBox.style.opacity = "1";
        chatBox.style.transform = "scale(1)";
      }, 10);  // Un pequeño retraso para que la transición se vea
    }
  }
});