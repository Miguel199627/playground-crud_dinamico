import { useState } from "react";
import { configRules } from "./rules";

export function useValidation(initialValuesFormFields) {
  const [errsForm, setFormErrs] = useState(initialValuesFormFields);

  const validateForm = (value, rules) => {
    if (!rules || rules.length === 0) return [];

    return rules.reduce((errors, strRule) => {
      if (!/^[a-zA-Z]+(:.+)?$/.test(strRule)) {
        console.error(
          "Debe respetarse la estructura de las reglas de validación, la cual puede ser del tipo rule o rule:value"
        );
        return [];
      }

      const [arrRule, arrParam] = strRule.split(":");

      const error = configRules.find(
        ({ rule, condition, requiredParam }) =>
          arrRule === rule &&
          condition({ value, arrParam }) &&
          validateParams(requiredParam, arrParam)
      );

      if (error) errors.push({ ...error });

      return errors || [];
    }, []);
  };

  const validateParams = (requiredParam, param) => {
    if (typeof requiredParam !== "boolean") {
      console.error("El atributo Boolean requiredParam es obligatorio");
      return false;
    } else if (requiredParam && !param) {
      console.error("Esta validacion requiere el :");
      return false;
    }

    return true;
  };

  return [errsForm, setFormErrs, validateForm];
}
