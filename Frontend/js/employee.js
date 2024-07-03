(function () {
  'use strict';

  // Validation function for inputs with minimum character requirement
  function validateMinLength(input, minLength) {
    if (input.value.length >= minLength) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
    } else {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
    }
  }

  // Validation function for email
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

  // Validation function for phone number
  function validatePhone(input) {
    var phonePattern = /^[0-9]{8,15}$/;
    if (phonePattern.test(input.value)) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
    } else {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
    }
  }


  // Validation function for checkboxes
  function validateCheckbox(input) {
    if (input.checked) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      input.nextElementSibling.nextElementSibling.style.display = 'none';
    } else {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
      input.nextElementSibling.nextElementSibling.style.display = 'block';
    }
  }

  // document.getElementById('upload-file').addEventListener('change', validateResume);

  // Input event listeners
  document.getElementById('fullName').addEventListener('input', function () {
    validateMinLength(this, 5);
  });

  document.getElementById('email').addEventListener('input', function () {
    validateEmail(this);
  });
-
  document.getElementById('phone').addEventListener('input', function () {
    validatePhone(this);
  });

  document.getElementById('jobTitle').addEventListener('input', function () {
    validateMinLength(this, 5);
  });

  document.getElementById('salary').addEventListener('input', function () {
    if (this.value > 0) {
      this.classList.remove('is-invalid');
      this.classList.add('is-valid');
    } else {
      this.classList.remove('is-valid');
      this.classList.add('is-invalid');
    }
  });

  document.getElementById('country').addEventListener('input', function () {
    validateMinLength(this, 2);
  });

  document.getElementById('cityState').addEventListener('input', function () {
    validateMinLength(this, 2);
  });

  // Form submit event
  form.addEventListener('submit', function (event) {
    var inputs = form.querySelectorAll('input[required], select[required]');
    inputs.forEach(function (input) {
      if (input.value === '' || input.classList.contains('is-invalid')) {
        input.classList.add('is-invalid');
        event.preventDefault();
        event.stopPropagation();
      }
    });

    validateCheckbox(document.getElementById('readyForWork'));
    validateCheckbox(document.getElementById('whatsappNotification'));

    if (form.checkValidity() === false) { 
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  }, false);

})();
