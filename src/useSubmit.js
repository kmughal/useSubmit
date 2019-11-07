import * as React from "react";

const useSubmit = () => {
  let setValidator = null,
    validator = null;

  setValidator = validatorFn => (validator = validatorFn);
  const [values, setValues] = React.useState({});

  const updateValues = (values, name, item) => {
    const loop = Object.keys(values).filter(v => v.name !== name);
    const newObject = {};
    for (let k in loop) {
      newObject[k] = values[k];
    }

    const result = Object.assign({}, newObject, item);
    setValidator(result);
  };

  const addError = (name, errorKey, message) => {
    const items = Object.keys(values).filter(v => v === name);
    let item = {};
    if (items.length === 0) {
      item = { value: null, errors: [] };
    } else {
      items.forEach(key => {
        item = values[key];
      });
    }
    if (item.errors.filter(e => e.errorKey === errorKey).length === 0) {
      item.errors.push({ errorKey, message });
    }

    updateValues(values, name, item);
  };

  const removeError = (name, errorKey) => {
    const item = values[name];
    if (!item) {
      console.warn(`${name} not found with ${errorKey}`);
      return;
    } else {
      item.errors = item.errors.filter(e => e.errorKey !== errorKey);
      if (item) updateValues(values, name, item);
    }
  };

  const assignValue = (value, name) => {

    if (!value) return;

    const newValues = Object.assign({}, values);
    const keyExists = Object.keys(values).filter(v => v === name).length > 0;

    if (keyExists) {
      newValues[name].value = value;
    } else {
      newValues[name] = { value, errors: [], valid: true };
    }
    setValues(newValues);
  };

  const onKeyDownHandler = ({ target }) => {
    assignValue(target.value, target.name);
    validateForm();
  };

  const isFormDataValid = () => {
    for (let key in values) {
      if (values[key].errors.length > 0) {
        return false;
      }
    }
    return true;
  };

  const validateForm = () => {
    if (validator) {
      validator(values, addError, removeError);
    }
  };

  const getFormData = () => {
    const data = {};
    for (let [key, item] of Object.entries(values)) {
      data[key] = item.value;
    }
    return data;
  };

  return {
    onKeyDownHandler,
    setValidator,
    values,
    isFormDataValid,
    validateForm,
    getFormData
  };
};

export default useSubmit;
