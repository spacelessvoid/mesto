export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.openedClass = "popup_opened";
  }

  open() {
    this._popup.classList.add(this.openedClass);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(this.openedClass);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close(this._popup);
    }
  };

  renderLoading(isLoading, initialText) {
    this._buttonText = this._popup.querySelector(".popup__button");

    if (isLoading) {
      this._buttonText.textContent = "Сохранение...";
    } else {
      this._buttonText.textContent = initialText;
    }
  }

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
