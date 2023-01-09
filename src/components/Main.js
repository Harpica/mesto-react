import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import React from 'react';
import { api } from '../utils/Api';
import Card from './Card';
import { Skeleton } from '@mui/material';
import _ from 'lodash';
import CardTemplate from './CardTemplate';

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
  }, []);

  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__image-container' onClick={props.onEditAvatar}>
          {userAvatar.length ? (
            <div
              className='profile__photo'
              style={{ backgroundImage: `url(${userAvatar})` }}
            ></div>
          ) : (
            <Skeleton
              sx={{ bgcolor: 'grey.900' }}
              variant='circular'
              height={120}
              width={120}
            />
          )}
        </div>
        <div className='profile__name-container'>
          {userName.length ? (
            <h1 className='profile__name'>{userName}</h1>
          ) : (
            <Skeleton variant='text' sx={{ bgcolor: 'grey.900' }}>
              <h1 className='profile__name'>Skeleton</h1>
            </Skeleton>
          )}

          <button
            className='button edit-button edit-button_place_profile'
            type='button'
            aria-label='Редактировать профиль'
            onClick={props.onEditProfile}
          ></button>
          {userDescription.length ? (
            <p className='profile__description'>{userDescription}</p>
          ) : (
            <Skeleton variant='text' sx={{ bgcolor: 'grey.900' }}>
              <p className='profile__description'>Skeleton</p>
            </Skeleton>
          )}
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
          {cards.length
            ? cards.map((card, i) => (
                <Card key={card._id} card={card} onClick={props.onCardClick} />
              ))
            : _.range(6).map((card, i) => (
                <Skeleton
                  key={i}
                  variant='rectangle'
                  sx={{ bgcolor: 'grey.900' }}
                >
                  <CardTemplate />
                </Skeleton>
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
