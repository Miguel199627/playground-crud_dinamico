import { useForm } from "../../hooks/useForm";
import "./FormDinamic.css";

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
                  <div className="field" key={props.name}>
                    <label>{label}</label>
                    <input {...getFieldProps(props)} />
                    {errsForm[props.name] &&
                      errsForm[props.name].map(({ rule, msj }) => {
                        return <span key={`${props.name}_${rule}`}>{msj}</span>;
                      })}
                  </div>
                );
              else if (field === "select")
                return (
                  <div className="field" key={props.name}>
                    <label>{label}</label>
                    <select {...getFieldProps(props)}>
                      <option value="">
                        {props.placeholder || "Seleccione una opción"}
                      </option>
                      {!selectOptions[props.name]?.loading &&
                        selectOptions[props.name]?.options.map(
                          ({ value, name }) => {
                            return (
                              <option
                                value={value}
                                key={`${props.name}_option_${value}`}
                              >
                                {name}
                              </option>
                            );
                          }
                        )}
                    </select>
                    {selectOptions[props.name]?.loading && (
                      <div className="loader-container">
                        <div className="loader-bar-container">
                          <div className="loader-bar"></div>
                        </div>
                      </div>
                    )}
                    {errsForm[props.name] &&
                      errsForm[props.name].map(({ rule, msj }) => {
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
