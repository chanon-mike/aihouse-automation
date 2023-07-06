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
    <div className="App">
      <header className="App-header">
        <GoogleFormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormField />
            <button type="submit" onSubmit={onSubmit}>
              Submit
            </button>
          </form>
        </GoogleFormProvider>
      </header>
    </div>
  );
}

export default App;
