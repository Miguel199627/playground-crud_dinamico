import { useState } from "react";
import { configRules } from "./rules";

export function useValidation(initialValuesFormFields) {
  const [errsForm, setFormErrs] = useState(initialValuesFormFields);

  const validateForm = (value, rules) => {
    if (!rules || rules.length === 0) return [];

    return rules.reduce((errors, rule) => {
      if (!/^[a-zA-Z]+(:.+)?$/.test(rule)) {
        console.error(
          "Debe respetarse la estructura de las reglas de validación, la cual puede ser del tipo rule o rule:value"
        );
        return errors;
      }

      const ruleArr = rule.split(":");
      const param = ruleArr.length === 2 ? ruleArr[1] : null;

      errors = configRules.find(
        ({ rule, condition, requiredParam }) =>
          ruleArr[0] === rule &&
          condition({ value, param }) &&
          validateParams(requiredParam, param)
      );

      return errors;
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
