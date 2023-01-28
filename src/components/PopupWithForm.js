import React from 'react';

const PopupWithForm = React.memo(
  ({
    isOpen,
    onClose,
    onSubmit,
    isLoading,
    name,
    title,
    buttonText,
    buttonLoadingText,
    isValid,
    popupRef,
    children,
  }) => {
    function handleSubmit(e) {
      e.preventDefault();
      onSubmit();
    }
    return (
      <section className={`popup ${name} ${isOpen ? 'popup_opened' : ''}`}>
        <div className='popup__container' ref={popupRef}>
          <form
            className={`popup__form ${name}__form`}
            name={`${name}-form`}
            onSubmit={handleSubmit}
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
                className={`popup__button ${
                  isValid ? '' : 'popup__button_disabled'
                }`}
                aria-label='Сохранить изменения'
              >
                {isLoading ? buttonLoadingText : buttonText}
              </button>
            </fieldset>
          </form>
        </div>
      </section>
    );
  }
);

export default PopupWithForm;
