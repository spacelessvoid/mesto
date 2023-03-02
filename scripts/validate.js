function showInputError(inputElement, config) {
  const errorElement = document.querySelector(`.${inputElement.id}-error`);
  // passing text of built-in `validationMessage` to error message element
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(config.errorElementClass);
  inputElement.classList.add(config.inputErrorClass);
}

function hideInputError(inputElement, config) {
  const errorElement = document.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(config.errorElementClass);
  setTimeout(() => {
    errorElement.textContent = "";
  }, 550);
  inputElement.classList.remove(config.inputErrorClass);
}

function checkInputValidity(inputElement, config) {
  if (inputElement.validity.valid) {
    hideInputError(inputElement, config);
  } else {
    showInputError(inputElement, config);
  }
}

function toggleSubmitButtonState(formElement, config) {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  // using built-in function to pass form validity state to variable
  const isFormValid = formElement.checkValidity();

  buttonElement.disabled = !isFormValid;
  buttonElement.classList.toggle(config.buttonDisabledClass, !isFormValid);
}

function setEventListeners(formElement, config) {
  // selecting all inputs in a given form
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  // each input is passed for the first time
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(inputElement, config);
      toggleSubmitButtonState(formElement, config);
    });
  });
}

function enableValidation(config) {
  // selecting all forms in the document
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  // each form is passed for the first time
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

enableValidation(formValidationConfig);
