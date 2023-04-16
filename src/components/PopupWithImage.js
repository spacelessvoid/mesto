import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._zoomedImage = document.querySelector(".popup__image-zoomed");
    this._zoomedCaption = document.querySelector(".popup__caption");
  }

  open = (name, link) => {
    this._zoomedImage.src = link;
    this._zoomedImage.alt = name;
    this._zoomedCaption.textContent = name;
    super.open();
  };
}
