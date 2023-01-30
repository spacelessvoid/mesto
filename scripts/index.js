let popupCloseBtn = document.querySelector(".popup__close");
let profileEditBtn = document.querySelector(".profile__edit-btn");
let popupOverlay = document.querySelector(".popup");
let popupContainer = document.querySelector(".popup__container");
let formElement = document.querySelector(".popup__form");
let nameInput = formElement.querySelector(".popup__text-input_type_name");
let jobInput = formElement.querySelector(".popup__text-input_type_job");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");

function popupToggle() {
  popupOverlay.classList.toggle("popup_opened");
}

function popupClose() {
  popupOverlay.classList.add("popup_animation_fade-out");
  popupContainer.classList.add("popup__container_animation_slide-out");
  setTimeout(() => {
    popupToggle();
    popupOverlay.classList.remove("popup_animation_fade-out");
    popupContainer.classList.remove("popup__container_animation_slide-out");
  }, 550);
}

// Opening popup
profileEditBtn.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  popupToggle();
});

// Pressing X to close popup
popupCloseBtn.addEventListener("click", popupClose);

// Pressing outside popup to close it
popupOverlay.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    popupClose();
  }
});

// Submitting the form in the popup
function handleFormSubmit(evt) {
  evt.preventDefault();

  let name = nameInput.value;
  let job = jobInput.value;

  let profileName = document.querySelector(".profile__name");
  let profileJob = document.querySelector(".profile__job");

  profileName.textContent = name;
  profileJob.textContent = job;

  popupClose();
}

formElement.addEventListener("submit", handleFormSubmit);
