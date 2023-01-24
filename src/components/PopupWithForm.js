import React from 'react';

function PopupWithForm({
  isOpen,
  onClose,
  onSubmit,
  name,
  title,
  buttonText,
  children,
}) {
  return (
    <section className={`popup ${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <form
          className={`popup__form ${name}__form`}
          name={`${name}-form`}
          onSubmit={onSubmit}
        >
          <button
            className='button close-button'
            type='button'
            onClick={onClose}
          ></button>
          <h2 className='popup__title'>{title}</h2>
          <fieldset className='popup__input-container'>
            {children}
            <button
              type='submit'
              className='popup__button'
              aria-label='Сохранить изменения'
            >
              {buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
