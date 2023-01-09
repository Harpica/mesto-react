function Card(props) {
  function handleClick() {
    props.onClick(props.card);
  }
  return (
    <li className='photos__element'>
      <div
        className='photos__image'
        style={{ backgroundImage: `url(${props.card.link})` }}
        onClick={handleClick}
      />
      <div className='photos__title-container'>
        <h2 className='photos__title'>{props.card.name}</h2>
        <div>
          <button
            className='button like-button like-button_place_photos'
            type='button'
            aria-label='Добавить в избранное'
          />
          <p className='photos__like-counter'>{props.card.likes.length}</p>
        </div>
      </div>
      <button
        className='button delete-button photos__delete-button'
        type='button'
        aria-label='Удалить'
      />
    </li>
  );
}

export default Card;
