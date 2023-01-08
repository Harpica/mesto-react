import logo from './images/logo.svg';
import avatar from './images/Avatar.png';

function App() {
  return (
    <body className='root'>
      <header className='header'>
        <img className='logo' src={logo} alt='Логотип Mesto Russia' />
      </header>
      <main className='content'>
        <section className='profile'>
          <div className='profile__image-container'>
            <img className='profile__photo' src={avatar} alt='Аватар' />
          </div>
          <div className='profile__name-container'>
            <h1 className='profile__name'>Жак-Ив Кусто</h1>
            <button
              className='button edit-button edit-button_place_profile'
              type='button'
              aria-label='Редактировать профиль'
            ></button>
            <p className='profile__description'>Исследователь океана</p>
          </div>
          <button
            className='button add-button add-button_place_profile'
            type='button'
            aria-label='Добавить новое Фото'
          ></button>
        </section>
        <section className='photos'>
          <ul className='photos__list'></ul>
        </section>
        {/* секция попапа для изменения данных профиля  */}
        <section className='popup profile-popup'>
          <div className='popup__container'>
            <form
              className='popup__form profile-popup__form'
              name='profile-form'
            >
              <button className='button close-button' type='button'></button>
              <h2 className='popup__title'>Редактировать профиль</h2>
              <fieldset className='popup__input-container'>
                <input
                  type='text'
                  className='popup__input'
                  id='input-name'
                  name='profile-name'
                  placeholder='Имя'
                  minlength='2'
                  maxlength='40'
                  required
                />
                <span className='popup__error' id='profile-name-error'></span>
                <input
                  type='text'
                  className='popup__input'
                  id='input-description'
                  name='profile-job'
                  placeholder='Род деятельности'
                  minlength='2'
                  maxlength='40'
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
            </form>
          </div>
        </section>
        {/* секция попапа для изменения аватара профиля */}
        <section className='popup avatar-popup'>
          <div className='popup__container'>
            <form className='popup__form avatar-popup__form' name='avatar-form'>
              <button className='button close-button' type='button'></button>
              <h2 className='popup__title'>Обновить аватар</h2>
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
            </form>
          </div>
        </section>
        {/* секция попапа для увеличения изображения */}
        <section className='popup image-popup popup_opacity_small'>
          <div className='image-container'>
            <figure className='popup__figure'>
              <img
                src='#'
                alt='Увеличенное изображение'
                className='popup__image'
              />
              <figcaption className='popup__caption'></figcaption>
            </figure>
            <button className='button close-button' type='button'></button>
          </div>
        </section>
        {/* секция попапа для добавления картинки */}
        <section className='popup add-popup'>
          <div className='popup__container'>
            <form className='popup__form add-popup__form' name='add-photo-form'>
              <button className='button close-button' type='button'></button>
              <h2 className='popup__title'>Новое место</h2>
              <fieldset className='popup__input-container'>
                <input
                  type='text'
                  className='popup__input add-popup__input-title'
                  name='photo-title'
                  placeholder='Название'
                  minlength='2'
                  maxlength='30'
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
            </form>
          </div>
        </section>
        {/* секция попапа для подтверждения удаления карточки */}
        <section className='popup delete-popup'>
          <div className='popup__container'>
            <form className='popup__form delete-popup__form' name='delete-form'>
              <button className='button close-button' type='button'></button>
              <h2 className='popup__title'>Вы уверены?</h2>
              <fieldset className='popup__input-container'>
                <input
                  type='submit'
                  className='popup__button'
                  value='Да'
                  aria-label='Удалить карточку'
                />
              </fieldset>
            </form>
          </div>
        </section>
      </main>
      <footer className='footer'>
        <p className='footer__copyright'>
          {String.fromCodePoint(0x00a9)} 2022 Mesto Russia
        </p>
      </footer>

      <template id='photos-element'>
        <li className='photos__element'>
          <img className='photos__image' src='#' alt='Иллюстрация' />
          <div className='photos__title-container'>
            <h2 className='photos__title'>Template title</h2>
            <div>
              <button
                className='button like-button like-button_place_photos'
                type='button'
                aria-label='Добавить в избранное'
              ></button>
              <p className='photos__like-counter'>0</p>
            </div>
          </div>
          <button
            className='button delete-button photos__delete-button'
            type='button'
            aria-label='Удалить'
          ></button>
        </li>
      </template>
    </body>
  );
}

export default App;
