let generatedCode = ""; // Almacena el código generado para verificación

// Función para cambiar entre secciones (Login, Registro, Verificación)
function showSection(section) {
  document.getElementById("login-section").style.display = "none";
  document.getElementById("register-section").style.display = "none";
  document.getElementById("verify-section").style.display = "none";

  document.getElementById(section + "-section").style.display = "block";
}

// Login
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("login-username").value;
  alert(`Bienvenido, ${username}!`);
});

// Registro
document.getElementById("register-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("register-email").value;
  const username = document.getElementById("register-username").value;

  // Generamos un código aleatorio de 6 dígitos
  generatedCode = Math.floor(100000 + Math.random() * 900000).toString();

  // Enviamos el código a través de EmailJS
  emailjs.send("service_3rlzr6t", "template_woa47bv", {
    username: username,
    code: generatedCode,
    to_email: email
  }).then(function(response) {
    console.log("Correo enviado:", response.status);
    showSection("verify"); // Cambiamos a la sección de verificación
  }, function(error) {
    console.error("Error al enviar el correo:", error);
    alert("Ocurrió un error al enviar el código. Intenta de nuevo.");
  });
});

// Verificación
document.getElementById("verify-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const inputCode = document.getElementById("verification-code").value;

  // Comparamos el código ingresado con el generado
  if (inputCode === generatedCode) {
    alert("¡Registro exitoso!");
    showSection("login"); // Cambiamos a la sección de login
  } else {
    alert("Código incorrecto. Intenta de nuevo.");
  }
});
