import "./index.css";
import * as constants from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
});

const userCards = new Section(
  {
    items: constants.initialCards,
    renderer: (card) => {
      const cardElement = new Card(card, "#card-template", openPopupZoomImage);
      userCards.addItem(cardElement.generateCard());
    },
  },
  constants.gallery
);

// Rendering initial cards
userCards.renderItems();

// Enabling validation

const profileFormValidation = new FormValidator(
  constants.formEditProfile,
  constants.formValidationConfig
);
profileFormValidation.enableValidation();

const newCardFormValidation = new FormValidator(
  constants.formAddImage,
  constants.formValidationConfig
);
newCardFormValidation.enableValidation();

// Enabling popup handlers

const popupEditProfile = new PopupWithForm(
  "#popup-edit-profile",
  // Submitting the profile edit popup
  ({ name, job }) => {
    userInfo.setUserInfo(name, job);
    popupEditProfile.close();
  }
);
popupEditProfile.setEventListeners();

const popupAddImage = new PopupWithForm(
  "#popup-add-image",
  // Submitting the add image popup
  ({ title, link }) => {
    const cardElement = new Card(
      {
        name: title,
        link: link,
      },
      "#card-template",
      openPopupZoomImage
    );
    userCards.addItem(cardElement.generateCard());

    popupAddImage.close();
  }
);
popupAddImage.setEventListeners();

const popupZoomImage = new PopupWithImage("#popup-zoom-image");
popupZoomImage.setEventListeners();

function openPopupZoomImage(name, link) {
  popupZoomImage.open(name, link);
}

// Opening profile edit popup

function openPopupEditProfile({ name, job }) {
  constants.inputName.value = name;
  constants.inputJob.value = job;

  popupEditProfile.open();
}

constants.profileEditBtn.addEventListener("click", () => {
  openPopupEditProfile(userInfo.getUserInfo());
  profileFormValidation.resetValidation();
});

// Opening add image popup
constants.cardAddBtn.addEventListener("click", () => {
  popupAddImage.open();
  newCardFormValidation.resetValidation();
});
