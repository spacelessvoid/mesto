const templateCard = document.querySelector("#card"),
  popupOverlays = document.querySelectorAll(".popup"),
  popupEditProfile = document.querySelector("#popup-edit-profile"),
  popupAddImage = document.querySelector("#popup-add-image"),
  popupZoomImage = document.querySelector("#popup-zoom-image"),
  inputName = document.querySelector(".popup__text-input_type_name"),
  inputJob = document.querySelector(".popup__text-input_type_job"),
  inputTitle = document.querySelector(".popup__text-input_type_title"),
  inputLink = document.querySelector(".popup__text-input_type_link"),
  page = document.querySelector(".page"),
  profileEditBtn = document.querySelector(".profile__edit-btn"),
  profileName = document.querySelector(".profile__name"),
  profileJob = document.querySelector(".profile__job"),
  cardAddBtn = document.querySelector(".add-btn"),
  gallery = document.querySelector(".gallery"),
  cardZoomedImage = popupZoomImage.querySelector(".popup__image-zoomed"),
  cardZoomedCaption = popupZoomImage.querySelector(".popup__caption");

let popupOpened;

// Loading the cards from initial array
initialCards.forEach((item) => {
  addCard(item.name, item.link);
});

const closePopupOnEscapePress = (evt) => {
  if (evt.key === "Escape") {
    closePopup(popupOpened);
  }
};

// preventing validation error message on popup open if before it was closed with an empty input
function checkFormOnOpen(popup) {
  const thisForm = popup.querySelector(".popup__form");
  const inputList = thisForm.querySelectorAll(".popup__text-input");

  inputList.forEach((inputElement) => {
    hideInputError(inputElement, formValidationConfig);
  });
  toggleSubmitButtonState(thisForm, formValidationConfig);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  popupOpened = popup;

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
  const thisForm = popupAddImage.querySelector(".popup__form");

  addCard(inputTitle.value, inputLink.value);
  thisForm.reset();

  closePopup(popupAddImage);
}

// Opening profile edit popup
profileEditBtn.addEventListener("click", () => {
  openEditProfilePopup();
  checkFormOnOpen(popupEditProfile);
});

// Opening add image popup
cardAddBtn.addEventListener("click", () => {
  openPopup(popupAddImage);
  checkFormOnOpen(popupAddImage);
});

// Closing popup
popupOverlays.forEach((item) => {
  item.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closePopup(item);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(item);
    }
  });
});

// Form submit events
popupEditProfile.addEventListener("submit", submitEditProfileForm);
popupAddImage.addEventListener("submit", submitAddImageForm);
