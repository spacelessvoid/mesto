import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector(".popup__form");
  }

  open = (deletedElement, deleteHandler) => {
    this._deletedElement = deletedElement;
    this._deleteHandler = deleteHandler;
    super.open();

    document.addEventListener("keydown", this._handleEnterSubmit);
  };

  close() {
    super.close();
    
    document.removeEventListener("keydown", this._handleEnterSubmit);
  }

  _handleEnterSubmit = (evt) => {
    if (evt.key === "Enter") {
      this._submitHandler(this._deletedElement, this._deleteHandler);
    }
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._deletedElement, this._deleteHandler);
    });
  }
}
