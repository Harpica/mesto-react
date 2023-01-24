import React from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(inputRef.current.value);
  }

  return (
    <PopupWithForm
      name='avatar-popup'
      title='Обновить аватар'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        type='url'
        className='popup__input avatar-popup__input-link'
        name='avatar-link'
        placeholder='Ссылка на аватар'
        required
      />
      <span className='popup__error' id='avatar-link-error'></span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
