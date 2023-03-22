import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunc) {
    super(popupSelector);
    this._submitFunc = submitFunc;
    this._form = document
      .querySelector(popupSelector)
      .querySelector(".popup__form");
  }

	//TODO
  _getInputValues() {}

  close() {
    super.close();
    this._form.reset();
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submitFunc);
  }
}
