import React from 'react';

// inputValidators:  {
//    [key: string (is equal to the name of input)] : Validator (class Validator)
// }

const useForm = (inputValidators, isInitialValid = true) => {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [validities, setValidities] = React.useState({});
  const [isValid, setIsValid] = React.useState(isInitialValid);

  React.useEffect(() => {
    const validate = (key, value) => {
      const { errorMessage, isValid } = inputValidators[key].validate(value);
      if (isValid === false) {
        if (errors[key] === errorMessage) {
          return;
        }
        setErrors((errors) => ({
          ...errors,
          [key]: errorMessage,
        }));
        setValidities((validities) => ({
          ...validities,
          [key]: false,
        }));
        return;
      }
      if (errors[key] === '' || errors === {}) {
        return;
      }
      setErrors((errors) => ({
        ...errors,
        [key]: '',
      }));
      setValidities((validities) => ({
        ...validities,
        [key]: true,
      }));
    };

    // Для каждого required, проверяем, есть ли там значение, если нет, то сразу записываем false в validities для инпута
    Object.keys(inputValidators).forEach((key) => {
      if (
        inputValidators[key].required === true &&
        values[key] === undefined &&
        validities[key] === undefined
      ) {
        setValidities((validities) => ({ ...validities, [key]: false }));
        return;
      }
    });

    // Если значения values уже прогрузились и не undefined - делаем валидацию
    if (
      Object.values(values).every(
        (value) => value !== undefined && value !== null
      )
    ) {
      Object.keys(values).forEach((key) => {
        validate(key, values[key]);
      });
    }
  }, [values, errors, inputValidators, validities]);

  // Смотрим, что все validities true - делаем всю форму валидной
  React.useEffect(() => {
    if (
      Object.values(validities).some((value) => {
        return value === false;
      })
    ) {
      setIsValid(false);
      return;
    } else if (Object.values(validities).every((value) => value === true)) {
      setIsValid(true);
      return;
    }
  }, [validities]);

  function handleChange(e) {
    const name = e.target.name;
    if (e.target.value !== undefined) {
      setValues((values) => ({ ...values, [name]: e.target.value }));
    }
  }

  function resetForm() {
    setValidities({});
    setErrors({});
    setValues({});
    setIsValid(isInitialValid);
  }

  return {
    handleChange,
    resetForm,
    values,
    setValues,
    errors,
    validities,
    isValid,
  };
};

export default useForm;
