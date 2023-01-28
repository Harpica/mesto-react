import React from 'react';
import PopupWithForm from './PopupWithForm';
import useForm from '../hooks/useForm';
import { Validator } from '../utils/validator';
import { TEXT_MAXLENGTH, TEXT_MINLENGTH } from '../utils/constants';

// New validator for each input field
const nameValidator = new Validator({
  minLength: TEXT_MINLENGTH,
  maxLength: TEXT_MAXLENGTH,
  required: true,
});
const linkValidator = new Validator({
  isUrl: true,
  required: true,
});

const AddPlacePopup = React.memo(
  ({ isOpen, onClose, onAddPlace, isLoading }) => {
    const { handleChange, values, errors, validities, isValid, resetForm } =
      useForm({ title: nameValidator, link: linkValidator }, false);

    function handleSubmit() {
      onAddPlace(values.title, values.link);
      resetForm();
    }
    function handleOnClose() {
      resetForm();
      onClose();
    }
    return (
      <PopupWithForm
        name='add-popup'
        title='Новое место'
        buttonText='Сохранить'
        buttonLoadingText='Сохранение...'
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={handleOnClose}
        onSubmit={handleSubmit}
        isValid={isValid}
      >
        <input
          type='text'
          className='popup__input'
          name='title'
          placeholder='Название'
          minLength={TEXT_MINLENGTH}
          maxLength={TEXT_MAXLENGTH}
          required
          value={values.title ?? ''}
          onChange={handleChange}
        />
        <span
          className={`popup__error ${
            !validities.title && 'popup__error_visible'
          }`}
          id='photo-title-error'
        >
          {errors.title}
        </span>
        <input
          type='url'
          className='popup__input'
          name='link'
          placeholder='Ссылка на картинку'
          required
          value={values.link ?? ''}
          onChange={handleChange}
        />
        <span
          className={`popup__error ${
            !validities.link && 'popup__error_visible'
          }`}
          id='photo-link-error'
        >
          {errors.link}
        </span>
      </PopupWithForm>
    );
  }
);

export default AddPlacePopup;
