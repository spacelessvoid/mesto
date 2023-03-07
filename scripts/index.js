// Loading the cards from initial array
initialCards.forEach((card) => {
  addCard(card.name, card.link);
});

const closePopupOnEscapePress = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
};

// preventing validation error message on popup open if before it was closed with an empty input
function checkFormOnOpen(formOpened) {
  const inputList = formOpened.querySelectorAll(".popup__text-input");

  inputList.forEach((inputElement) => {
    hideInputError(inputElement, formValidationConfig);
  });
  toggleSubmitButtonState(formOpened, formValidationConfig);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");

  document.addEventListener("keydown", closePopupOnEscapePress);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");

  document.removeEventListener("keydown", closePopupOnEscapePress);
}

function createCard(name, link) {
  const newCard = templateCard.content.cloneNode(true);
  const title = newCard.querySelector(".card__place");
  const image = newCard.querySelector(".card__image");
  const deleteBtn = newCard.querySelector(".card__delete-btn");
  const likeBtn = newCard.querySelector(".card__like-btn");

  title.textContent = name;
  image.alt = "Фото: " + name;
  image.src = link;

  image.addEventListener("click", openZoomImagePopup);
  deleteBtn.addEventListener("click", deleteCard);
  likeBtn.addEventListener("click", toggleCardLike);

  return newCard;
}

function addCard(name, link) {
  gallery.prepend(createCard(name, link));
}

function toggleCardLike(evt) {
  const like = evt.target.closest(".card").querySelector(".card__like-btn");
  like.classList.toggle("card__like-btn_active");
}

function deleteCard(evt) {
  const thisCard = evt.target.closest(".card");
  thisCard.remove();
}

function openZoomImagePopup(evt) {
  const thisCard = evt.target.closest(".card");
  const thisImage = thisCard.querySelector(".card__image");
  const thisTitle = thisCard.querySelector(".card__place");

  cardZoomedImage.src = thisImage.src;
  cardZoomedImage.alt = thisImage.alt;
  cardZoomedCaption.textContent = thisTitle.textContent;
  openPopup(popupZoomImage);
}

function openEditProfilePopup() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;

  openPopup(popupEditProfile);
}

// Submitting the profile edit popup
function submitEditProfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;

  closePopup(popupEditProfile);
}

// Submitting the add image popup
function submitAddImageForm(evt) {
  evt.preventDefault();

  addCard(inputTitle.value, inputLink.value);
  formAddImage.reset();

  closePopup(popupAddImage);
}

// Opening profile edit popup
profileEditBtn.addEventListener("click", () => {
  openEditProfilePopup();
  checkFormOnOpen(formEditProfile);
});

// Opening add image popup
cardAddBtn.addEventListener("click", () => {
  openPopup(popupAddImage);
  checkFormOnOpen(formAddImage);
});

// Closing popup
popupOverlays.forEach((item) => {
  item.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close")
    ) {
      closePopup(item);
    }
  });
});

// Form submit events
formEditProfile.addEventListener("submit", submitEditProfileForm);
formAddImage.addEventListener("submit", submitAddImageForm);
