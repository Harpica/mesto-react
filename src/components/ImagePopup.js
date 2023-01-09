function ImagePopup(props) {
  return (
    <section
      className={`popup image-popup popup_opacity_small ${
        Object.keys(props.card).length ? 'popup_opened' : ''
      }`}
    >
      <div className='image-container'>
        <figure className='popup__figure'>
          <img
            src={props.card.link}
            alt={props.card.name}
            className='popup__image'
          />
          <figcaption className='popup__caption'>{props.card.name}</figcaption>
        </figure>
        <button
          className='button close-button'
          type='button'
          onClick={props.onClose}
        ></button>
      </div>
    </section>
  );
}

export default ImagePopup;
