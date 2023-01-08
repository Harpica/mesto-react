import avatar from '../images/Avatar.png';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';

function Main() {
  function handleEditAvatarClick() {
    const avatarPopup = document.querySelector('.avatar-popup');
    avatarPopup.classList.add('popup_opened');
  }
  function handleEditProfileClick() {
    const profilePopup = document.querySelector('.profile-popup');
    profilePopup.classList.add('popup_opened');
  }
  function handleAddPlaceClick() {
    const addPhotoPopup = document.querySelector('.add-popup');
    addPhotoPopup.classList.add('popup_opened');
  }
  return (
    <main className='content'>
      <section className='profile'>
        <div
          className='profile__image-container'
          onClick={handleEditAvatarClick}
        >
          <img className='profile__photo' src={avatar} alt='Аватар' />
        </div>
        <div className='profile__name-container'>
          <h1 className='profile__name'>Жак-Ив Кусто</h1>
          <button
            className='button edit-button edit-button_place_profile'
            type='button'
            aria-label='Редактировать профиль'
            onClick={handleEditProfileClick}
          ></button>
          <p className='profile__description'>Исследователь океана</p>
        </div>
        <button
          className='button add-button add-button_place_profile'
          type='button'
          aria-label='Добавить новое Фото'
          onClick={handleAddPlaceClick}
        ></button>
      </section>
      <section className='photos'>
        <ul className='photos__list'></ul>
      </section>
      {/* секция попапа для изменения данных профиля  */}
      <PopupWithForm
        name='profile-popup'
        title='Редактировать профиль'
        children={
          <fieldset className='popup__input-container'>
            <input
              type='text'
              className='popup__input'
              id='input-name'
              name='profile-name'
              placeholder='Имя'
              minLength='2'
              maxLength='40'
              required
            />
            <span className='popup__error' id='profile-name-error'></span>
            <input
              type='text'
              className='popup__input'
              id='input-description'
              name='profile-job'
              placeholder='Род деятельности'
              minLength='2'
              maxLength='40'
              required
            />
            <span className='popup__error' id='profile-job-error'></span>
            <input
              type='submit'
              className='popup__button'
              value='Сохранить'
              aria-label='Сохранить изменения'
            />
          </fieldset>
        }
      />
      {/* секция попапа для изменения аватара профиля */}
      <PopupWithForm
        name='avatar-popup'
        title='Обновить аватар'
        children={
          <fieldset className='popup__input-container'>
            <input
              type='url'
              className='popup__input avatar-popup__input-link'
              name='avatar-link'
              placeholder='Ссылка на аватар'
              required
            />
            <span className='popup__error' id='avatar-link-error'></span>
            <input
              type='submit'
              className='popup__button'
              value='Сохранить'
              aria-label='Сохранить изменения'
            />
          </fieldset>
        }
      />
      {/* секция попапа для добавления картинки */}
      <PopupWithForm
        name='add-popup'
        title='Новое место'
        children={
          <fieldset className='popup__input-container'>
            <input
              type='text'
              className='popup__input add-popup__input-title'
              name='photo-title'
              placeholder='Название'
              minLength='2'
              maxLength='30'
              required
            />
            <span className='popup__error' id='photo-title-error'></span>
            <input
              type='url'
              className='popup__input add-popup__input-link'
              name='photo-link'
              placeholder='Ссылка на картинку'
              required
            />
            <span className='popup__error' id='photo-link-error'></span>
            <input
              type='submit'
              className='popup__button'
              value='Сохранить'
              aria-label='Сохранить изменения'
            />
          </fieldset>
        }
      />
      {/* секция попапа для подтверждения удаления карточки */}
      <PopupWithForm
        name='delete-popup'
        title='Вы уверены?'
        children={
          <fieldset className='popup__input-container'>
            <input
              type='submit'
              className='popup__button'
              value='Да'
              aria-label='Удалить карточку'
            />
          </fieldset>
        }
      />
      {/* секция попапа для увеличения изображения */}
      <ImagePopup />
    </main>
  );
}

export default Main;
