import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

// Loading the cards from initial array
initialCards.forEach((item) => {
  addCard(item);
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

function addCard(data) {
  const cardElement = new Card(data, "#card-template", openPopup);
  const newCard = cardElement.generateCard();

  gallery.prepend(newCard);
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

  addCard(newCard);
  formAddImage.reset();

  closePopup(popupAddImage);
}
// Checking if button should be disabled on popup open
function checkFormOnOpen(formOpened) {
  const validator = new FormValidator(formOpened, formValidationConfig);
  validator.toggleSubmitButtonState();
}

function openEditProfilePopup() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;

  openPopup(popupEditProfile);
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
      // preventing validation error message on popup open if before it was closed with an empty input
      const formOpened = document
        .querySelector(".popup_opened")
        .querySelector(".popup__form");
      if (formOpened) {
        formOpened.reset();
      }
      closePopup(item);
    }
  });
});

// Form submit events
formEditProfile.addEventListener("submit", submitEditProfileForm);
formAddImage.addEventListener("submit", submitAddImageForm);

// Enabling validation
formList.forEach((formElement) => {
  const validator = new FormValidator(formElement, formValidationConfig);
  validator.enableValidation();
});
