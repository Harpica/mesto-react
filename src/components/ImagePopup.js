function ImagePopup({ isOpen, card, onClose }) {
  return (
    <section
      className={`popup image-popup popup_opacity_small ${
        isOpen ? 'popup_opened' : ''
      }`}
    >
      <div className='image-container'>
        <figure className='popup__figure'>
          <img src={card.link} alt={card.name} className='popup__image' />
          <figcaption className='popup__caption'>{card.name}</figcaption>
        </figure>
        <button
          className='button close-button'
          type='button'
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}

export default ImagePopup;
