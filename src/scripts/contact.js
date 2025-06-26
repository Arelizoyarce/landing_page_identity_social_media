// Validación de formulario de contacto con contador de caracteres y feedback visual

const form = document.getElementById("contact-form");
const messageInput = document.getElementById("message");
const counter = document.getElementById("message-counter");
const submitBtn = document.getElementById("submit-btn");
const errorDiv = document.getElementById("form-error");
const snackbar = document.getElementById("snackbar");
const MAX_CHARS = 250;

const requiredFields = [
  document.getElementById("name"),
  document.getElementById("phone"),
  document.getElementById("email"),
  document.getElementById("subject"),
  messageInput,
];

// Verifica si todos los campos están llenos y si el mensaje no excede el límite
function validateFields() {
  let allFilled = true;
  let messageTooLong = false;

  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      allFilled = false;
    }
  });

  if (messageInput.value.length > MAX_CHARS) {
    messageTooLong = true;
  }

  if (messageTooLong) {
    messageInput.classList.add("error");
    counter.classList.add("error");
    errorDiv.textContent = `El mensaje no debe superar los ${MAX_CHARS} caracteres.`;
    errorDiv.style.color = "red";
  } else {
    messageInput.classList.remove("error");
    counter.classList.remove("error");
    if (allFilled) {
      errorDiv.textContent = "";
      errorDiv.style.color = "black";
    }
  }
  submitBtn.disabled = !(allFilled && !messageTooLong);
}

// Actualiza el contador de caracteres y valida el formulario
function updateCounter() {
  const length = messageInput.value.length;
  counter.textContent = `${length} / ${MAX_CHARS}`;
  validateFields();
}

// Agrega eventos a los campos para validar al escribir
requiredFields.forEach(field => {
  field.addEventListener("input", updateCounter);
});

// Maneja el envío del formulario con retroalimentación visual
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (submitBtn.disabled) {
    validateFields();
    return;
  }

  const formData = {
    name: form.name.value.trim(),
    phone: form.phone.value.trim(),
    email: form.email.value.trim(),
    subject: form.subject.value.trim(),
    message: form.message.value.trim()
  };

  try {
    const response = await fetch("https://identity.42web.io/backend/contacto.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const text = await response.text();
    snackbar.textContent = text;
    snackbar.classList.add("show");
    snackbar.style.backgroundColor ="green"
    if (response.ok) {
      form.reset();
      updateCounter();
    }

    setTimeout(() => {
      snackbar.classList.remove("show");
      errorDiv.textContent = "";
    }, 3000);
  } catch (error) {
    snackbar.textContent = "Error al enviar el mensaje.";
    snackbar.classList.add("show");
    snackbar.style.backgroundColor ="red"
  }
});


// Inicializa contador al cargar
updateCounter();
