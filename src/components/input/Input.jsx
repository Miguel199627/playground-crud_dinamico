import "./Input.css";
import { MessageError } from "../message-error/MessageError";

export function Input({ props, label, getFieldProps, errsForm }) {
  return (
    <div className="field" key={props.name}>
      <label>{label}</label>
      <input {...getFieldProps(props)} />
      <MessageError errsForm={errsForm[props.name]} name={props.name} />
    </div>
  );
}
