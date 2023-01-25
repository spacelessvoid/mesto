let popupCloseBtn = document.querySelector(".popup__close");
let profileEditBtn = document.querySelector(".profile__edit-btn");
let popupOverlay = document.querySelector(".popup");
let formElement = document.querySelector(".popup__container");
let nameInput = formElement.querySelector(".popup__text-input_type_name");
let jobInput = formElement.querySelector(".popup__text-input_type_job");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");

function popupToggle() {
  popupOverlay.classList.toggle("popup_opened");
}

profileEditBtn.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  popupToggle();
});

popupCloseBtn.addEventListener("click", popupToggle);

function handleFormSubmit(evt) {
  evt.preventDefault();

  let name = nameInput.value;
  let job = jobInput.value;

  let profileName = document.querySelector(".profile__name");
  let profileJob = document.querySelector(".profile__job");

  profileName.textContent = name;
  profileJob.textContent = job;

  popupToggle();
}

formElement.addEventListener("submit", handleFormSubmit);
