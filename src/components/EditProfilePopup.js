import PopupWithForm from './PopupWithForm';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChange(e, setValue) {
    setValue(e.target.value);
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
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
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
          handleChange(e, setName);
        }}
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
        value={description || ''}
        onChange={(e) => {
          handleChange(e, setDescription);
        }}
      />
      <span className='popup__error' id='profile-job-error'></span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
