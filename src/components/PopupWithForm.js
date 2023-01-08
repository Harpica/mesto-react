import React from 'react';

function PopupWithForm(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  React.useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);
  return (
    <section className={`popup ${props.name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <form
          className={`popup__form ${props.name}__form`}
          name={`${props.name}-form`}
        >
          <button
            className='button close-button'
            type='button'
            onClick={props.onClose}
          ></button>
          <h2 className='popup__title'>{props.title}</h2>
          {props.children}
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
