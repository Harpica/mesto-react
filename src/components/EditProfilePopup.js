import React from 'react';
import PopupWithForm from './PopupWithForm';
import useForm from '../hooks/useForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Validator } from '../utils/validator';
import { TEXT_MAXLENGTH, TEXT_MINLENGTH } from '../utils/constants';
import useEscapeKey from '../hooks/useEsc';
import useOutsideClick from '../hooks/useOutsideClick';

// New validator for each input field
const nameValidator = new Validator({
  minLength: TEXT_MINLENGTH,
  maxLength: TEXT_MAXLENGTH,
  required: true,
});
const descriptionValidator = new Validator({
  minLength: TEXT_MINLENGTH,
  maxLength: TEXT_MAXLENGTH,
  required: true,
});

const EditProfilePopup = React.memo(
  ({ isOpen, onClose, onUpdateUser, isLoading }) => {
    const currentUser = React.useContext(CurrentUserContext);

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

    const ref = useOutsideClick(handleOnClose, isOpen);

    React.useEffect(() => {
      setValues((values) => ({
        ...values,
        name: currentUser.name,
        description: currentUser.about,
      }));
    }, [isOpen, currentUser, setValues]);

    useEscapeKey(handleOnClose, isOpen);

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
        popupRef={ref}
      >
        <input
          type='text'
          className='popup__input'
          id='input-name'
          name='name'
          placeholder='Имя'
          minLength={TEXT_MINLENGTH}
          maxLength={TEXT_MAXLENGTH}
          required
          value={values.name ?? ''}
          onChange={handleChange}
        />
        <span
          className={`popup__error ${
            !validities.name && 'popup__error_visible'
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
          minLength={TEXT_MINLENGTH}
          maxLength={TEXT_MAXLENGTH}
          required
          value={values.description ?? ''}
          onChange={handleChange}
        />
        <span
          className={`popup__error ${
            !validities.description && 'popup__error_visible'
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
