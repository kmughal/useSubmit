import * as React from "react";
import {render} from "react-dom";
import useSubmit from "./useSubmit";
import SimpleValidator from "./SimpleFormValidation";

const FormExample = () => {
  const {
    onKeyDownHandler,
    setValidator,
    values,
    isFormDataValid,
    validateForm,
    getFormData
  } = useSubmit();

  setValidator(SimpleValidator);

  const submitForm = event => {
    const data = getFormData();
    console.log(data, isFormDataValid());
    event.preventDefault();
    debugger;
    return false;
  };

  return (
    <form onSubmit={submitForm}>
      <p>Is Form Valid : {JSON.stringify(isFormDataValid())}</p>
      <p>values: {JSON.stringify(values, null, 2)}</p>
      <p>data: {JSON.stringify(getFormData(), null, 2)}</p>
      <input type="text" name="firstname" onKeyUp={onKeyDownHandler} />
      <input type="number" name="age" onKeyUp={onKeyDownHandler} />
      <label>
        <input
          type="radio"
          value="male"
          name="gender"
          onClick={onKeyDownHandler}
        />
        Male
      </label>
      <label>
        <input
          type="radio"
          value="fe-male"
          name="gender"
          onClick={onKeyDownHandler}
        />
        Fe-male
      </label>
      <div>
        <input
          type="checkbox"
          value="English"
          name="eng_subject"
          onClick={onKeyDownHandler}
        />{" "}
        English
      </div>
      <div>
        <input
          type="checkbox"
          value="Math"
          name="math_subject"
          onClick={onKeyDownHandler}
        />{" "}
        Math
      </div>
      <input type="submit"></input>
    </form>
  );
};

render(<FormExample/>, document.getElementById('app'));