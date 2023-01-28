import React from 'react';

const MOUSE_UP = 'mouseup';

export default function useOutsideClick(handleClose, isOpen) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref?.current?.contains && !ref.current.contains(event.target)) {
        handleClose();
      }
    };
    if (isOpen) {
      document.addEventListener(MOUSE_UP, handleOutsideClick, false);
      return;
    }
    document.removeEventListener(MOUSE_UP, handleOutsideClick, false);
  }, [handleClose, isOpen]);
  return ref;
}
