const SimpleFormValidation = (
  values,
  addError,
  removeError,
  isFormDataValid
) => {
  if (values.firstname) {
    removeError("firstname", "required_error");
    if (values.firstname.value && values.firstname.value.trim().length < 5) {
      addError("firstname", "invalid_name", "name is wrong ok");
    } else {
      removeError("firstname", "invalid_name");
    }
  } else {
    addError("firstname", "required_error", "firstname is required!");
  }

  if (values.age) {
    const ageInNumber = +values.age.value;
    if (ageInNumber < 0 || ageInNumber > 100) {
      addError("age", "invalid_age", "age is incorrect");
    } else {
      removeError("age", "invalid_age");
    }
  }
};

export default SimpleFormValidation;