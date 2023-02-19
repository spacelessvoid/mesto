const templateCard = document.querySelector("#card");

const popupOverlays = document.querySelectorAll(".popup");
const popupEditProfile = document.querySelector("#popup-edit-profile");
const popupAddImage = document.querySelector("#popup-add-image");
const popupZoomImage = document.querySelector("#popup-zoom-image");

const inputName = document.querySelector(".popup__text-input_type_name");
const inputJob = document.querySelector(".popup__text-input_type_job");
const inputTitle = document.querySelector(".popup__text-input_type_title");
const inputLink = document.querySelector(".popup__text-input_type_link");

const page = document.querySelector(".page");
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const cardAddBtn = document.querySelector(".add-btn");
const gallery = document.querySelector(".gallery");
const cardZoomedImage = popupZoomImage.querySelector(".popup__image-zoomed");
const cardZoomedCaption = popupZoomImage.querySelector(".popup__caption");

// Loading the cards from initial array
initialCards.forEach((item) => {
  addCard(item.name, item.link);
});

function openPopup(popup) {
  popup.classList.add("popup_opened");
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
  deleteBtn.addEventListener("click", deleteCard);
  likeBtn.addEventListener("click", toggleCardLike);

  return newCard;
}

function addCard(name, link) {
  gallery.prepend(createCard(name, link));
}

function toggleCardLike(evt) {
  const like = evt.target.closest(".card").querySelector(".card__like-btn");
  like.classList.toggle("card__like-btn_active");
}

function deleteCard(evt) {
  const thisCard = evt.target.closest(".card");
  thisCard.remove();
}

function openZoomImagePopup(evt) {
  const thisCard = evt.target.closest(".card");
  const thisImage = thisCard.querySelector(".card__image");
  const thisTitle = thisCard.querySelector(".card__place");

  cardZoomedImage.src = thisImage.src;
  cardZoomedImage.alt = thisImage.alt;
  cardZoomedCaption.textContent = thisTitle.textContent;
  openPopup(popupZoomImage);
}

function openEditProfilePopup() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(popupEditProfile);
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

  addCard(inputTitle.value, inputLink.value);
  closePopup(popupAddImage);
}

// Opening profile edit popup
profileEditBtn.addEventListener("click", openEditProfilePopup);

// Opening add image popup
cardAddBtn.addEventListener("click", () => {
  openPopup(popupAddImage);
});

// Closing popup
popupOverlays.forEach((item) => {
  item.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closePopup(item);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(item);
    }
  });
});

// Form submit events
popupEditProfile.addEventListener("submit", submitEditProfileForm);
popupAddImage.addEventListener("submit", submitAddImageForm);
