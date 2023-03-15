import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  initialCards,
  formValidationConfig,
  popupOverlays,
  formEditProfile,
  formAddImage,
  popupEditProfile,
  popupAddImage,
  popupZoomImage,
  zoomedImage,
  zoomedCaption,
  inputName,
  inputJob,
  inputTitle,
  inputLink,
  profileEditBtn,
  profileName,
  profileJob,
  cardAddBtn,
  gallery,
} from "./constants.js";

// Loading the cards from initial array
initialCards.forEach((item) => {
  addCard(createCard(item));
});

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
  gallery.prepend(card);
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

  const newCard = {
    name: inputTitle.value,
    link: inputLink.value,
  };

  addCard(createCard(newCard));

  closePopup(popupAddImage);
}

function openEditProfilePopup() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;

  openPopup(popupEditProfile);
}

function openZoomImagePopup(name, link) {
  zoomedImage.src = link;
  zoomedImage.alt = name;
  zoomedCaption.textContent = name;

  openPopup(popupZoomImage);
}

// Opening profile edit popup
profileEditBtn.addEventListener("click", () => {
  openEditProfilePopup();
  profileFormValidation.resetValidation();
});

// Opening add image popup
cardAddBtn.addEventListener("click", () => {
  openPopup(popupAddImage);
  formAddImage.reset();
  newCardFormValidation.resetValidation();
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

// Enabling validation
const profileFormValidation = new FormValidator(
  formEditProfile,
  formValidationConfig
);
const newCardFormValidation = new FormValidator(
  formAddImage,
  formValidationConfig
);
profileFormValidation.enableValidation();
newCardFormValidation.enableValidation();
