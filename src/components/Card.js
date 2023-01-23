import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onClick }) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((like) => like._id === currentUser._id);

  function handleClick() {
    onClick(card);
  }
  return (
    <li className='photos__element'>
      <div
        className='photos__image'
        style={{ backgroundImage: `url(${card.link})` }}
        onClick={handleClick}
      />
      <div className='photos__title-container'>
        <h2 className='photos__title'>{card.name}</h2>
        <div>
          <button
            className={`button like-button like-button_place_photos ${
              isLiked && 'like-button_active'
            }`}
            type='button'
            aria-label='Добавить в избранное'
          />
          <p className='photos__like-counter'>{card.likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button
          className='button delete-button photos__delete-button'
          type='button'
          aria-label='Удалить'
        />
      )}
    </li>
  );
}

export default Card;
