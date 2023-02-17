const templateCard = document.querySelector("#card");

const popupEditProfile = document.querySelector("#popup-edit-profile");
const popupAddImage = document.querySelector("#popup-add-image");
const popupZoomImage = document.querySelector("#popup-zoom-image");
let openedPopup;

const page = document.querySelector(".page");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const gallery = document.querySelector(".gallery");

const inputName = document.querySelector(".popup__text-input_type_name");
const inputJob = document.querySelector(".popup__text-input_type_job");
const inputTitle = document.querySelector(".popup__text-input_type_title");
const inputLink = document.querySelector(".popup__text-input_type_link");

// Loading the cards from initial array
initialCards.forEach((item) => {
  addCard(item.name, item.link);
});

function openPopup(popup) {
  popup.classList.add("popup_opened");
  openedPopup = popup;
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
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
  deleteBtn.addEventListener("click", handleDeleteCard);
  likeBtn.addEventListener("click", handleToggleLike);

  return newCard;
}

function addCard(name, link) {
  gallery.prepend(createCard(name, link));
}

function handleToggleLike(evt) {
  const like = evt.target.closest(".card").querySelector(".card__like-btn");
  like.classList.toggle("card__like-btn_active");
}

function handleDeleteCard(evt) {
  const thisCard = evt.target.closest(".card");
  thisCard.remove();
}

function openZoomImagePopup(evt) {
  const image = popupZoomImage.querySelector(".popup__image-zoomed");
  const caption = popupZoomImage.querySelector(".popup__caption");
  const thisCard = evt.target.closest(".card");
  const thisImage = thisCard.querySelector(".card__image");
  const thisTitle = thisCard.querySelector(".card__place");

  image.src = thisImage.src;
  image.alt = thisImage.alt;
  caption.textContent = thisTitle.textContent;
  openPopup(popupZoomImage);
}

function openEditProfilePopup() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(popupEditProfile);
}

// Submitting the form
function handleFormSubmit(evt) {
  evt.preventDefault();

  // Submitting the profile edit popup
  if (evt.target.classList.contains("form__edit-profile")) {
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
  }
  // Submitting the add image popup
  if (evt.target.classList.contains("form__add-image")) {
    addCard(inputTitle.value, inputLink.value);
  }
  closePopup(openedPopup);
}

// All the user click events
page.addEventListener("click", (evt) => {
  // Closing popup
  if (evt.target.classList.contains("popup")) {
    closePopup(openedPopup);
  }
  if (evt.target.classList.contains("popup__close")) {
    closePopup(openedPopup);
  }
  // Opening profile edit popup
  if (evt.target.classList.contains("profile__edit-btn")) {
    openEditProfilePopup();
  }
  // Opening add image popup
  if (evt.target.classList.contains("add-btn")) {
    openPopup(popupAddImage);
  }
});

// Form submit event
page.addEventListener("submit", handleFormSubmit);
