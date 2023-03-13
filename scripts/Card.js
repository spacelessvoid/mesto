export default class Card {
  constructor(data, templateSelector, openPopupFunc) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openPopupFunc = openPopupFunc;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _handleZoomImage() {
    popupZoomImage.querySelector(".popup__image-zoomed").src = this._link;
    popupZoomImage.querySelector(".popup__image-zoomed").alt = this._name;
    popupZoomImage.querySelector(".popup__caption").textContent = this._name;
    this._openPopupFunc(popupZoomImage);
  }

  _deleteCard() {
    this._element.closest(".card").remove();
  }

  _toggleCardLike() {
    this._element
      .closest(".card")
      .querySelector(".card__like-btn")
      .classList.toggle("card__like-btn_active");
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__image")
      .addEventListener("click", (evt) => {
        this._handleZoomImage();
      });

    this._element
      .querySelector(".card__delete-btn")
      .addEventListener("click", (evt) => {
        this._deleteCard();
      });

    this._element
      .querySelector(".card__like-btn")
      .addEventListener("click", (evt) => {
        this._toggleCardLike();
      });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".card__place").textContent = this._name;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__image").src = this._link;

    return this._element;
  }
}
