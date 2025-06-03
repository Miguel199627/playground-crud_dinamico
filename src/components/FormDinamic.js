import { useState } from "react";
import "./FormDinamic.css";

export function FormDinamic({ atrsForm }) {
  const formFields = atrsForm.reduce((acc, { props, rules }) => {
    acc[props.name] = rules;
    return acc;
  }, {});

  const [getFieldProps, errs] = useForm(formFields);

  return (
    <div className="page">
      <header>
        <h1>Formulario Dinamico</h1>
      </header>
      <main>
        <form>
          <div className="grid">
            {atrsForm.map(({ field, label, props }) => {
              if (field === "input")
                return (
                  <div className="field" key={props.name}>
                    <label>{label}</label>
                    <input {...getFieldProps(props)} />
                    {errs[props.name] &&
                      errs[props.name].map(({ rule, msj }) => {
                        return <span key={`${props.name}_${rule}`}>{msj}</span>;
                      })}
                  </div>
                );
            })}
          </div>
        </form>
      </main>
    </div>
  );
}

export const useForm = (formBuilder) => {
  const configRules = [
    {
      rule: "required",
      msj: "Este Campos es Requerido",
      condition: (value) => {
        return value === "";
      },
    },
    {
      rule: "min",
      msj: "Ha superado la cantidad de caracteres maximos",
      condition: (value, ruleArr) => {
        return validateRule(ruleArr, value.length > Number(ruleArr[1]));
      },
    },
  ];
  const initialValuesFormFields = Object.keys(formBuilder).reduce(
    (acc, key) => {
      acc[key] = "";
      return acc;
    },
    {}
  );
  const [values, setValues] = useState(initialValuesFormFields);
  const [errs, setErrs] = useState(initialValuesFormFields);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // [Mcerquera - 20250531] Validaciones
    const errors = validate(value, formBuilder[name]);

    if (errors.length > 0) setErrs((prev) => ({ ...prev, [name]: errors }));
    else setErrs((prev) => ({ ...prev, [name]: [] }));
  };

  const getFieldProps = (props) => ({
    ...props,
    value: values[props.name],
    onChange: handleChange,
  });

  const validate = (value, rules) => {
    if (!rules || rules.length === 0) return [];

    return rules.reduce((errors, rule) => {
      if (!/^[a-zA-Z]+(:.+)?$/.test(rule)) {
        console.error(
          "Debe respetarse la estructura de las reglas de validación, la cual puede ser del tipo rule o rule:value"
        );
        return errors;
      }

      const ruleArr = rule.split(":");

      configRules.forEach((item) => {
        if (ruleArr[0] === item.rule && item.condition(value, ruleArr))
          errors.push(item);
      });

      return errors;
    }, []);
  };

  const validateRule = (ruleArr, verify) => {
    if (ruleArr.length !== 2) {
      console.error("Esta validacion requiere el :");
      return;
    }

    return verify;
  };

  return [getFieldProps, errs];
};
