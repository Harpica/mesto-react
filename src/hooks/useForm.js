import React from 'react';

const useForm = (inputValidators, isInitialValid = true) => {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [validities, setValidities] = React.useState({});
  const [isValid, setIsValid] = React.useState(isInitialValid);

  React.useEffect(() => {
    function checkFormValidity() {
      // initial check or check after popup'd being closed
      if (Object.values(validities).length === 0) {
        setIsValid(isInitialValid);
        setErrors({});
        return;
      }
      // checking while changing inputs
      if (Object.values(validities).some((value) => value === false)) {
        setIsValid(false);
        return;
      } else if (Object.values(validities).every((value) => value === true)) {
        setIsValid(true);
        setErrors({});
        return;
      }
    }
    checkFormValidity();
  }, [validities, isInitialValid]);

  function handleChange(e) {
    const name = e.target.name;
    if (e.target.value !== undefined) {
      setValues((values) => ({ ...values, [name]: e.target.value }));
      validate(e.target.name, e.target.value);
    }
  }

  function resetForm() {
    setValidities({});
    setErrors({});
    setValues({});
  }

  function validate(key, value) {
    inputValidators[key].setValue(value);
    inputValidators[key].validate();
    if (inputValidators[key].isValid === false) {
      setErrors((errors) => ({
        ...errors,
        [key]: inputValidators[key].errorMessage,
      }));
      setValidities((validities) => ({
        ...validities,
        [key]: false,
      }));

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
  }

  return {
    handleChange,
    resetForm,
    values,
    setValues,
    errors,
    validities,
    isValid,
    validate,
  };
};

export default useForm;
