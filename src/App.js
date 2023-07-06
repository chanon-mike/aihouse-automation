import { GoogleFormProvider, useGoogleForm } from "react-google-forms-hooks";
import "./App.css";
import FormField from "./components/FormField";
import form from "./form.json";

function App() {
  const methods = useGoogleForm({ form });
  const onSubmit = async (data) => {
    console.log(">>> Here is the data", data);
    await methods.submitToGoogleForms(data);
    alert("Form submitted with success!");
  };

  return (
    <div className="App App-header">
      <h1>
        AI-House HUB-4
        <br />
        Keep-my-dinner automating
      </h1>
      <GoogleFormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormField />
          <button type="submit" onSubmit={onSubmit}>
            Submit
          </button>
        </form>
      </GoogleFormProvider>
    </div>
  );
}

export default App;
