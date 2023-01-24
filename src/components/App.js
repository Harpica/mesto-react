import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((user) => setCurrentUser(user))
      .catch((err) => console.log(err));
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleCardLike(card, setCards) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }
  function handleCardDelete(card, setCards) {
    api
      .deleteCard(card._id)
      .then(() => setCards((state) => state.filter((c) => c._id !== card._id)))
      .catch((err) => console.log(err));
  }

  return (
    <div className='root'>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        {/* секция попапа для изменения данных профиля  */}
        <PopupWithForm
          name='profile-popup'
          title='Редактировать профиль'
          buttonText='Сохранить'
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            type='text'
            className='popup__input'
            id='input-name'
            name='profile-name'
            placeholder='Имя'
            minLength='2'
            maxLength='40'
            required
          />
          <span className='popup__error' id='profile-name-error'></span>
          <input
            type='text'
            className='popup__input'
            id='input-description'
            name='profile-job'
            placeholder='Род деятельности'
            minLength='2'
            maxLength='40'
            required
          />
          <span className='popup__error' id='profile-job-error'></span>
        </PopupWithForm>
        {/* секция попапа для изменения аватара профиля */}
        <PopupWithForm
          name='avatar-popup'
          title='Обновить аватар'
          buttonText='Сохранить'
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <input
            type='url'
            className='popup__input avatar-popup__input-link'
            name='avatar-link'
            placeholder='Ссылка на аватар'
            required
          />
          <span className='popup__error' id='avatar-link-error'></span>
        </PopupWithForm>
        {/* секция попапа для добавления картинки */}
        <PopupWithForm
          name='add-popup'
          title='Новое место'
          buttonText='Сохранить'
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            type='text'
            className='popup__input add-popup__input-title'
            name='photo-title'
            placeholder='Название'
            minLength='2'
            maxLength='30'
            required
          />
          <span className='popup__error' id='photo-title-error'></span>
          <input
            type='url'
            className='popup__input add-popup__input-link'
            name='photo-link'
            placeholder='Ссылка на картинку'
            required
          />
          <span className='popup__error' id='photo-link-error'></span>
        </PopupWithForm>
        {/* секция попапа для подтверждения удаления карточки */}
        <PopupWithForm
          name='delete-popup'
          title='Вы уверены?'
          buttonText='Да'
          onClose={closeAllPopups}
        />
        {/* секция попапа для увеличения изображения */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
