import { Card } from './components/Card.js';

// Создает кнопку. buttonClass указывается в формате '.buttonClass'
function setButtonListener(container, buttonClass, action) {
  const buttons = Array.from(container.querySelectorAll(buttonClass));
  buttons.forEach((button) => {
    button.addEventListener('click', action);
  });
}

function setCardParam(userInfo, cardItem) {
  const isOwner = isCardOwner(
    userInfo.getUserValues().name,
    cardItem.owner.name
  );
  const cardID = cardItem._id;
  const isLiked = isLikedCard(cardItem.likes, userInfo.getUserValues()._id);
  const numberOfLikes = cardItem.likes.length;
  return {
    isOwner: isOwner,
    cardID: cardID,
    isLiked: isLiked,
    numberOfLikes: numberOfLikes,
  };
}

function isCardOwner(userName, cardOwner) {
  if (userName === cardOwner) {
    return true;
  }
  return false;
}

function isLikedCard(likesArray, userID) {
  if (likesArray.length !== 0) {
    for (let i = 0; i < likesArray.length; i++) {
      if (likesArray[i]._id === userID) {
        return true;
      }
    }
  }
  return false;
}

function getCardRenderer(api, userInfo, imagePopup, deletePopup) {
  return (cardItem) => {
    const cardParam = setCardParam(userInfo, cardItem);
    const card = new Card(
      cardItem.link,
      cardItem.name,
      cardParam,
      '#photos-element'
    );
    card.setCardActions(
      setOnClickCardHandler(imagePopup, cardItem),
      setLikeCardHandler(api, cardItem, card),
      setDeleteCardHandler(deletePopup, cardItem, card)
    );
    return card.getCardElement();
  };
}

function setOnClickCardHandler(imagePopup, cardItem) {
  return () => {
    imagePopup.open(cardItem.link, cardItem.name);
  };
}

function setLikeCardHandler(api, cardItem, card) {
  return () => {
    if (card._isLiked === false) {
      api
        .likeCard(cardItem._id)
        .then((cardItem) => card.addLike(cardItem))
        .catch((err) => console.log(err));
    } else if (card._isLiked === true) {
      api
        .removeLikeCard(cardItem._id)
        .then((cardItem) => card.addLike(cardItem))
        .catch((err) => console.log(err));
    }
  };
}

function setDeleteCardHandler(deletePopup, cardItem, card) {
  return () => {
    deletePopup.setCardParam(cardItem, card);
    deletePopup.open();
  };
}

export { setButtonListener, getCardRenderer };
