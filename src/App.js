import "./App.css";
import { FormDinamic } from "./components/FormDinamic";

function App() {
  const atrsForm = [
    {
      field: "input",
      label: "Nombres",
      props: {
        name: "usuario_nombres",
        type: "text",
        placeholder: "Nombres del Usuario",
      },
      rules: ["required"],
    },
    {
      field: "input",
      label: "Apellidos",
      props: {
        name: "usuario_apellidos",
        type: "text",
        placeholder: "Apellidos del Usuario",
      },
      rules: ["required"],
    },
  ];

  return <FormDinamic atrsForm={atrsForm} />;
}

export default App;
