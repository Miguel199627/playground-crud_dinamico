import "./App.css";
import { FormDinamic } from "./components/form-dinamic/FormDinamic";

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
      rules: ["required", "min:5"],
    },
    {
      field: "select",
      label: "Perfil",
      props: {
        name: "usuario_perfil",
        placeholder: "Seleccione un perfil",
        // options: [
        //   { value: 1, name: "Administrador" },
        //   { value: 2, name: "Cliente" },
        // ],
        lov: "perfil",
      },
      rules: ["required"],
    },
  ];

  return <FormDinamic atrsForm={atrsForm} />;
}

export default App;
