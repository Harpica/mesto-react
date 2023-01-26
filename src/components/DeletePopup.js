import React from 'react';
import PopupWithForm from './PopupWithForm';

const DeletePopup = ({ isOpen, onClose, onCardDelete, isLoading, card }) => {
  function handleSubmit() {
    onCardDelete(card);
  }
  return (
    <PopupWithForm
      name='delete-popup'
      title='Вы уверены?'
      buttonText='Да'
      buttonLoadingText='Удаление...'
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      isLoading={isLoading}
      isValid={true}
    />
  );
};

export default DeletePopup;
