import React from 'react';
import Card from './Card';
import { Skeleton } from '@mui/material';
import _ from 'lodash';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  cards,
  onAddPlace,
  onCardClick,
  onCardDelete,
  onCardLike,
  onClick,
  onEditAvatar,
  onEditProfile,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__image-container' onClick={onEditAvatar}>
          {currentUser.avatar ? (
            <div
              className='profile__photo'
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
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
          {currentUser.name ? (
            <h1 className='profile__name'>{currentUser.name}</h1>
          ) : (
            <Skeleton variant='text' sx={{ bgcolor: 'grey.900' }}>
              <h1 className='profile__name'>Skeleton</h1>
            </Skeleton>
          )}

          <button
            className='button edit-button edit-button_place_profile'
            type='button'
            aria-label='Редактировать профиль'
            onClick={onEditProfile}
          ></button>
          {currentUser.about ? (
            <p className='profile__description'>{currentUser.about}</p>
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
          onClick={onAddPlace}
        ></button>
      </section>
      <section className='photos'>
        <ul className='photos__list'>
          {cards.length
            ? cards.map((card, i) => (
                <Card
                  key={card._id}
                  cardElement={card}
                  onClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
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
