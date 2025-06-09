import "./Select.css";
import { Loader } from "../loader/Loarder";
import { MessageError } from "../message-error/MessageError";

export function Select({
  props,
  label,
  getFieldProps,
  selectOptions,
  errsForm,
}) {
  return (
    <div className="field" key={props.name}>
      <label>{label}</label>
      <select {...getFieldProps(props)}>
        <option value="">{props.placeholder || "Seleccione una opción"}</option>
        {!selectOptions[props.name]?.loading &&
          selectOptions[props.name]?.options.map(({ value, name }) => {
            return (
              <option value={value} key={`${props.name}_option_${value}`}>
                {name}
              </option>
            );
          })}
      </select>
      <Loader loading={selectOptions[props.name]?.loading} />
      <MessageError errsForm={errsForm[props.name]} name={props.name} />
    </div>
  );
}
