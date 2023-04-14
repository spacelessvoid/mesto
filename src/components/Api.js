export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.authorization = options.headers.authorization;
    this.contentType = options["headers"]["Content-Type"];
  }

  getInitialCards(link) {
    return this.handleGet(link)
		.then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  handleGet(link) {
    return fetch(this.baseUrl + link, {
      headers: {
        authorization: this.authorization,
        "Content-Type": this.contentType,
      },
    });
  }
}
