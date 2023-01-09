function CardTemplate() {
  return (
    <li className='photos__element'>
      <img className='photos__image' src='#' alt='Иллюстрация' />
      <div className='photos__title-container'>
        <h2 className='photos__title'>Template</h2>
        <div>
          <button
            className='button like-button like-button_place_photos'
            type='button'
            aria-label='Добавить в избранное'
          ></button>
          <p className='photos__like-counter'>Template</p>
        </div>
      </div>
      <button
        className='button delete-button photos__delete-button'
        type='button'
        aria-label='Удалить'
      ></button>
    </li>
  );
}

export default CardTemplate;