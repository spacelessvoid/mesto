import "../pages/index.css";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import * as constants from "./constants.js";
import Popup from "./Popup.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";

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

// Enable popup handler
const popupEditProfile = new PopupWithForm(
  "#popup-edit-profile",
  submitEditProfileForm
);
popupEditProfile.setEventListeners();

const popupAddImage = new PopupWithForm("#popup-add-image", submitAddImageForm);
popupAddImage.setEventListeners();

const popupZoomImage = new PopupWithImage("#popup-zoom-image");
popupZoomImage.setEventListeners();

// const closePopupOnEscapePress = (evt) => {
//   if (evt.key === "Escape") {
//     const popupOpened = document.querySelector(".popup_opened");
//     closePopup(popupOpened);
//   }
// };

// function openPopup(popup) {
//   popup.classList.add("popup_opened");
//   document.addEventListener("keydown", closePopupOnEscapePress);
// }

// function closePopup(popup) {
//   popup.classList.remove("popup_opened");
//   document.removeEventListener("keydown", closePopupOnEscapePress);
// }

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

  popupEditProfile.close();
}

// Submitting the add image popup
function submitAddImageForm(evt) {
  evt.preventDefault();

  const newCard = {
    name: constants.inputTitle.value,
    link: constants.inputLink.value,
  };

  addCard(createCard(newCard));

  popupAddImage.close();
}

function openEditProfilePopup() {
  constants.inputName.value = constants.profileName.textContent;
  constants.inputJob.value = constants.profileJob.textContent;

  popupEditProfile.open();
}

function openZoomImagePopup(name, link) {
  popupZoomImage.open(name, link);
}

// Opening profile edit popup
constants.profileEditBtn.addEventListener("click", () => {
  openEditProfilePopup();
  profileFormValidation.resetValidation();
});

// Opening add image popup
constants.cardAddBtn.addEventListener("click", () => {
  popupAddImage.open();
  newCardFormValidation.resetValidation();
});

// Closing popup
/* constants.popupOverlays.forEach((item) => {
  item.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close")
    ) {
      closePopup(item);
    }
  });
}); */

// Form submit events
// constants.formEditProfile.addEventListener("submit", submitEditProfileForm);
// constants.formAddImage.addEventListener("submit", submitAddImageForm);
