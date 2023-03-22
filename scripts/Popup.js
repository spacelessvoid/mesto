export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.openedClass = "popup_opened";
  }

  //TODO Why this doesn't work with arrow function?
  open() {
    this._popup.classList.add(this.openedClass);
  }

  close() {
    this._popup.classList.remove(this.openedClass);
  }

  //TODO And this doesn't work with function declaration?
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close(this._popup);
    }
  };

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
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
