export default class FormValidator {
  constructor(formElement, data) {
    this._formElement = formElement;
    this._inputSelector = data.inputSelector;
    this._inputErrorClass = data.inputErrorClass;
    this._submitButtonSelector = data.submitButtonSelector;
    this._buttonDisabledClass = data.buttonDisabledClass;
    this._errorElementClass = data.errorElementClass;
  }

  _showInputError() {
    const errorElement = this._formElement.querySelector(
      `.${this._inputElement.id}-error`
    );
    // passing text of built-in `validationMessage` to error message element
    errorElement.textContent = this._inputElement.validationMessage;
    errorElement.classList.add(this._errorElementClass);
    this._inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError() {
    const errorElement = this._formElement.querySelector(
      `.${this._inputElement.id}-error`
    );
    errorElement.classList.remove(this._errorElementClass);
    errorElement.textContent = "";
    this._inputElement.classList.remove(this._inputErrorClass);
  }

  _checkInputValidity() {
    if (this._inputElement.validity.valid) {
      this._hideInputError();
    } else {
      this._showInputError();
    }
  }

  _toggleSubmitButtonState() {
    const isFormValid = this._formElement.checkValidity();

    this._buttonElement.disabled = !isFormValid;
    this._buttonElement.classList.toggle(
      this._buttonDisabledClass,
      !isFormValid
    );
  }

  _setEventListeners() {
    this._inputList = this._formElement.querySelectorAll(this._inputSelector);
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._inputElement = inputElement;
        this._checkInputValidity();
        this._toggleSubmitButtonState();
      });
    });
  }

  // preventing validation error message on popup open if before it was closed with an empty input
  resetValidation() {
    this._toggleSubmitButtonState();

    this._inputList.forEach((inputElement) => {
      this._inputElement = inputElement;
      this._hideInputError();
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
