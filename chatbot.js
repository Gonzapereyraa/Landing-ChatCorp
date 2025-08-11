document.addEventListener("DOMContentLoaded", function () {
  const chatBubble = document.getElementById("chat-bubble");
  const chatBox = document.getElementById("chat-box");
  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.getElementById("chat-messages");
  const closeButton = document.getElementById("close-chat");
  const sendMessageButton = document.getElementById("send-message");


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
  sendMessageButton.addEventListener("click", enviarMensaje);
  function enviarMensaje() {
    if (chatInput.value.trim() !== "") {
      const userMessage = chatInput.value.trim();
      mostrarMensaje("Tú", userMessage, "user");
      chatInput.value = "";
      responderAlUsuario(userMessage.toLowerCase());
    }
  }

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
    const umbralBaseSimilitud = 1; 
    let mejorCoincidenciaDistancia = Infinity;
    let mejorRespuesta = respuesta;
    let coincidenciaExactaEncontrada = false;
    const respuestas = [
            {
        palabrasClave: ["contacto", "teléfono", "número", "dirección", "cómo contactar"],
        respuesta: "Podés contactarnos al (+54) 260-4555450 o enviarnos un email a gonzalopereyra.1170@gmail.com."
      },
      {
        palabrasClave: ["soporte", "ayuda", "atención", "soporte técnico", "necesito ayuda"],
        respuesta: "Sí, ofrecemos soporte en todo momento. ¿Necesitas ayuda con algo específico?"
      },
     
      {
        palabrasClave: ["hola", "buenas", "qué tal", "hey", "buenos días", "buenas tardes", "buenas noches", "saludos", "hello", "hi", "holaa", "holi", "buenass", "buen día", "buen dia", "buenas noches", "buenas tardes", "good morning", "good afternoon", "good evening", "como estas", "cómo estás", "como andas", "cómo andás", "que tal", "qué tal todo", "muy buenas", "buenas buenas", "hola que tal", "hola como estas", "hola cómo estás", "aloha", "wassup", "whats up", "que onda", "qué onda", "buenas a todos", "saluditos", "un saludo", "como va", "cómo va", "todo bien", "qué pasa", "que pasa", "eyyy", "ey", "oye", "che", "holis", "holitas", "buendía", "buendia"],
        respuesta: "¡Hola! 👋 Soy tu asistente virtual. Estoy aquí para ayudarte con información sobre nuestros servicios de chatbots. ¿En qué puedo ayudarte hoy?"
      },
      { 
        palabrasClave: ["chau", "adiós", "nos vemos", "hasta luego", "bye", "goodbye", "hasta la vista", "chao", "adios", "me voy", "tengo que irme", "hasta pronto", "hasta mañana", "nos vemos luego", "see you", "see ya", "ciao", "hasta después", "me despido", "chauu", "byeee", "farewell", "catch you later", "talk to you later", "ttyl", "gotta go", "hasta otro momento", "que tengas buen día", "que tengas buen dia", "nos hablamos", "hasta la próxima", "hasta la proxima", "chaito", "chaito pescaito"],
        respuesta: "¡Hasta luego! 👋 Fue un placer ayudarte. Si necesitas algo más, no dudes en escribirme. ¡Que tengas un excelente día!"
      },
      { 
        palabrasClave: ["gracias", "muchas gracias", "te agradezco", "gracias bot", "thank you", "thanks", "grax", "graciaas", "mil gracias", "muchísimas gracias", "muy agradecido", "muy agradecida", "te lo agradezco", "agradezco", "grazie", "merci", "danke", "obrigado", "gracias por todo", "gracias por la ayuda", "gracias por la info", "gracias por la información", "thank u", "thx", "ty", "tysm", "thanks a lot", "appreciate it", "much appreciated", "gracias che", "gracias amigo", "gracias wacho", "te pasaste", "sos un genio", "buenísimo gracias", "buenisimo gracias", "perfecto gracias", "excelente gracias", "genial gracias"],
        respuesta: "¡De nada! 😊 Me alegra poder ayudarte. ¿Hay algo más en lo que pueda asistirte?"
      },
      {
        palabrasClave: ["planes", "precios", "costos", "cuánto cuesta", "qué planes tienen", "cuál es el costo", "precio", "plan", "ofertas", "que planes hay", "cuales son los planes", "cuáles son los planes", "mostrame los planes", "muéstrame los planes", "ver planes", "info de planes", "información de planes", "informacion de planes", "planes disponibles", "opciones de planes", "tipos de planes", "planes y precios", "cuanto sale", "cuánto sale", "cuanto cobran", "cuánto cobran", "que cuesta", "qué cuesta", "costo del servicio", "precios del servicio", "tarifas", "arancel", "valor", "valores", "cotización", "cotizacion", "presupuesto", "cuanto tengo que pagar", "cuánto tengo que pagar", "cuanto me sale", "cuánto me sale", "cuanto es", "cuánto es", "pricing", "price", "cost", "how much", "fees", "rates", "servicios y precios", "lista de precios", "tabla de precios", "cuadro de precios", "menu de precios", "menú de precios", "catalogo", "catálogo", "catalog", "paquetes", "packages", "bundles", "opciones", "options", "modalidades", "alternativas", "alternatives", "propuestas", "proposals"],
        respuesta: "Tenemos 3 planes principales para adaptarse a tus necesidades:\n\n💫 **Plan Starter** - $9,000/mes\n🚀 **Plan Pro** - $18,000/mes\n🏢 **Plan Empresarial** - Desde $30,000/mes\n\n¿Te gustaría conocer los detalles de algún plan específico?"
      },
      {
        palabrasClave: ["starter", "plan starter", "básico", "plan básico", "económico", "barato", "entry level", "inicial", "principiante", "empezar", "comenzar", "para empezar", "para comenzar", "más barato", "mas barato", "el más económico", "el mas economico", "low cost", "budget", "accesible", "simple", "sencillo", "mínimo", "minimo", "esencial", "básico económico", "basico economico", "entry", "basic", "cheap", "affordable", "low price", "precio bajo", "de entrada", "nivel básico", "nivel basico", "package básico", "package basico", "paquete básico", "paquete basico", "opción básica", "opcion basica", "modalidad básica", "modalidad basica", "version básica", "version basica", "versión básica", "versión basica", "estándar", "estandar", "standard", "plan económico", "plan economico", "plan accesible", "plan simple", "plan sencillo", "plan mínimo", "plan minimo", "plan esencial", "elemental", "fundamental", "introductorio", "primer nivel", "nivel uno", "level one"],
        respuesta: "📦 **Plan Starter** - $9,000/mes\n\n✅ 1 canal (WhatsApp o Web)\n✅ Respuestas automáticas básicas\n✅ Hasta 500 mensajes mensuales\n✅ Panel de administración\n✅ Configuración inicial\n\n❌ No incluye soporte personalizado\n\n¿Te interesa este plan o prefieres conocer las otras opciones?"
      },
      {
        palabrasClave: ["pro", "plan pro", "avanzado", "plan avanzado", "profesional", "premium", "intermedio", "medio", "medium", "professional", "advanced", "plus", "plan plus", "superior", "mejorado", "upgraded", "nivel pro", "nivel profesional", "modalidad pro", "modalidad profesional", "version pro", "version profesional", "versión pro", "versión profesional", "package pro", "paquete pro", "opción pro", "opcion pro", "recomendado", "más popular", "mas popular", "best seller", "más vendido", "mas vendido", "intermedio avanzado", "nivel medio", "middle tier", "mid-range", "rango medio", "categoria profesional", "categoría profesional", "pro level", "professional level", "business", "comercial", "empresarial pequeño", "pyme", "pequeña empresa", "mediana empresa", "plan comercial", "nivel comercial", "business plan", "commercial plan", "recommended", "sugerido", "aconsejado", "ideal", "perfecto", "optimal", "óptimo", "optimo", "balanced", "equilibrado", "complete", "completo", "full featured", "con todas las funciones"],
        respuesta: "🚀 **Plan Pro** - $18,000/mes\n\n✅ Hasta 3 canales simultáneos\n✅ Personalización avanzada\n✅ Mensajes ilimitados\n✅ Soporte prioritario\n✅ Integración con redes sociales\n✅ Reportes básicos\n✅ Flujos de conversación complejos\n\n¡Perfecto para empresas en crecimiento! ¿Necesitas más información?"
      },
      {
        palabrasClave: ["empresarial", "plan empresarial", "empresa", "integración crm", "plan crm", "corporativo", "enterprise", "business", "gran empresa", "empresa grande", "multinacional", "corporación", "corporacion", "compañía", "compania", "plan corporativo", "nivel empresarial", "nivel corporativo", "enterprise level", "corporate level", "business level", "executive", "ejecutivo", "premium empresarial", "plan premium", "enterprise premium", "corporate premium", "top tier", "máximo", "maximo", "completo", "total", "full", "unlimited", "ilimitado", "sin límites", "sin limites", "todo incluido", "all inclusive", "plan completo", "paquete completo", "suite completa", "solución completa", "solucion completa", "enterprise solution", "corporate solution", "business solution", "plan máximo", "plan maximo", "nivel máximo", "nivel maximo", "high-end", "top level", "superior empresarial", "avanzado empresarial", "profesional empresarial", "deluxe", "platinum", "gold", "oro", "platino", "diamond", "diamante", "ultimate", "definitivo", "supreme", "supremo", "elite", "vip", "exclusive", "exclusivo", "custom", "personalizado", "a medida", "tailored"],
        respuesta: "🏢 **Plan Empresarial** - Desde $30,000/mes\n\n✅ Canales ilimitados\n✅ Integración completa con CRM\n✅ Entrenamiento personalizado\n✅ Reportes y analítica avanzada\n✅ Implementación a medida\n✅ Soporte 24/7 dedicado\n✅ API personalizada\n✅ Backup y seguridad empresarial\n\n¿Te gustaría agendar una consulta personalizada?"
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

    const palabrasMensajeUsuario = mensaje.split(/\s+/);
    for (let i = 0; i < respuestas.length; i++) {
      for (let palabraClave of respuestas[i].palabrasClave) {
        if (mensaje.includes(palabraClave)) {
          mejorRespuesta = respuestas[i].respuesta;
          coincidenciaExactaEncontrada = true;
          break; 
        }

        for (let palabraUsuario of palabrasMensajeUsuario) {
          const distancia = levenshteinDistance(palabraUsuario, palabraClave);
          let umbralActual = umbralBaseSimilitud;
          if (palabraClave.length > 4) { 
              umbralActual = Math.min(Math.floor(palabraClave.length / 3), 2); 
          }
          if (palabraClave.length <= 3) { 
              umbralActual = 0; 
          }

          if (distancia <= umbralActual && distancia < mejorCoincidenciaDistancia) {
              mejorCoincidenciaDistancia = distancia;
              mejorRespuesta = respuestas[i].respuesta;
          }
        }
      }
      if (coincidenciaExactaEncontrada) break; 
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