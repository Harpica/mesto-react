import React from 'react';
import useEscapeKey from '../hooks/useEsc';
import useOutsideClick from '../hooks/useOutsideClick';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = React.memo(
  ({ isOpen, onClose, onUpdateAvatar, isLoading }) => {
    const inputRef = React.useRef();
    const [isValid, setIsValid] = React.useState(false);

    const ref = useOutsideClick(handleClose, isOpen);

    useEscapeKey(handleClose, isOpen);

    // validation according to validity state of inputRef
    function handleChange(e) {
      if (inputRef.current.validity.valid === true) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }

    function handleSubmit(e) {
      onUpdateAvatar(inputRef.current.value);
      resetForm();
    }
    function handleClose() {
      onClose();
      resetForm();
    }
    function resetForm() {
      inputRef.current.value = '';
      setIsValid(false);
    }

    return (
      <PopupWithForm
        name='avatar-popup'
        title='Обновить аватар'
        buttonText='Сохранить'
        buttonLoadingText='Сохранение...'
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        isValid={isValid}
        popupRef={ref}
      >
        <input
          ref={inputRef}
          type='url'
          className='popup__input avatar-popup__input-link'
          name='avatar-link'
          placeholder='Ссылка на аватар'
          onChange={handleChange}
          required
        />
        <span className='popup__error' id='avatar-link-error'></span>
      </PopupWithForm>
    );
  }
);

export default EditAvatarPopup;
