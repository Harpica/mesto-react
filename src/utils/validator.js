export class Validator {
  constructor({
    minLength = false,
    maxLength = false,
    required = false,
    isUrl = false,
  }) {
    this._minLength = minLength;
    this._maxLength = maxLength;
    this.required = required;
    this._isUrl = isUrl;
  }
  validate(value) {
    if (
      this._minLength !== false &&
      value.length < this._minLength &&
      value.length > 0
    ) {
      return {
        errorMessage: `Минимальное количество символов: ${this._minLength}`,
        isValid: false,
      };
    } else if (this._maxLength !== false && value.length >= this._maxLength) {
      return {
        errorMessage: `Максимальное количество символов: ${this._maxLength}`,
        isValid: false,
      };
    } else if (this.required !== false && value.length < 1) {
      return {
        errorMessage: `Данное поле обязательно к заполнению`,
        isValid: false,
      };
    } else if (this._isUrl === true && !this._isValidUrl(value)) {
      return {
        errorMessage: `Введите ссылку`,
        isValid: false,
      };
    } else {
      return { errorMessage: '', isValid: true };
    }
  }
  _isValidUrl(url) {
    const objRE =
      /(?:https?:\/\/)?(?:[\w.]+)\.(?:[a-z]{2,6}\.?)(?:\/[\w.]*)*\/?/i;
    return objRE.test(url);
  }
}
