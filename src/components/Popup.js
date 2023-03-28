export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.openedClass = "popup_opened";
  }

  //TODO Why this doesn't work with arrow function? ✅
  open() {
    this._popup.classList.add(this.openedClass);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(this.openedClass);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  //TODO And this doesn't work with function declaration? ✅
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close(this._popup);
    }
  };

  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__close")
      ) {
        this.close(this._popup);
      }
    });
  }
}
