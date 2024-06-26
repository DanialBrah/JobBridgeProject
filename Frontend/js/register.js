document.addEventListener('DOMContentLoaded', function () {
  const usernameInput = document.getElementById('floatingUsername');
  const emailInput = document.getElementById('floatingEmail');
  const passwordInput = document.getElementById('floatingPassword');
  const confirmPasswordInput = document.getElementById('floatingConfirmPassword');
  const adminKeyInput = document.getElementById('floatingAdminKey');
  const submitBtn = document.getElementById('submitBtn');

  const validFeedbackUsername = document.querySelector('.valid-feedback-username');
  const invalidFeedbackUsername = document.querySelector('.invalid-feedback-username');
  const validFeedbackEmail = document.querySelector('.valid-feedback-email');
  const invalidFeedbackEmail = document.querySelector('.invalid-feedback-email');
  const invalidFeedbackPassword = document.querySelector('.invalid-feedback-password');
  const invalidFeedbackConfirmPassword = document.querySelector('.invalid-feedback-confirm-password');
  const invalidFeedbackAdminKey = document.querySelector('.invalid-feedback-admin-key');

  const validateUsername = () => {
    const username = usernameInput.value;
    if (username.length >= 5) {
      validFeedbackUsername.classList.remove('d-none');
      invalidFeedbackUsername.classList.add('d-none');
      return true;
    } else {
      validFeedbackUsername.classList.add('d-none');
      invalidFeedbackUsername.classList.remove('d-none');
      return false;
    }
  };

  const validateEmail = () => {
    const email = emailInput.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email)) {
      validFeedbackEmail.classList.remove('d-none');
      invalidFeedbackEmail.classList.add('d-none');
      return true;
    } else {
      validFeedbackEmail.classList.add('d-none');
      invalidFeedbackEmail.classList.remove('d-none');
      return false;
    }
  };

  const validatePassword = () => {
    const password = passwordInput.value;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (passwordPattern.test(password)) {
      invalidFeedbackPassword.classList.add('d-none');
      return true;
    } else {
      invalidFeedbackPassword.classList.remove('d-none');
      return false;
    }
  };

  const validateConfirmPassword = () => {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    if (password === confirmPassword) {
      invalidFeedbackConfirmPassword.classList.add('d-none');
      return true;
    } else {
      invalidFeedbackConfirmPassword.classList.remove('d-none');
      return false;
    }
  };

  const validateAdminKey = () => {
    const adminKey = adminKeyInput.value;
    const validAdminKey = "adm_K3y_2024_$ecur3_Ex4mpl3_9876543210";
    if (adminKey === "" || adminKey === validAdminKey) {
      invalidFeedbackAdminKey.classList.add('d-none');
      return true;
    } else {
      invalidFeedbackAdminKey.classList.remove('d-none');
      return false;
    }
  };

  const togglePassword = (id = 'floatingPassword') => {
    const passwordField = document.getElementById(id);
    const toggleIcon = document.getElementById(id === 'floatingPassword' ? 'togglePassword' : 'toggleConfirmPassword');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    toggleIcon.classList.toggle('fa-eye-slash');
  };

  const validateForm = () => {
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
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
});
