import { useState } from "react";
import { useValidation } from "./Validation/useValidation";
import { useSelect } from "./Select/useSelect";

export const useForm = (formBuilder) => {
  const initialValuesFormFields = Object.keys(formBuilder).reduce(
    (acc, key) => {
      acc[key] = "";
      return acc;
    },
    {}
  );
  const selectsField = Object.entries(formBuilder).reduce(
    (acc, [key, { field, options, lov }]) => {
      if (field === "select") acc[key] = { options, lov };
      return acc;
    },
    {}
  );
  const [values, setValues] = useState(initialValuesFormFields);
  const [errsForm, setFormErrs, validateForm] = useValidation(
    initialValuesFormFields
  );
  const [selectOptions] = useSelect(selectsField);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // [Mcerquera - 20250531] Validaciones
    const errors = validateForm(value, formBuilder[name].rules);

    if (errors.length > 0) setFormErrs((prev) => ({ ...prev, [name]: errors }));
    else setFormErrs((prev) => ({ ...prev, [name]: [] }));
  };

  const getFieldProps = (props) => ({
    ...props,
    value: values[props.name],
    onChange: handleChange,
  });

  return [errsForm, getFieldProps, selectOptions];
};
