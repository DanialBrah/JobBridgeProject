document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  function validateMinLength(input, minLength) {
    if (input.value.length >= minLength) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
    } else {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
    }
  }

  function validateEmail(input) {
    var emailPattern1 = /^[^\s@]+@(qq\.com|163\.com|gmail\.com|yahoo\.com|hotmail\.com|live\.com|outlook\.com)$/;
    var emailPattern2 = /^[^\s@]+@graduate\.utm\.my$/;

    if (emailPattern1.test(input.value) || emailPattern2.test(input.value)) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
    } else {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
    }
  }

  function validatePhone(input) {
    var phonePattern = /^[0-9]{9,12}$/;
      if (phonePattern.test(input.value)) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
      } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
      }
  }

  function validateCheckbox(input) {
    if (input.checked) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
    } else {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
    }
  }

  var form = document.getElementById('employerForm');

  document.getElementById('companyName').addEventListener('input', function () {
    validateMinLength(this, 5);
  });

  document.getElementById('company_address').addEventListener('input', function () {
    validateMinLength(this, 5);
  });

  document.getElementById('city').addEventListener('input', function () {
    validateMinLength(this, 5);
  });

  document.getElementById('state').addEventListener('input', function () {
    validateMinLength(this, 5);
  });

  document.getElementById('zip').addEventListener('input', function () {
    validateMinLength(this, 5);
  });

  document.getElementById('contactName').addEventListener('input', function () {
    validateMinLength(this, 5);
  });

  document.getElementById('contactPosition').addEventListener('input', function () {
    validateMinLength(this, 5);
  });

  document.getElementById('floatingInput').addEventListener('input', function () {
    validateEmail(this);
  });

  document.getElementById('phone').addEventListener('input', function () {
    validatePhone(this);
  });

  document.getElementById('companyOverview').addEventListener('input', function () {
    validateMinLength(this, 5);
  });

  form.addEventListener('submit', function (event) {
    var inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    var allValid = true;

    inputs.forEach(function (input) {
      if (input.value === '' || input.classList.contains('is-invalid')) {
        input.classList.add('is-invalid');
        allValid = false;
      }
    });

    validateCheckbox(document.getElementById('terms-conditions'));
    validateCheckbox(document.getElementById('privacy_policy'));

    if (!allValid || form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      form.classList.add('was-validated');
    }
  }, false);
});
