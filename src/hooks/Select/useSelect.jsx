import { useEffect, useState } from "react";
import { configLovEndpoints } from "./endpoints";

export function useSelect(selectsField) {
  const [selectOptions, setSelectOptions] = useState({});

  useEffect(() => {
    loadSelects();
  }, []);

  const loadSelects = async () => {
    for (const key in selectsField) {
      const { options, lov } = selectsField[key];
      if (options) {
        setSelectOptions((prev) => ({
          ...prev,
          [key]: {
            loading: false,
            options,
          },
        }));
      }
      if (lov) {
        setSelectOptions((prev) => ({
          ...prev,
          [key]: {
            loading: true,
            options: [],
          },
        }));

        const jsonLov = configLovEndpoints.find((item) => item.lov === lov);
        if (!jsonLov) {
          console.error(
            "El lov seleccionado todavía no está configurado en el sistema."
          );
          return;
        }

        try {
          const baseApi = process.env.REACT_APP_BASE_API;
          const fullEndpoint = `${baseApi}${jsonLov.patchApi}`;

          const { option } = jsonLov;
          const { value, name } = option;

          const res = await fetch(fullEndpoint);
          const { data } = await res.json();
          const dataMap = await data.map((item) => ({
            value: item[value],
            name: item[name],
          }));

          setSelectOptions((prev) => ({
            ...prev,
            [key]: {
              loading: false,
              options: dataMap,
            },
          }));
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return [selectOptions];
}
