const formValidationConfig = {
  formSelector: ".popup__form", // selector for form class name in the document
  inputSelector: ".popup__text-input", // selector for input class name in the document
  inputErrorClass: "popup__text-input_invalid", // class name modifying input field style in case of invalid input
  submitButtonSelector: ".popup__button", // selector for submit button in a form
  buttonDisabledClass: "popup__button_inactive", // class name setting inactive state on submit button
};

function showInputError(inputElement, config) {
  const errorElement = document.querySelector(`.${inputElement.id}-error`);
  // passing text of built-in `validationMessage` to error message element
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
}

function hideInputError(inputElement, config) {
  const errorElement = document.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = "";
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

  // calling the func on load to disable submit buttons
  // toggleSubmitButtonState(formElement, config);

  formElement.addEventListener("input", () => {
    toggleSubmitButtonState(formElement, config);
  });

  // each input is passed for the first time
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(inputElement, config);
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
