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

function updateCounter() {
  const length = messageInput.value.length;
  counter.textContent = `${length} / ${MAX_CHARS}`;
  validateFields();
}

requiredFields.forEach(field => {
  field.addEventListener("input", updateCounter);
});



form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (submitBtn.disabled) {
    validateFields();
    return;
  }

  snackbar.textContent = "¡Mensaje enviado con éxito!";
  snackbar.classList.add("show");
    form.reset();
    updateCounter();
  setTimeout(() => {
    snackbar.classList.remove("show");
    errorDiv.textContent = "";
  }, 3000);
});



updateCounter();
