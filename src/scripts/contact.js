// Validación de formulario de contacto con contador de caracteres y feedback visual

const form = document.getElementById("contact-form");
const messageInput = document.getElementById("message");
const phoneInput = document.getElementById("phone");
const counter = document.getElementById("message-counter");
const submitBtn = document.getElementById("submit-btn");
const errorDiv = document.getElementById("form-error");
const snackbar = document.getElementById("snackbar");
const MAX_CHARS = 250;

const requiredFields = [
  document.getElementById("name"),
  phoneInput,
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
    messageInput.classList.add("error");
    counter.classList.add("error");
    errorDiv.textContent = `El mensaje no debe superar los ${MAX_CHARS} caracteres.`;
    errorDiv.style.color = "red";
  } else {
    messageInput.classList.remove("error");
    counter.classList.remove("error");
    if (allFilled) {
      errorDiv.textContent = "";
    }
  }

  submitBtn.disabled = !(allFilled && !messageTooLong);
}

// Actualiza el contador de caracteres
function updateCounter() {
  const length = messageInput.value.length;
  counter.textContent = `${length} / ${MAX_CHARS}`;
}

// Agrega eventos a los campos
requiredFields.forEach(field => {
  if (field === messageInput) {
    field.addEventListener("input", () => {
      updateCounter();
      validateFields();
    });
  } else {
    field.addEventListener("input", validateFields);
  }
});

// Filtra caracteres no numéricos mientras escribe en el teléfono
phoneInput.addEventListener("input", () => {
  phoneInput.value = phoneInput.value.replace(/\D/g, "");
  validateFields();
});

// Maneja el envío del formulario
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
    snackbar.style.backgroundColor = "green";

    if (response.ok) {
      form.reset();
      updateCounter();
      submitBtn.disabled = true;
    }

    setTimeout(() => {
      snackbar.classList.remove("show");
      errorDiv.textContent = "";
    }, 3000);
  } catch (error) {
    snackbar.textContent = "Error al enviar el mensaje.";
    snackbar.classList.add("show");
    snackbar.style.backgroundColor = "red";
  }
});

// Inicializa contador y validación al cargar
updateCounter();
validateFields();
