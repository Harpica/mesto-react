import React from 'react';
import useEscapeKey from '../hooks/useEsc';
import useOutsideClick from '../hooks/useOutsideClick';
import PopupWithForm from './PopupWithForm';

const DeletePopup = ({ isOpen, onClose, onCardDelete, isLoading, card }) => {
  const ref = useOutsideClick(onClose, isOpen);
  useEscapeKey(onClose, isOpen);

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
      popupRef={ref}
    />
  );
};

export default DeletePopup;
