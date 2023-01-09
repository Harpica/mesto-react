import React from 'react';
import { api } from '../utils/Api';
import Card from './Card';
import { Skeleton } from '@mui/material';
import _ from 'lodash';

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
                  width={282}
                  height={361}
                />
              ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
