/**
  ===================================
 Clínica Central IMA
  ===================================
 */

// ---- DATOS DE ESPECIALIDADES ---- *
const especialidades = [
  {
    id: 1, nombre: "Clínica Médica",
    doctor: "Dr. López",
    obraSocial: "OSDE",
    emoji: "🩺",
    bgColor: "#dbeafe",
    textColor: "#2563eb"
  },

  {
    id: 2,
    nombre: "Pediatría",
    doctor: "Dra. Santucho",
    obraSocial: "Swiss Medical",
    emoji: "👶",
    bgColor: "#fce7f3",
    textColor: "#db2777"
  },

  {
    id: 3,
    nombre: "Dermatología",
    doctor: "Dr. Duarte",
    obraSocial: "Galeno",
    emoji: "✨",
    bgColor: "#fef3c7",
    textColor: "#d97706"
  },

  {
    id: 4,
    nombre: "Cardiología",
    doctor: "Dra. Juárez",
    obraSocial: "Medifé",
    emoji: "❤️",
    bgColor: "#fee2e2",
    textColor: "#dc2626"
  },

  {
    id: 5,
    nombre: "Traumatología",
    doctor: "Dr. Zapata",
    obraSocial: "IOMA",
    emoji: "🦴",
    bgColor: "#d1fae5",
    textColor: "#059669"
  },

  {
    id: 6,
    nombre: "Neurología",
    doctor: "Dra. Luz Arzamendia",
    obraSocial: "Todas",
    emoji: "🧠",
    bgColor: "#f3e8ff",
    textColor: "#7c3aed"
  }
];

// ---- LOCAL STORAGE ----
function getUsers() {
  return JSON.parse(localStorage.getItem("clinica_users") || "[]"); //Si no hay usuarios guardados, devuelve un array vacío en lugar de null, evitando errores al intentar acceder a propiedades de null.
}

function saveUsers(users) {
  localStorage.setItem("clinica_users", JSON.stringify(users)); //Convierte el array de usuarios en una cadena JSON para almacenarlo en localStorage, ya que localStorage solo puede almacenar cadenas de texto.
}

function getAppointments() {
  return JSON.parse(localStorage.getItem("clinica_appointments") || "[]"); //Si no hay turnos guardados, devuelve un array vacío en lugar de null, evitando errores al intentar acceder a propiedades de null.
}

function saveAppointments(appointments) {
  localStorage.setItem("clinica_appointments", JSON.stringify(appointments)); //Convierte el array de turnos en una cadena JSON para almacenarlo en localStorage, ya que localStorage solo puede almacenar cadenas de texto.
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("clinica_current_user") || "null");
}

function saveCurrentUser(user) { //
  localStorage.setItem("clinica_current_user", JSON.stringify(user));
}

function clearCurrentUser() {
  localStorage.removeItem("clinica_current_user"); //Elimina la clave "clinica_current_user" del localStorage, cerrando efectivamente la sesión del usuario.
}

// ---- UTILIDADES ----
function normalizeText(texto) {
  return texto.trim().replace(/\s+/g, " ");
}

function onlyNumbers(texto) {
  return texto.replace(/\D/g, "");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

// ---- TOAST (notificaciones) ----
function showToast(message, type = "success") {
  const toast = document.getElementById("toast"); // Obtiene el elemento del DOM con el id "toast" y lo asigna a la variable toast. Este elemento se utilizará para mostrar mensajes emergentes (toasts) al usuario.
  if (!toast) return;

  toast.textContent = message;
  toast.className = `toast ${type} show`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// ---- RENDER DE ESPECIALIDADES ----
function renderSpecialties() { //
  const grid = document.querySelector(".specialties-grid");
  if (!grid) return;

  grid.innerHTML = especialidades
    .map(
      (esp) => `
      <div class="specialty-card">
        <div class="specialty-icon" style="background:${esp.bgColor}; color:${esp.textColor}">
          ${esp.emoji}
        </div>
        <h3>${esp.nombre}</h3>
        <p class="doctor">${esp.doctor}</p>
        <span class="specialty-badge">Obra social: ${esp.obraSocial}</span>
      </div>
    `
    )
    .join("");
}

// ---- SELECT DE ESPECIALIDADES ----
function populateSpecialtySelect() { // Función que se encarga de llenar el menú desplegable del formulario de turnos con las especialidades médicas disponibles, permitiendo a los usuarios seleccionar la especialidad para la cual desean reservar un turno.
  const select = document.getElementById("specialty");
  if (!select) return;

  especialidades.forEach((esp) => { //
    const option = document.createElement("option");
    option.value = esp.nombre;
    option.textContent = `${esp.nombre} - ${esp.doctor}`;
    select.appendChild(option);
  });
}

// ---- MENÚ MÓVIL ----
function setupMobileMenu() {
  const btn = document.getElementById("mobileMenuBtn");
  const links = document.getElementById("navLinks");

  if (!btn || !links) return;

  btn.addEventListener("click", () => {
    links.classList.toggle("open");
  });

  links.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
    });
  });
}

