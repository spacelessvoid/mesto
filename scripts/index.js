// Закрытие и открытие попапа

let popupCloseBtn = document.querySelector(".popup__close");
let profileEditBtn = document.querySelector(".profile__edit-btn");
let popupOverlay = document.querySelector(".popup");

function popupToggle() {
  popupOverlay.classList.toggle("popup_opened");
}

profileEditBtn.addEventListener("click", popupToggle);
popupCloseBtn.addEventListener("click", popupToggle);

let formElement = document.querySelector(".popup__container");
let nameInput = formElement.querySelector(".popup__text-input_name");
let jobInput = formElement.querySelector(".popup__text-input_job");

function handleFormSubmit(evt) {
  evt.preventDefault();

  // Получите значение полей jobInput и nameInput из свойства value
  let name = nameInput.value;
  let job = jobInput.value;

  // Выберите элементы, куда должны быть вставлены значения полей
  let profileName = document.querySelector(".profile__name");
  let profileJob = document.querySelector(".profile__job");

  // Вставьте новые значения с помощью textContent
  profileName.textContent = name;
  profileJob.textContent = job;

  popupToggle();
}

formElement.addEventListener("submit", handleFormSubmit);
