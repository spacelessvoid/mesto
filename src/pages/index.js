import "./index.css";
import * as constants from "../utils/constants.js";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
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

// Variable for user ID to be set with one API call
let userID;

function createCard(data) {
  const cardElement = new Card({
    data,
    templateSelector: "#card-template",
    openPopupHandler: openPopupZoomImage,
    openDeleteConfirmation: openConfirmationPopup,
    toggleLikeHandler: toggleCardLike,
  });
  return cardElement.generateCard({
    cardID: data._id,
    likesArr: data.likes,
    authorID: data.owner._id,
    userID,
  });
}

function toggleCardLike(thisCard, likeHandler) {
  const likeBtn = thisCard.querySelector(".card__like-btn");

  if (!likeBtn.classList.contains("card__like-btn_active")) {
    api
      .addLike(thisCard.id)
      .then((result) => {
        likeHandler(result.likes.length);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .removeLike(thisCard.id)
      .then((result) => {
        likeHandler(result.likes.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

const userCards = new Section(
  {
    renderer: (card) => {
      userCards.addItem(createCard(card));
    },
  },
  constants.gallery
);

Promise.all([
  // Fetching user profile data
  api.getUserInfo(),
  // Fetching initial cards
  api.getInitialCards(),
])
  .then((result) => {
    userInfo.setUserInfo(result[0]);
    userInfo.setUserAvatar(result[0]);
    userID = result[0]["_id"];

    userCards.renderItems(result[1].reverse());
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

const changeAvatarFormValidation = new FormValidator(
  constants.formChangeAvatar,
  constants.formValidationConfig
);
changeAvatarFormValidation.enableValidation();

// Enabling popup handlers

const popupEditProfile = new PopupWithForm(
  "#popup-edit-profile",
  // Submitting the profile edit popup
  (inputData) => {
    popupEditProfile.renderLoading(true);
    api
      .updateUserInfo(inputData)
      .then((inputData) => {
        userInfo.setUserInfo(inputData);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditProfile.renderLoading(false, "Сохранить");
      });
  }
);
popupEditProfile.setEventListeners();

const popupAddImage = new PopupWithForm(
  "#popup-add-image",
  // Submitting the add image popup
  (inputData) => {
    popupAddImage.renderLoading(true);
    api
      .addNewCard(inputData)
      .then((inputData) => {
        userCards.addItem(createCard(inputData));
        popupAddImage.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAddImage.renderLoading(false, "Создать");
      });
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
  ({ avatar }) => {
    popupChangeAvatar.renderLoading(true);
    api
      .updateUserAvatar({ avatar })
      .then(({ avatar }) => {
        userInfo.setUserAvatar({ avatar });
        popupChangeAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupChangeAvatar.renderLoading(false, "Сохранить");
      });
  }
);
popupChangeAvatar.setEventListeners();

const popupConfirmDelete = new PopupWithConfirmation(
  "#popup-confirm-delete",
  (deletedElement, deleteHandler) => {
    popupConfirmDelete.renderLoading(true);
    api
      .deleteCard(deletedElement.id)
      .then(() => {
        deleteHandler();
        popupConfirmDelete.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupConfirmDelete.renderLoading(false, "Да, удалить карточку");
      });
  }
);
popupConfirmDelete.setEventListeners();
// delete card handler
function openConfirmationPopup(deletedElement, deleteHandler) {
  popupConfirmDelete.open(deletedElement, deleteHandler);
}

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
  changeAvatarFormValidation.resetValidation();
});
