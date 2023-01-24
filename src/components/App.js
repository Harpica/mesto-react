import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  // переменная стейта с информацией о карточках
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => console.log(err));
    api
      .getUserInfo()
      .then((user) => setCurrentUser(user))
      .catch((err) => console.log(err));
  }, []);

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
    setSelectedCard({});
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => setCards((state) => state.filter((c) => c._id !== card._id)))
      .catch((err) => console.log(err));
  }
  function handleUpdateUser(name, about) {
    api
      .setUserInfo(name, about)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
        console.log('submit');
      })
      .catch((err) => console.log(err));
  }
  function handleUpdateAvatar(avatar) {
    api
      .setUserAvatar(avatar)
      .then((avatar) => {
        setCurrentUser((state) => {
          state.avatar = avatar;
          return state;
        });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  function handleAddPlaceSubmit(name, link) {
    api
      .postCard({ name: name, link: link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className='root'>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        {/* секция попапа для изменения данных профиля  */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        {/* секция попапа для изменения аватара профиля */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        {/* секция попапа для добавления картинки */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        {/* секция попапа для подтверждения удаления карточки */}
        <PopupWithForm
          name='delete-popup'
          title='Вы уверены?'
          buttonText='Да'
          onClose={closeAllPopups}
        />
        {/* секция попапа для увеличения изображения */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
