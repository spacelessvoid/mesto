const initialCards = [
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

const templateCard = document.querySelector("#card");
const templatePopupEditProfile = document.querySelector("#popup-edit-profile");
const templatePopupAddImage = document.querySelector("#popup-add-image");
const page = document.querySelector(".page");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

initialCards.forEach((el) => {
  handleAddImage(el.name, el.link);
});

function handleAddImage(name, link) {
  const newCard = templateCard.content.cloneNode(true);
  const title = newCard.querySelector(".card__place");
  const image = newCard.querySelector(".card__image");
  title.textContent = name;
  image.alt = "Фото: " + name;
  image.src = link;
  document.querySelector(".gallery").prepend(newCard);
}

function handleLikeToggle(evt) {
  const card = evt.target.closest(".card");
  const like = card.querySelector(".card__like-btn");
  like.classList.toggle("card__like-btn_active");
}

function handleDeleteCard(evt) {
  evt.target.closest(".card").remove();
}

function openEditProfilePopup() {
  const popupItem = templatePopupEditProfile.content.cloneNode(true);
  page.append(popupItem);
  document.querySelector(".popup").classList.add("popup_opened");

  document.querySelector(".popup__text-input_type_name").value =
    profileName.textContent;
  document.querySelector(".popup__text-input_type_job").value =
    profileJob.textContent;
}

function openAddImagePopup() {
  const popupItem = templatePopupAddImage.content.cloneNode(true);
  page.append(popupItem);
  document.querySelector(".popup").classList.add("popup_opened");
}

function handlePopupClose(evt) {
  const popupOverlay = document.querySelector(".popup");
  const popupContainer = document.querySelector(".popup__container");
  popupOverlay.classList.add("popup_animation_fade-out");
  popupContainer.classList.add("popup__container_animation_slide-out");
  setTimeout(() => {
    evt.target.closest(".popup").remove();
    popupOverlay.classList.remove("popup_animation_fade-out");
    popupContainer.classList.remove("popup__container_animation_slide-out");
  }, 550);
}

// Submitting the form
function handleFormSubmit(evt) {
  evt.preventDefault();

  let name = document.querySelector(".popup__text-input_type_name");
  let job = document.querySelector(".popup__text-input_type_job");
  let link = document.querySelector(".popup__text-input_type_link");

  // Submitting the profile edit popup
  if (evt.target.classList.contains("form__edit-profile")) {
    profileName.textContent = name.value;
    profileJob.textContent = job.value;
  }
  // Submitting the add image popup
  if (evt.target.classList.contains("form__add-image")) {
    if (name.value && link.value) {
      handleAddImage(name.value, link.value);
    } else {
      function randomLink() {
        const keyWords = [
          "landscape",
          "city",
          "forest",
          "travel",
          "mountains",
          "sea",
          "islands",
          "snow",
          "desert",
        ];

        return (link.value =
          "https://source.unsplash.com/random?" +
          keyWords[Math.floor(Math.random() * 10)]);
      }
      handleAddImage("ಠ_ಠ", randomLink());
    }
  }

  handlePopupClose(evt);
}

// Popup open/close event
page.addEventListener("click", (evt) => {
  // Closing popup
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup")
  ) {
    handlePopupClose(evt);
  }
  // Opening profile edit popup
  if (evt.target.classList.contains("profile__edit-btn")) {
    openEditProfilePopup();
  }
  // Opening add image popup
  if (evt.target.classList.contains("add-btn")) {
    openAddImagePopup();
  }
  // Liking a card
  if (evt.target.classList.contains("card__like-btn")) {
    handleLikeToggle(evt);
  }
  if (evt.target.classList.contains("card__delete-btn")) {
    handleDeleteCard(evt);
  }
});

// Form submit event
page.addEventListener("submit", handleFormSubmit);
