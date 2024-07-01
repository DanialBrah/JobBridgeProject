document.addEventListener('DOMContentLoaded', function () {
  const usernameInput = document.getElementById('floatingUsername');
  const emailInput = document.getElementById('floatingEmail');
  const passwordInput = document.getElementById('floatingPassword');
  const confirmPasswordInput = document.getElementById('floatingConfirmPassword');
  const adminKeyInput = document.getElementById('floatingAdminKey');
  const submitBtn = document.getElementById('submitBtn');
  const roleInputs = document.querySelectorAll('input[name="role"]');

  const validFeedbackUsername = document.querySelector('.valid-feedback-username');
  const invalidFeedbackUsername = document.querySelector('.invalid-feedback-username');
  const validFeedbackEmail = document.querySelector('.valid-feedback-email');
  const invalidFeedbackEmail = document.querySelector('.invalid-feedback-email');
  const invalidFeedbackPassword = document.querySelector('.invalid-feedback-password');
  const invalidFeedbackConfirmPassword = document.querySelector('.invalid-feedback-confirm-password');
  const invalidFeedbackAdminKey = document.querySelector('.invalid-feedback-admin-key');

  const validateUsername = async () => {
    const username = usernameInput.value;
    if (username.length >= 5) {
      const isUnique = await checkUsernameUnique(username);
      if (isUnique) {
        validFeedbackUsername.classList.add('d-block');
        invalidFeedbackUsername.classList.remove('d-block');
        return true;
      } else {
        invalidFeedbackUsername.textContent = "Username already taken.";
        invalidFeedbackUsername.classList.add('d-block');
        validFeedbackUsername.classList.remove('d-block');
        return false;
      }
    } else {
      invalidFeedbackUsername.textContent = "Username should have at least 5 characters.";
      invalidFeedbackUsername.classList.add('d-block');
      validFeedbackUsername.classList.remove('d-block');
      return false;
    }
  };

  const validateEmail = async () => {
    const email = emailInput.value;
    const emailPattern1 = /^[^\s@]+@(qq\.com|163\.com|gmail\.com|yahoo\.com|hotmail\.com|live\.com|outlook\.com)$/;
    const emailPattern2 = /^[^\s@]+@graduate\.utm\.my$/;
    if (emailPattern1.test(email) || emailPattern2.test(email)) {
      const uniqueEmail = await checkEmailUnique(email);
      if (uniqueEmail) {
        validFeedbackEmail.classList.add('d-block');
        invalidFeedbackEmail.classList.remove('d-block');
        return true;
      } else {
        invalidFeedbackEmail.textContent = "Email already taken.";
        invalidFeedbackEmail.classList.add('d-block');
        validFeedbackEmail.classList.remove('d-block');
        return false;
      }
    } else {
      invalidFeedbackEmail.textContent = "Please enter a valid email!";
      invalidFeedbackEmail.classList.add('d-block');
      validFeedbackEmail.classList.remove('d-block');
      return false;
    }
  };

  const validatePassword = () => {
    const password = passwordInput.value;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (passwordPattern.test(password)) {
      invalidFeedbackPassword.classList.remove('d-block');
      return true;
    } else {
      invalidFeedbackPassword.classList.add('d-block');
      return false;
    }
  };

  const validateConfirmPassword = () => {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    if (password === confirmPassword) {
      invalidFeedbackConfirmPassword.classList.remove('d-block');
      return true;
    } else {
      invalidFeedbackConfirmPassword.classList.add('d-block');
      return false;
    }
  };

  const validateAdminKey = () => {
    const adminKey = adminKeyInput.value;
    const validAdminKey = "adm_K3y_2024_$ecur3_Ex4mpl3_9876543210";
    if (roleInputs[2].checked && adminKey !== validAdminKey) {
      invalidFeedbackAdminKey.classList.add('d-block');
      return false;
    } else {
      invalidFeedbackAdminKey.classList.remove('d-block');
      return true;
    }
  };

  const validateForm = async () => {
    const isUsernameValid = await validateUsername();
    const isEmailValid = await validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isAdminKeyValid = validateAdminKey();

    if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isAdminKeyValid) {
      submitBtn.removeAttribute('disabled');
    } else {
      submitBtn.setAttribute('disabled', 'true');
    }
  };

  usernameInput.addEventListener('input', validateUsername);
  emailInput.addEventListener('input', validateEmail);
  passwordInput.addEventListener('input', validatePassword);
  confirmPasswordInput.addEventListener('input', validateConfirmPassword);
  adminKeyInput.addEventListener('input', validateAdminKey);

  usernameInput.addEventListener('input', validateForm);
  emailInput.addEventListener('input', validateForm);
  passwordInput.addEventListener('input', validateForm);
  confirmPasswordInput.addEventListener('input', validateForm);
  adminKeyInput.addEventListener('input', validateForm);
  roleInputs.forEach(input => input.addEventListener('change', function() {
    if (this.value === 'admin') {
      adminKeyInput.removeAttribute('disabled');
      adminKeyInput.setAttribute('required', 'true');
    } else {
      adminKeyInput.setAttribute('disabled', 'true');
      adminKeyInput.removeAttribute('required');
    }
    validateForm();
  }));

  async function checkUsernameUnique(username) {
    try {
      const response = await fetch('./Backend/check_username.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
      });
      const result = await response.json();
      return result.available;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  }

  async function checkEmailUnique(email) {
    try {
      const response = await fetch('./Backend/check_email.php' , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      const result = await response.json();
      return result.available;
    }
    catch(error) {
      console.error('Error: ', error);
      return false;
    }
  }
});

// Toggle password visibility
function togglePassword(id) {
  const input = document.getElementById(id);
  const togglePassword = input.nextElementSibling;
  const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
  input.setAttribute('type', type);
  togglePassword.classList.toggle('fa-eye');
  togglePassword.classList.toggle('fa-eye-slash');
}
