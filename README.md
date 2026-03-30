# Clínica Central IMA 🏥

Proyecto desarrollado como parte de la **Entrega 2 del curso de JavaScript – CoderHouse**.

El objetivo del trabajo fue construir una página web funcional para una clínica médica, aplicando conceptos fundamentales de **JavaScript**, manipulación del **DOM**, uso de **arrays de objetos**, eventos y buenas prácticas de organización del código.

---

# Descripción del proyecto

La página web representa el sitio institucional de **Clínica Central IMA**, donde los usuarios pueden visualizar las especialidades médicas disponibles y gestionar turnos médicos de forma interactiva.

El proyecto combina **HTML, CSS y JavaScript**, permitiendo generar contenido dinámicamente en la página.

---

# Funcionalidades principales

✔ Visualización dinámica de especialidades médicas  
✔ Uso de arrays de objetos para almacenar información  
✔ Renderizado de contenido en el DOM mediante JavaScript  
✔ Formulario para solicitar turnos médicos  
✔ Validaciones básicas de formulario  
✔ Diseño simple, claro y responsive  

---

# Especialidades incluidas

El sistema muestra distintas especialidades médicas:

- Clínica Médica 🩺
- Pediatría 👶
- Dermatología ✨
- Cardiología ❤️
- Traumatología 🦴
- Ginecología 🌸

Cada especialidad contiene:

- nombre de la especialidad
- médico responsable
- obra social
- icono representativo

---

# Tecnologías utilizadas

- **HTML5**
- **CSS3**
- **JavaScript (ES6)**
- Manipulación del **DOM**
- Arrays y objetos en JavaScript
- Eventos

---

# Estructura del proyecto
Entrega2-Arzamendia-js-CoderH
│
├── index.html
│ Página principal del sitio
│
├── css
│ └── styles.css
│ Estilos de la página
│
├── js
│ └── script.js
│ Lógica del proyecto y renderizado dinámico
│
└── img
└── icono2.png
Recursos gráficos del sitio


---

# Funcionamiento del JavaScript

En el archivo `script.js` se encuentra la lógica principal del proyecto.

Se utiliza un **array de objetos llamado `especialidades`**, donde cada objeto contiene la información de una especialidad médica.

Ejemplo:

```javascript
{
  id: 1,
  nombre: "Clínica Médica",
  doctor: "Dr. López",
  obraSocial: "OSDE",
  emoji: "🩺"
}
/*Posteriormente, estos datos se renderizan dinámicamente en la página mediante funciones que manipulan el DOM.*/