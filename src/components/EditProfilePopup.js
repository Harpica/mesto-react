import PopupWithForm from './PopupWithForm';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Validator } from '../utils/Validator';
import useForm from '../hooks/useForm';

const EditProfilePopup = React.memo(
  ({ isOpen, onClose, onUpdateUser, isLoading }) => {
    const currentUser = React.useContext(CurrentUserContext);
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

    const {
      handleChange,
      values,
      setValues,
      errors,
      validities,
      isValid,
      resetForm,
    } = useForm(
      { name: nameValidator, description: descriptionValidator },
      true
    );

    React.useEffect(() => {
      setValues((values) => ({
        ...values,
        name: currentUser.name,
        description: currentUser.about,
      }));
    }, [isOpen, currentUser, setValues]);

    function handleSubmit() {
      onUpdateUser(values.name, values.description);
    }
    function handleOnClose() {
      resetForm();
      onClose();
    }

    return (
      <PopupWithForm
        name='profile-popup'
        title='Редактировать профиль'
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
          id='input-name'
          name='name'
          placeholder='Имя'
          minLength='2'
          maxLength='40'
          required
          value={values.name ?? ''}
          onChange={handleChange}
        />
        <span
          className={`popup__error ${
            validities.name === false ? 'popup__error_visible' : ''
          }`}
          id='profile-name-error'
        >
          {errors.name}
        </span>
        <input
          type='text'
          className='popup__input'
          id='input-description'
          name='description'
          placeholder='Род деятельности'
          minLength='2'
          maxLength='40'
          required
          value={values.description ?? ''}
          onChange={handleChange}
        />
        <span
          className={`popup__error ${
            validities.description === false ? 'popup__error_visible' : ''
          }`}
          id='profile-job-error'
        >
          {errors.description}
        </span>
      </PopupWithForm>
    );
  }
);

export default EditProfilePopup;
