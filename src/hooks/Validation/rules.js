export const configRules = [
  {
    rule: "required",
    msj: "Este Campos es Requerido",
    requiredParam: false,
    condition: ({ value }) => {
      return value === "";
    },
  },
  {
    rule: "min",
    msj: "Ha superado la cantidad de caracteres maximos",
    requiredParam: true,
    condition: ({ value, arrParam }) => {
      return value.length > Number(arrParam);
    },
  },
];
