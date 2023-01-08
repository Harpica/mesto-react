import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
  }

  return (
    <div className='root'>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        isEditAvatarPopupOpen={isEditAvatarPopupOpen}
        isEditProfilePopupOpen={isEditProfilePopupOpen}
        isAddPlacePopupOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      />
      <Footer />

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
    </div>
  );
}

export default App;
