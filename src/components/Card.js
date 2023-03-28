export default class Card {
  constructor(data, templateSelector, openPopupFunc) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    // Passing the function that opens card image popup
    this._openPopupFunc = openPopupFunc;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.cloneNode(true).children[0];

    return cardElement;
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _toggleCardLike() {
    this._likeBtn.classList.toggle("card__like-btn_active");
  }

  _setEventListeners() {
    this._image.addEventListener("click", () => {
      this._openPopupFunc(this._name, this._link);
    });

    this._deleteBtn.addEventListener("click", () => {
      this._deleteCard();
    });

    this._likeBtn.addEventListener("click", () => {
      this._toggleCardLike();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._title = this._element.querySelector(".card__place");
    this._image = this._element.querySelector(".card__image");
    this._likeBtn = this._element.querySelector(".card__like-btn");
    this._deleteBtn = this._element.querySelector(".card__delete-btn");

    this._setEventListeners();

    this._title.textContent = this._name;
    this._image.alt = this._name;
    this._image.src = this._link;

    return this._element;
  }
}
