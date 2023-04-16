export default class Card {
  constructor({
    data,
    templateSelector,
    openPopupHandler,
    openDeleteConfirmation,
    toggleLikeHandler,
  }) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    // Passing the function that opens card image popup
    this._openPopupHandler = openPopupHandler;
    // Passing the function that opens delete confirmation
    this._openDeleteConfirmation = openDeleteConfirmation;
    // Passing the function that toggles likes on the server
    this._toggleLikeHandler = toggleLikeHandler;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.cloneNode(true)
      .querySelector(".card");
  }

  _deleteCard = () => {
    this._element.remove();
    this._element = null;
  };

  _toggleLike() {
    if (!this._likeBtn.classList.contains("card__like-btn_active")) {
      this._setLikesCount(1);
    } else {
      this._setLikesCount(-1);
    }

    this._likeBtn.classList.toggle("card__like-btn_active");
  }

  _setLikesCount(count) {
    let likes = parseInt(
      this._element.querySelector(".card__like-count").textContent
    );
    likes += count;
    this._element.querySelector(".card__like-count").textContent = likes;
  }

  _setEventListeners() {
    this._image.addEventListener("click", () => {
      this._openPopupHandler(this._name, this._link);
    });

    this._deleteBtn.addEventListener("click", () => {
      this._openDeleteConfirmation(this._element, this._deleteCard);
    });

    this._likeBtn.addEventListener("click", () => {
      this._toggleLike();
    });
  }

  generateCard({ cardID, likesCount, authorID, userID }) {
    this._element = this._getTemplate();
    this._title = this._element.querySelector(".card__place");
    this._image = this._element.querySelector(".card__image");
    this._likeBtn = this._element.querySelector(".card__like-btn");
    this._deleteBtn = this._element.querySelector(".card__delete-btn");

    this._setEventListeners();
    this._setLikesCount(likesCount);

    if (userID !== authorID) {
      this._deleteBtn.remove();
      this._deleteBtn = null;
    }

    this._title.textContent = this._name;
    this._image.alt = this._name;
    this._image.src = this._link;

    this._element.id = cardID;

    return this._element;
  }
}
