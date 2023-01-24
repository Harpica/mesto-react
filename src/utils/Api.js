class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  postCard({ name, link }) {
    return this._request(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ name: name, link: link }),
    });
  }
  deleteCard(cardID) {
    return this._request(`${this.baseUrl}/cards/${cardID}`, {
      method: 'DELETE',
      headers: this.headers,
    });
  }
  getInitialCards() {
    return this._request(`${this.baseUrl}/cards`, { headers: this.headers });
  }
  setUserInfo(userName, about) {
    return this._request(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ name: userName, about: about }),
    });
  }
  setUserAvatar(avatarLink) {
    return this._request(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ avatar: avatarLink }),
    });
  }
  getUserInfo() {
    return this._request(`${this.baseUrl}/users/me`, { headers: this.headers });
  }
  likeCard(cardID) {
    return this._request(`${this.baseUrl}/cards/${cardID}/likes`, {
      method: 'PUT',
      headers: this.headers,
    });
  }
  removeLikeCard(cardID) {
    return this._request(`${this.baseUrl}/cards/${cardID}/likes`, {
      method: 'DELETE',
      headers: this.headers,
    });
  }
  changeLikeCardStatus(cardID, isLiked) {
    return isLiked ? this.removeLikeCard(cardID) : this.likeCard(cardID);
  }
}

// Создадим объект для общения с сервером
export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-56',
  headers: {
    authorization: '28c8be99-8fcb-4f8e-afaa-96e6bec99f34',
    'Content-Type': 'application/json',
  },
});