// ---- NAVEGACIÓN ACTIVA ----
function setupActiveNav() { //Se encarga de resaltar el enlace de navegación activo en la barra de navegación,tanto al hacer clic en los enlaces como al desplazarse por las secciones de la página, proporcionando una mejor experiencia de usuario al indicar claramente en qué sección se encuentra actualmente.
  const links = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  if (!links.length || !sections.length) return; // Verifica que existan enlaces de navegación y secciones con id antes de continuar, evitando errores si alguno de estos elementos no está presente en el DOM.

  links.forEach((link) => {
    link.addEventListener("click", () => {
      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  const observer = new IntersectionObserver( // Crea un nuevo IntersectionObserver, que es una API de JavaScript que permite detectar cuándo un elemento entra o sale del viewport (área visible) del navegador. En este caso, se utiliza para observar las secciones de la página y actualizar el enlace de navegación activo en consecuencia.
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach((l) => l.classList.remove("active"));

          const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
          if (activeLink) {
            activeLink.classList.add("active");
          }
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => observer.observe(section));
}

// ---- RENDER DE TURNOS EN PANTALLA ----
function renderAppointments() {
  const appointmentsList = document.getElementById("appointmentsList");
  if (!appointmentsList) return;

  const appointments = getAppointments();

  if (appointments.length === 0) {
    appointmentsList.innerHTML = `
      <div class="empty-state">
        <p>No hay turnos registrados todavía.</p>
      </div>
    `;
    return;
  }

  appointmentsList.innerHTML = appointments  //appointments.map(...) => itera sobre cada turno en el array de turnos y genera un bloque de HTML para cada uno, utilizando las propiedades del turno (como name, dni, specialty, date y time) para llenar el contenido del bloque. Luego, .join("") se utiliza para unir todos los bloques generados en una sola cadena de HTML que se asigna al innerHTML del elemento appointmentsList, mostrando así la lista de turnos en la página.
    .map(
      (appointment) => `
      <article class="appointment-card">
        <div class="appointment-card-header">
          <h4>${appointment.name}</h4>
          <span class="appointment-badge">${appointment.specialty}</span>
        </div>

        <div class="appointment-card-body">
          <p><strong>DNI:</strong> ${appointment.dni}</p>
          <p><strong>Fecha:</strong> ${formatDate(appointment.date)}</p>
          <p><strong>Horario:</strong> ${appointment.time} hs</p>
        </div>
      </article>
    `
    )
    .join("");
}

// ---- SESIÓN ACTIVA VISIBLE ----
function renderSession() {
  const sessionPanel = document.getElementById("sessionPanel");
  const sessionUserText = document.getElementById("sessionUserText");
  const currentUser = getCurrentUser();

  if (!sessionPanel || !sessionUserText) return;

  if (currentUser) {
    sessionPanel.classList.remove("hidden");
    sessionUserText.textContent = `${currentUser.name} ${currentUser.lastname} (${currentUser.email})`;
  } else {
    sessionPanel.classList.add("hidden");
    sessionUserText.textContent = "";
  }
}

// ---- FORMULARIO DE TURNOS ----
function setupAppointmentForm() {
  const form = document.getElementById("appointmentForm");
  const clearAppointmentsBtn = document.getElementById("clearAppointmentsBtn");
  const dateInput = document.getElementById("appointmentDate");

  if (!form || !dateInput) return;

  dateInput.min = new Date().toISOString().split("T")[0]; // Establece la fecha mínima seleccionable en el campo de fecha del formulario de turnos, utilizando la fecha actual formateada en el formato "YYYY-MM-DD". Esto evita que los usuarios puedan seleccionar fechas pasadas para reservar un turno, asegurando que solo puedan elegir fechas futuras o la fecha actual para sus citas médicas.

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const appointment = {
      id: Date.now(),
      name: normalizeText(document.getElementById("patientName").value),
      dni: onlyNumbers(document.getElementById("patientDni").value),
      specialty: document.getElementById("specialty").value,
      date: document.getElementById("appointmentDate").value,
      time: document.getElementById("appointmentTime").value,
    };

    if (!appointment.name || !appointment.dni || !appointment.specialty || !appointment.date || !appointment.time) {
      showToast("Completá todos los campos", "error");
      return;
    }

    if (appointment.name.length < 3) {
      showToast("Ingresá un nombre válido", "error");
      return;
    }

    if (appointment.dni.length < 7 || appointment.dni.length > 8) {
      showToast("El DNI debe tener entre 7 y 8 números", "error");
      return;
    }

    const appointments = getAppointments();

    const appointmentExists = appointments.some(
      (item) =>
        item.dni === appointment.dni &&
        item.date === appointment.date &&
        item.time === appointment.time
    );

    if (appointmentExists) {
      showToast("Ya existe un turno para ese DNI en esa fecha y horario", "error");
      return;
    }

    appointments.push(appointment);
    saveAppointments(appointments);
    renderAppointments();

    showToast(`✅ Turno confirmado: ${appointment.specialty} el ${formatDate(appointment.date)} a las ${appointment.time}`);
    form.reset();
  });

  if (clearAppointmentsBtn) {
    clearAppointmentsBtn.addEventListener("click", () => {
      const appointments = getAppointments();

      if (appointments.length === 0) {
        showToast("No hay turnos para eliminar", "error");
        return;
      }

      localStorage.removeItem("clinica_appointments");
      renderAppointments();
      showToast("Se eliminaron todos los turnos guardados");
    });
  }
}

// ---- TABS DEL PORTAL ----
function setupPortalTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  if (!tabs.length || !registerForm || !loginForm) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      if (tab.dataset.tab === "register") {
        registerForm.classList.remove("hidden");
        loginForm.classList.add("hidden");
      } else {
        registerForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
      }
    });
  });
}

