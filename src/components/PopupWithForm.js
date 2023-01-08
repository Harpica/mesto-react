function PopupWithForm(props) {
  return (
    <section className={`popup ${props.name}`}>
      <div className='popup__container'>
        <form
          className={`popup__form ${props.name}__form`}
          name={`${props.name}-form`}
        >
          <button className='button close-button' type='button'></button>
          <h2 className='popup__title'>{props.title}</h2>
          {props.children}
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
