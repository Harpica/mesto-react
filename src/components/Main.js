import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import React from 'react';
import { api } from '../utils/Api';
import Card from './Card';

function Main(props) {
  // переменные стейта для информации пользователя
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  // переменная стейта с информацией о карточках
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    const userPromise = api.getUserInfo();
    const cardsPromise = api.getInitialCards();
    Promise.all([userPromise, cardsPromise])
      .then(([user, cards]) => {
        setUserName(user.name);
        setUserDescription(user.about);
        setUserAvatar(user.avatar);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  });

  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__image-container' onClick={props.onEditAvatar}>
          <img className='profile__photo' src={userAvatar} alt='Аватар' />
        </div>
        <div className='profile__name-container'>
          <h1 className='profile__name'>{userName}</h1>
          <button
            className='button edit-button edit-button_place_profile'
            type='button'
            aria-label='Редактировать профиль'
            onClick={props.onEditProfile}
          ></button>
          <p className='profile__description'>{userDescription}</p>
        </div>
        <button
          className='button add-button add-button_place_profile'
          type='button'
          aria-label='Добавить новое Фото'
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className='photos'>
        <ul className='photos__list'>
          {/* Проходимся по массиву и добавлем карточки на страницу */}
          {cards.map((card, i) => (
            <Card card={card} onClick={props.onCardClick} />
          ))}
        </ul>
      </section>
      {/* секция попапа для изменения данных профиля  */}
      <PopupWithForm
        name='profile-popup'
        title='Редактировать профиль'
        isOpen={props.isEditProfilePopupOpen}
        onClose={props.onClose}
        children={
          <fieldset className='popup__input-container'>
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
            <input
              type='submit'
              className='popup__button'
              value='Сохранить'
              aria-label='Сохранить изменения'
            />
          </fieldset>
        }
      />
      {/* секция попапа для изменения аватара профиля */}
      <PopupWithForm
        name='avatar-popup'
        title='Обновить аватар'
        isOpen={props.isEditAvatarPopupOpen}
        onClose={props.onClose}
        children={
          <fieldset className='popup__input-container'>
            <input
              type='url'
              className='popup__input avatar-popup__input-link'
              name='avatar-link'
              placeholder='Ссылка на аватар'
              required
            />
            <span className='popup__error' id='avatar-link-error'></span>
            <input
              type='submit'
              className='popup__button'
              value='Сохранить'
              aria-label='Сохранить изменения'
            />
          </fieldset>
        }
      />
      {/* секция попапа для добавления картинки */}
      <PopupWithForm
        name='add-popup'
        title='Новое место'
        isOpen={props.isAddPlacePopupOpen}
        onClose={props.onClose}
        children={
          <fieldset className='popup__input-container'>
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
            <input
              type='submit'
              className='popup__button'
              value='Сохранить'
              aria-label='Сохранить изменения'
            />
          </fieldset>
        }
      />
      {/* секция попапа для подтверждения удаления карточки */}
      <PopupWithForm
        name='delete-popup'
        title='Вы уверены?'
        onClose={props.onClose}
        children={
          <fieldset className='popup__input-container'>
            <input
              type='submit'
              className='popup__button'
              value='Да'
              aria-label='Удалить карточку'
            />
          </fieldset>
        }
      />
      {/* секция попапа для увеличения изображения */}
      <ImagePopup card={props.selectedCard} onClose={props.onClose} />
    </main>
  );
}

export default Main;
