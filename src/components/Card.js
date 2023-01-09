function Card(props) {
  function handleClick() {
    props.onClick(props.card);
  }
  return (
    <li key={props.card.id} className='photos__element' onClick={handleClick}>
      <img className='photos__image' src={props.card.link} alt='Иллюстрация' />
      <div className='photos__title-container'>
        <h2 className='photos__title'>{props.card.name}</h2>
        <div>
          <button
            className='button like-button like-button_place_photos'
            type='button'
            aria-label='Добавить в избранное'
          ></button>
          <p className='photos__like-counter'>{props.card.likes.length}</p>
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

export default Card;
