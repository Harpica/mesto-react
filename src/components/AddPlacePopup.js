import React from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, isLoading }) => {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(name, link);
  }
  function handleChange(e, setValue) {
    setValue(e.target.value);
  }

  return (
    <PopupWithForm
      name='add-popup'
      title='Новое место'
      buttonText='Сохранить'
      buttonLoadingText='Сохранение...'
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        className='popup__input add-popup__input-title'
        name='photo-title'
        placeholder='Название'
        minLength='2'
        maxLength='30'
        required
        value={name}
        onChange={(e) => {
          handleChange(e, setName);
        }}
      />
      <span className='popup__error' id='photo-title-error'></span>
      <input
        type='url'
        className='popup__input add-popup__input-link'
        name='photo-link'
        placeholder='Ссылка на картинку'
        required
        value={link}
        onChange={(e) => {
          handleChange(e, setLink);
        }}
      />
      <span className='popup__error' id='photo-link-error'></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
