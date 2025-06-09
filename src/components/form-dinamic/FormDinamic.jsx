import { useForm } from "../../hooks/useForm";
import "./FormDinamic.css";
import { Input } from "../input/Input";
import { Select } from "../select/Select";

export function FormDinamic({ atrsForm }) {
  const formFields = atrsForm.reduce((acc, { field, props, rules }) => {
    const { name, options, lov } = props;
    acc[name] = { rules, field, options, lov };
    return acc;
  }, {});

  const [errsForm, getFieldProps, selectOptions] = useForm(formFields);

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
                  <>
                    <Input
                      props={props}
                      label={label}
                      getFieldProps={getFieldProps}
                      errsForm={errsForm}
                    />
                  </>
                );
              else if (field === "select")
                return (
                  <>
                    <Select
                      props={props}
                      label={label}
                      getFieldProps={getFieldProps}
                      selectOptions={selectOptions}
                      errsForm={errsForm}
                    />
                  </>
                );
            })}
          </div>
        </form>
      </main>
    </div>
  );
}
