import PopupWithForm from './PopupWithForm';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Validator } from '../utils/Validator';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoading }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [nameIsValid, setNameIsValid] = React.useState(true);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [descriptionIsValid, setDescriptionIsValid] = React.useState(true);
  const [descriptionErrorMessage, setDescriptionErrorMessage] =
    React.useState('');

  const nameValidator = new Validator({
    minLength: 3,
    maxLength: 40,
    required: true,
  });
  const descriptionValidator = new Validator({
    minLength: 3,
    maxLength: 40,
    required: true,
  });

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen, currentUser]);

  // Убираем ошибки с предыдущего открытия попапа
  React.useEffect(() => {
    setNameErrorMessage('');
    setDescriptionErrorMessage('');
  }, [isOpen]);

  function handleChange(e, setValue, validator, setIsValid, setErrorMessage) {
    setValue(e.target.value);
    validator.setValue(e.target.value);
    validator.validate();
    if (validator.isValid === false) {
      setIsValid(false);
      setErrorMessage(validator.errorMessage);
      return;
    }
    setIsValid(true);
    setErrorMessage('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(name, description);
  }

  return (
    <PopupWithForm
      name='profile-popup'
      title='Редактировать профиль'
      buttonText='Сохранить'
      buttonLoadingText='Сохранение...'
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      inputValidityStates={[nameIsValid, descriptionIsValid]}
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
        value={name || ''}
        onChange={(e) => {
          handleChange(
            e,
            setName,
            nameValidator,
            setNameIsValid,
            setNameErrorMessage
          );
        }}
      />
      <span
        className={`popup__error ${nameIsValid ? '' : 'popup__error_visible'}`}
        id='profile-name-error'
      >
        {nameErrorMessage}
      </span>
      <input
        type='text'
        className='popup__input'
        id='input-description'
        name='profile-job'
        placeholder='Род деятельности'
        minLength='2'
        maxLength='40'
        required
        value={description || ''}
        onChange={(e) => {
          handleChange(
            e,
            setDescription,
            descriptionValidator,
            setDescriptionIsValid,
            setDescriptionErrorMessage
          );
        }}
      />
      <span
        className={`popup__error ${
          descriptionIsValid ? '' : 'popup__error_visible'
        }`}
        id='profile-job-error'
      >
        {descriptionErrorMessage}
      </span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