// ---- REGISTRO DE PACIENTE ----
function setupRegisterForm() {
  const form = document.getElementById("registerForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = {
      name: normalizeText(document.getElementById("regName").value),
      lastname: normalizeText(document.getElementById("regLastname").value),
      email: document.getElementById("regEmail").value.trim().toLowerCase(),
      dni: onlyNumbers(document.getElementById("regDni").value),
      obraSocial: document.getElementById("regObraSocial").value || "Sin obra social",
      password: document.getElementById("regPassword").value.trim(),
    };

    if (!user.name || !user.lastname || !user.email || !user.dni || !user.password) {
      showToast("Completá todos los campos obligatorios", "error");
      return;
    }

    if (user.name.length < 2 || user.lastname.length < 2) {
      showToast("Nombre y apellido deben tener al menos 2 caracteres", "error");
      return;
    }

    if (!isValidEmail(user.email)) {
      showToast("Ingresá un email válido", "error");
      return;
    }

    if (user.dni.length < 7 || user.dni.length > 8) {
      showToast("El DNI debe tener entre 7 y 8 números", "error");
      return;
    }

    if (user.password.length < 6) {
      showToast("La contraseña debe tener al menos 6 caracteres", "error");
      return;
    }

    const users = getUsers();

    const emailExists = users.some((u) => u.email === user.email);
    if (emailExists) {
      showToast("Este email ya está registrado", "error");
      return;
    }

    const dniExists = users.some((u) => u.dni === user.dni);
    if (dniExists) {
      showToast("Este DNI ya está registrado", "error");
      return;
    }

    users.push(user);
    saveUsers(users);

    showToast(`✅ Cuenta creada para ${user.name} ${user.lastname}`);
    form.reset();
  });
}

// ---- LOGIN ----
function setupLoginForm() {
  const form = document.getElementById("loginForm");
  const logoutBtn = document.getElementById("logoutBtn");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim().toLowerCase();
      const password = document.getElementById("loginPassword").value.trim();

      if (!email || !password) {
        showToast("Completá email y contraseña", "error");
        return;
      }

      const users = getUsers();
      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        saveCurrentUser(user);
        renderSession();
        showToast(`👋 ¡Bienvenido/a, ${user.name}!`);
        form.reset();
      } else {
        showToast("Email o contraseña incorrectos", "error");
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      clearCurrentUser();
      renderSession();
      showToast("Sesión cerrada correctamente");
    });
  }
}

// ---- SCROLL SUAVE ----
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// ---- INICIALIZACIÓN ----
document.addEventListener("DOMContentLoaded", () => {
  renderSpecialties();
  populateSpecialtySelect();
  renderAppointments();
  renderSession();

  setupMobileMenu();
  setupActiveNav();
  setupAppointmentForm();
  setupPortalTabs();
  setupRegisterForm();
  setupLoginForm();
  setupSmoothScroll();
});