import "./index.css";
import * as constants from "../utils/constants.js";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-64",
  headers: {
    authorization: "22f549e9-e0fd-461e-9588-c9d853933dcc",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__job",
  avatarSelector: ".profile__avatar",
});

// Fetching user profile data
api
  .getContent("/users/me")
  .then(({ name, about, avatar }) => {
    userInfo.setUserInfo({ name, about });
    userInfo.setUserAvatar(avatar);
  })
  .catch((err) => {
    console.log(err);
  });

function createCard(data) {
  const cardElement = new Card(data, "#card-template", openPopupZoomImage);
  return cardElement.generateCard();
}

const userCards = new Section(
  {
    // items: constants.initialCards,
    renderer: (card) => {
      userCards.addItem(createCard(card));
    },
  },
  constants.gallery
);

// Rendering initial cards
api
  .getContent("/cards")
  .then((result) => {
    userCards.renderItems(result);
  })
  .catch((err) => {
    console.log(err);
  });

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
  (inputData) => {
    userInfo.setUserInfo(inputData);
    popupEditProfile.close();
  }
);
popupEditProfile.setEventListeners();

const popupAddImage = new PopupWithForm(
  "#popup-add-image",
  // Submitting the add image popup
  ({ name, link }) => {
    userCards.addItem(createCard({ name, link }));
    popupAddImage.close();
  }
);
popupAddImage.setEventListeners();

const popupZoomImage = new PopupWithImage("#popup-zoom-image");
popupZoomImage.setEventListeners();

function openPopupZoomImage(name, link) {
  popupZoomImage.open(name, link);
}

const popupChangeAvatar = new PopupWithForm(
  "#popup-change-avatar",
  ({ link }) => {
    userInfo.setUserAvatar(link);
    popupChangeAvatar.close();
  }
);
popupChangeAvatar.setEventListeners();

const popupConfirmDelete = new PopupWithConfirmation("#popup-confirm-delete");
popupConfirmDelete.setEventListeners();

// Opening profile edit popup

function openPopupEditProfile({ name, about }) {
  constants.inputName.value = name;
  constants.inputAbout.value = about;

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

// Opening change avatar popup
constants.avatarChangeBtn.addEventListener("click", () => {
  popupChangeAvatar.open();
});
