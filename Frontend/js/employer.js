document.addEventListener('DOMContentLoaded', function () {
  'use strict'

  // Custom validation for length
  function validateLength(input, minLength) {
      if (input.value.length >= minLength) {
          input.classList.remove('is-invalid');
          input.classList.add('is-valid');
          input.nextElementSibling.classList.add('d-none');
      } else {
          input.classList.remove('is-valid');
          input.classList.add('is-invalid');
          input.nextElementSibling.classList.remove('d-none');
      }
  }

  // Validation for email
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

  // Validation for phone
  document.getElementById('floatingInputPhone').addEventListener('input', function () {
      let phoneInput = this;
      let phoneValue = phoneInput.value;

      if (phoneValue.length > 6 || phoneValue.match(/[0-9]{7,}/)) {
          phoneInput.classList.remove('is-invalid');
          phoneInput.classList.add('is-valid');
          document.querySelector('.invalid-feedback-phone').classList.add('d-none');
          document.querySelector('.valid-feedback-phone').classList.remove('d-none');
      } else {
          phoneInput.classList.remove('is-valid');
          phoneInput.classList.add('is-invalid');
          document.querySelector('.valid-feedback-phone').classList.add('d-none');
          document.querySelector('.invalid-feedback-phone').classList.remove('d-none');
      }
  });

  // Validation for length > 5
  let lengthInputs = ['companyName', 'company_address', 'city', 'state', 'contactName', 'contactPosition', 'companyOverview'];
  lengthInputs.forEach(function (id) {
      document.getElementById(id).addEventListener('input', function () {
          validateLength(this, 5);
      });
  });

  // Validation for zip code (numbers only)
  function validateZipCode(zipInput) {
      let zipValue = zipInput.value;
      if (/^\d+$/.test(zipValue)) {
          zipInput.classList.remove('is-invalid');
          zipInput.classList.add('is-valid');
      } else {
          zipInput.classList.remove('is-valid');
          zipInput.classList.add('is-invalid');
      }
  }

  document.getElementById('zip').addEventListener('input', function () {
      validateZipCode(this);
  });

  // Bootstrap custom validation
  var forms = document.querySelectorAll('.needs-validation');
  Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener('submit', function (event) {
          let isValid = true;

          // Manually trigger validation on all inputs
          lengthInputs.forEach(function (id) {
              let input = document.getElementById(id);
              validateLength(input, 5);
              if (input.classList.contains('is-invalid')) {
                  isValid = false;
              }
          });

          let zipInput = document.getElementById('zip');
          validateZipCode(zipInput);
          if (zipInput.classList.contains('is-invalid')) {
              isValid = false;
          }

          if (!form.checkValidity() || !isValid) {
              event.preventDefault();
              event.stopPropagation();
          }
          form.classList.add('was-validated');
      }, false);
  });
});