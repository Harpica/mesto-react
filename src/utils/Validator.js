export class Validator {
  constructor({
    minLength = false,
    maxLength = false,
    required = false,
    isUrl = false,
  }) {
    this._minLength = minLength;
    this._maxLength = maxLength;
    this._required = required;
    this._isUrl = isUrl;
    this.errorMessage = '';
    this.isValid = true;
  }
  setValue(value) {
    this._value = value;
  }
  validate() {
    if (
      this._minLength !== false &&
      this._value.length < this._minLength &&
      this._value.length > 0
    ) {
      this.errorMessage = `Минимальное количество символов: ${this._minLength}`;
      this.isValid = false;
    } else if (
      this._maxLength !== false &&
      this._value.length >= this._maxLength
    ) {
      this.errorMessage = `Максимальное количество символов: ${this._maxLength}`;
      this.isValid = false;
    } else if (this._required !== false && this._value.length < 1) {
      this.errorMessage = `Данное поле обязательно к заполнению`;
      this.isValid = false;
    } else {
      this._setIsValidTrue();
    }
  }
  _setIsValidTrue() {
    this.errorMessage = '';
    this.isValid = true;
  }
}

export function checkFormValidity(arrayOfStates) {
  if (arrayOfStates !== undefined) {
    if (arrayOfStates.some((state) => state === false)) {
      return false;
    }
  }
  return true;
}
