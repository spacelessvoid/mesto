export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const formValidationConfig = {
  inputSelector: ".popup__text-input", // selector for input class name in the document
  inputErrorClass: "popup__text-input_invalid", // class name modifying input field style in case of invalid input
  submitButtonSelector: ".popup__button", // selector for submit button in a form
  buttonDisabledClass: "popup__button_inactive", // class name setting inactive state on submit button
  errorElementClass: "popup__input-error_active", // class name for error message element active state
};

export const popupOverlays = document.querySelectorAll(".popup"),
  formEditProfile = document.querySelector("#edit-profile"),
  formAddImage = document.querySelector("#add-image"),
  inputName = document.querySelector(".popup__text-input_type_name"),
  inputAbout = document.querySelector(".popup__text-input_type_job"),
  inputTitle = document.querySelector(".popup__text-input_type_title"),
  inputLink = document.querySelector(".popup__text-input_type_link"),
  avatarChangeBtn = document.querySelector(".profile__avatar-container"),
  profileEditBtn = document.querySelector(".profile__edit-btn"),
  cardAddBtn = document.querySelector(".add-btn"),
  gallery = document.querySelector(".gallery");
