import "./MessageError.css";

export function MessageError({ errsForm, name }) {
  return (
    <>
      {errsForm &&
        errsForm.map(({ rule, msj }) => {
          return <span key={`${name}_${rule}`}>{msj}</span>;
        })}
    </>
  );
}
