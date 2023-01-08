function ImagePopup() {
  return (
    <section className='popup image-popup popup_opacity_small'>
      <div className='image-container'>
        <figure className='popup__figure'>
          <img src='#' alt='Увеличенное изображение' className='popup__image' />
          <figcaption className='popup__caption'></figcaption>
        </figure>
        <button className='button close-button' type='button'></button>
      </div>
    </section>
  );
}

export default ImagePopup;
