import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import * as constants from "./constants.js";

// Loading the cards from initial array
constants.initialCards.forEach((item) => {
  addCard(createCard(item));
});

// Enabling validation
const profileFormValidation = new FormValidator(
  constants.formEditProfile,
  constants.formValidationConfig
);
const newCardFormValidation = new FormValidator(
  constants.formAddImage,
  constants.formValidationConfig
);
profileFormValidation.enableValidation();
newCardFormValidation.enableValidation();

const closePopupOnEscapePress = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
};

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupOnEscapePress);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupOnEscapePress);
}

function createCard(data) {
  const cardElement = new Card(data, "#card-template", openZoomImagePopup);

  return cardElement.generateCard();
}

function addCard(card) {
  constants.gallery.prepend(card);
}

// Submitting the profile edit popup
function submitEditProfileForm(evt) {
  evt.preventDefault();

  constants.profileName.textContent = constants.inputName.value;
  constants.profileJob.textContent = constants.inputJob.value;

  closePopup(constants.popupEditProfile);
}

// Submitting the add image popup
function submitAddImageForm(evt) {
  evt.preventDefault();

  const newCard = {
    name: constants.inputTitle.value,
    link: constants.inputLink.value,
  };

  addCard(createCard(newCard));

  closePopup(constants.popupAddImage);
}

function openEditProfilePopup() {
  constants.inputName.value = constants.profileName.textContent;
  constants.inputJob.value = constants.profileJob.textContent;

  openPopup(constants.popupEditProfile);
}

function openZoomImagePopup(name, link) {
  constants.zoomedImage.src = link;
  constants.zoomedImage.alt = name;
  constants.zoomedCaption.textContent = name;

  openPopup(constants.popupZoomImage);
}

// Opening profile edit popup
constants.profileEditBtn.addEventListener("click", () => {
  openEditProfilePopup();
  profileFormValidation.resetValidation();
});

// Opening add image popup
constants.cardAddBtn.addEventListener("click", () => {
  openPopup(constants.popupAddImage);
  constants.formAddImage.reset();
  newCardFormValidation.resetValidation();
});

// Closing popup
constants.popupOverlays.forEach((item) => {
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
constants.formEditProfile.addEventListener("submit", submitEditProfileForm);
constants.formAddImage.addEventListener("submit", submitAddImageForm);
