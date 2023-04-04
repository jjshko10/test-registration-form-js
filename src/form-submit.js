const formEl = document.getElementById('form');
const usernameEl = document.getElementById('username');
const surnameEl = document.getElementById('surname');
const dateEl = document.getElementById('date');
const emailEl = document.getElementById('email');
const passwordEl = document.getElementById('password');
const confirmPasswordEl = document.getElementById('confirm-password');
const eyeIconPasswordEl = document.getElementById('eye-icon-password');
const eyeIconConfirmPasswordEl = document.getElementById('eye-icon-confirm-password');

dateEl.max = new Date().toISOString().split('T')[0];

eyeIconPasswordEl.addEventListener('click', () => {
  if (passwordEl.type === 'password') {
    passwordEl.type = 'text';
    eyeIconPasswordEl.src = 'assets/eye-open.svg';
  } else {
    passwordEl.type = 'password';
    eyeIconPasswordEl.src = 'assets/eye-close.svg';
  }
});

eyeIconConfirmPasswordEl.addEventListener('click', () => {
  if (confirmPasswordEl.type === 'password') {
    confirmPasswordEl.type = 'text';
    eyeIconConfirmPasswordEl.src = 'assets/eye-open.svg';
  } else {
    confirmPasswordEl.type = 'password';
    eyeIconConfirmPasswordEl.src = 'assets/eye-close.svg';
  }
});

confirmPasswordEl.addEventListener('paste', (event) => event.preventDefault());

const isRequired = (value) => value ? true : false;

const isValidEmail = (email) => {
  const emailRegexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegexp.test(email);
};

const isValidPassword = (password) => {
  const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#])[A-Za-z\d@$!%#]{8,}$/;
  return passwordRegexp.test(password);
}

const showError = (input, message, errorId) => {
  input.classList.add('error');
  const error = document.getElementById(errorId);
  error.textContent = message;
};

const showSuccess = (input, errorId) => {
  input.classList.remove('error');
  const error = document.getElementById(errorId);
  error.textContent = '';
};

const validateUsername = (username) => {
  if (!isRequired(username)) {
    showError(usernameEl, 'Name is required', 'username-error');
    return false;
  }

  if (username.length < 2) {
    showError(usernameEl, 'Name must be equal or greater than 2 characters', 'username-error');
    return false;
  }

  if (username.length > 25) {
    showError(usernameEl, 'Name must be less than 25 characters', 'username-error');
    return false;
  }

  showSuccess(usernameEl, 'username-error');
  return true;
};

const validateSurname = (surname) => {
  if (!isRequired(surname)) {
    showError(surnameEl, 'Surname is required', 'surname-error');
    return false;
  }

  if (surname.length < 2) {
    showError(surnameEl, 'Surname must be equal or greater than 2 characters', 'surname-error');
    return false;
  }

  if (surname.length > 25) {
    showError(surnameEl, 'Surname must be less than 25 characters', 'surname-error');
    return false;
  }

  showSuccess(surnameEl, 'surname-error');
  return true;
};

const validateDate = (date) => {
  if (!isRequired(date)) {
    showError(dateEl, 'Date is required', 'date-error');
    return false;
  }

  showSuccess(dateEl, 'date-error');
  return true;
};

const validateEmail = (email) => {
  if (!isRequired(email)) {
    showError(emailEl, 'Email is required', 'email-error');
    return false;
  }

  if (!isValidEmail(email)) {
    showError(emailEl, 'Enter a valid email', 'email-error');
    return false;
  }

  showSuccess(emailEl, 'email-error');
  return true;
};

const validatePassword = (password) => {
  if (!isRequired(password)) {
    showError(passwordEl, 'Password is required', 'password-error');
    return false;
  }

  if (!isValidPassword(password)) {
    showError(
      passwordEl,
      'Password must be at least 8 characters long, contain only latin letters, at least 1 uppercase letter, at least 1 number and at least 1 of special characters @$!%#',
      'password-error',
    )
    return false;
  }

  showSuccess(passwordEl, 'password-error');
  return true;
};

const validateConfirmPassword = (password, confirmPassword) => {
  if (!isRequired(confirmPassword)) {
    showError(confirmPasswordEl, 'Confirm password is required', 'confirm-password-error');
    return false;
  }

  if (confirmPassword !== password) {
    showError(confirmPasswordEl, 'Confirm password does not match the password', 'confirm-password-error');
    return false;
  }

  showSuccess(confirmPasswordEl, 'confirm-password-error');
  return true;
};

usernameEl.addEventListener('blur', () => {
  const username = usernameEl.value.trim();
  validateUsername(username);
});

surnameEl.addEventListener('blur', () => {
  const surname = surnameEl.value.trim();
  validateSurname(surname);
});

dateEl.addEventListener('blur', () => {
  const date = dateEl.value;
  validateDate(date);
});

emailEl.addEventListener('blur', () => {
  const email = emailEl.value.trim();
  validateEmail(email);
});

passwordEl.addEventListener('blur', () => {
  const password = passwordEl.value.trim();
  validatePassword(password);
});

confirmPasswordEl.addEventListener('blur', () => {
  const password = passwordEl.value.trim();
  const confirmPassword = confirmPasswordEl.value.trim();
  validateConfirmPassword(password, confirmPassword);
});

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = usernameEl.value.trim();
  const surname = surnameEl.value.trim();
  const date = dateEl.value;
  const email = emailEl.value.trim();
  const password = passwordEl.value.trim();
  const confirmPassword = confirmPasswordEl.value.trim();

  const isUsernameValid = validateUsername(username);
  const isSurnameValid = validateSurname(surname);
  const isDateValid = validateDate(date);
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  const isConfirmPasswordValid = validateConfirmPassword(password, confirmPassword);

  const isFormValid = isUsernameValid &&
    isSurnameValid &&
    isDateValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid;
  
  if (!isFormValid) {
    return;
  }

  const user = {
    username,
    surname,
    date: new Date(dateEl.value).toISOString(),
    email,
    password,
    confirmPassword,
  };

  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(user),
  });

  const body = await response.json();
  
  console.log(body);
});
