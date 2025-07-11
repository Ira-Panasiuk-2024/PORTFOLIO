import emailjs from '@emailjs/browser';
import { showModal } from './modal.js';

const form = document.querySelector('.work-form');
const nameInput = document.querySelector('#user-name');
const emailInput = document.querySelector('#user-email');
const phoneInput = document.querySelector('#user-phone');
const messageInput = document.querySelector('#user-message');
const nameErrorText = document.querySelector('.work-form-name-text');
const errorText = document.querySelector('.work-form-text');
const phoneErrorText = document.querySelector('.work-form-phone-text');
const submitBtn = document.querySelector('.work-form-btn');

const EMAILJS_PUBLIC_KEY = 'poHNI8MC_AjrQLnjJ';
const EMAILJS_SERVICE_ID = 'service_3mjeb4a';
const EMAILJS_TEMPLATE_ID = 'template_ydabqsa';

(function () {
  emailjs.init(EMAILJS_PUBLIC_KEY);
})();

window.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', async event => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value;
    const phone = phoneInput.value;
    const message = messageInput.value;

    if (!validateName(name)) {
      showNameError('Name is required (minimum 2 characters)');
      return;
    }

    if (!emailInput.checkValidity()) {
      showError('Invalid email, try again');
      return;
    }

    if (phone && !validatePhone(phone)) {
      showPhoneError('Invalid phone format');
      return;
    }

    setLoadingState(true);

    try {
      const templateParams = {
        name: name,
        email: email,
        phone: phone || '',
        message: message,
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        clearForm();
        showModal();
        hideNameError();
        hideError();
        hidePhoneError();
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      showError('Something went wrong. Please try again later.');
    } finally {
      setLoadingState(false);
    }
  });

  nameInput.addEventListener('input', handleNameValidation);
  emailInput.addEventListener('input', handleEmailValidation);
  phoneInput.addEventListener('input', handlePhoneValidation);
});

function handleNameValidation() {
  const name = nameInput.value.trim();
  const isValidName = validateName(name);
  const icon = document.querySelector('.work-form-name-icon');

  icon.classList.toggle('visually-hidden', !isValidName);

  if (!isValidName && nameInput.value.length > 0) {
    showNameError('Name is required (minimum 2 characters)');
    nameInput.classList.add('invalid-text');
  } else {
    hideNameError();
    nameInput.classList.remove('invalid-text');
  }
}

function handleEmailValidation() {
  const isValidEmail = emailInput.checkValidity();
  const icon = document.querySelector('.work-form-icon');

  icon.classList.toggle('visually-hidden', !isValidEmail);

  if (!isValidEmail && emailInput.value.length > 0) {
    showError('Invalid email, try again');
    emailInput.classList.add('invalid-text');
  } else {
    hideError();
    emailInput.classList.remove('invalid-text');
  }
}

function handlePhoneValidation() {
  const phone = phoneInput.value;
  const icon = document.querySelector('.work-form-phone-icon');

  if (!phone) {
    icon.classList.add('visually-hidden');
    hidePhoneError();
    phoneInput.classList.remove('invalid-text');
    return;
  }

  const isValidPhone = validatePhone(phone);
  icon.classList.toggle('visually-hidden', !isValidPhone);

  if (!isValidPhone) {
    showPhoneError('Invalid phone format');
    phoneInput.classList.add('invalid-text');
  } else {
    hidePhoneError();
    phoneInput.classList.remove('invalid-text');
  }
}

function validateName(name) {
  return name.length >= 2 && /^[a-zA-Zа-яА-ЯіІїЇєЄ\s''-]+$/.test(name);
}

function validatePhone(phone) {
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  const phoneRegex = /^[+]?[0-9]{10,15}$/;
  return phoneRegex.test(cleanPhone);
}

function showNameError(message) {
  nameErrorText.textContent = message;
  nameErrorText.classList.remove('visually-hidden');
}

function hideNameError() {
  nameErrorText.classList.add('visually-hidden');
}

function showError(message) {
  errorText.textContent = message;
  errorText.classList.remove('visually-hidden');
}

function hideError() {
  errorText.classList.add('visually-hidden');
}

function showPhoneError(message) {
  phoneErrorText.textContent = message;
  phoneErrorText.classList.remove('visually-hidden');
}

function hidePhoneError() {
  phoneErrorText.classList.add('visually-hidden');
}

function clearForm() {
  nameInput.value = '';
  emailInput.value = '';
  phoneInput.value = '';
  messageInput.value = '';
  const nameIcon = document.querySelector('.work-form-name-icon');
  const emailIcon = document.querySelector('.work-form-icon');
  const phoneIcon = document.querySelector('.work-form-phone-icon');
  nameIcon.classList.add('visually-hidden');
  emailIcon.classList.add('visually-hidden');
  phoneIcon.classList.add('visually-hidden');
}

function setLoadingState(isLoading) {
  submitBtn.disabled = isLoading;
  submitBtn.textContent = isLoading ? 'SENDING...' : 'SEND MESSAGE';
}
