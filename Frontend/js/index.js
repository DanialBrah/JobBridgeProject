document.getElementById('floatingInput').addEventListener('input', function () {
  let emailInput = this;
  let emailValue = emailInput.value;

  let emailPattern1 = /^[^\s@]+@(qq\.com|163\.com|gmail\.com|yahoo\.com|hotmail\.com|live\.com|outlook\.com)$/;
  let emailPattern2 = /^[^\s@]+@graduate\.utm\.my$/;

  if (emailPattern1.test(emailValue) || emailPattern2.test(emailValue)) {
    emailInput.classList.remove('is-invalid');
    emailInput.classList.add('is-valid');
    document.querySelector('.invalid-feedback-email').classList.add('d-none');
    document.querySelector('.valid-feedback-email').classList.remove('d-none');
  } else {
    emailInput.classList.remove('is-valid');
    emailInput.classList.add('is-invalid');
    document.querySelector('.valid-feedback-email').classList.add('d-none');
    document.querySelector('.invalid-feedback-email').classList.remove('d-none');
  }
});


// Ensure the form is properly validated before submission
document.querySelector('form').addEventListener('submit', function (event) {
  if (!this.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }
  this.classList.add('was-validated');
});

// Toggle password visibility
function togglePassword() {
  let passwordInput = document.getElementById('floatingPassword');
  let togglePassword = document.getElementById('togglePassword');
  let type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);

  togglePassword.classList.toggle('fa-eye');
  togglePassword.classList.toggle('fa-eye-slash');
}

document.getElementById('signInForm').addEventListener('submit', function (event) {
event.preventDefault(); // Prevent the default form submission

if (this.checkValidity()) {
  const selectedOption = document.querySelector('input[name="gridRadios"]:checked').value;
  window.location.href = selectedOption; // Redirect to the selected option's value
} else {
  event.stopPropagation();
}

this.classList.add('was-validated');
});