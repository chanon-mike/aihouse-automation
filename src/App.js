import { GoogleFormProvider, useGoogleForm } from "react-google-forms-hooks";
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
    <div className="flex justify-center items-center min-h-screen bg-slate-800">
      <div className="w-full h-full flex flex-col justify-center items-center text-white">
        <h1 className="text-5xl font-semibold">AI-House HUB-4</h1>
        <h1 className="text-xl font-bold">
          夕食取り置き届 Keep-my-dinner-request
        </h1>
        <p className="text-gray-400 max-w-2xl text-clip text-center mt-2">
          初回のみ、フォームに情報を入力してください。
          <br />
          その後、データはデバイスに保存されるため、再度入力する必要はありません！
          <br />
          You only need to enter your information in the form for the first
          time. After that, the data will be saved on your device, so the
          further input is not needed!
        </p>
        <GoogleFormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col items-center mt-5 gap-2"
          >
            <FormField />
            <button
              className="bg-yellow-600 rounded-xl p-2 mt-3"
              type="submit"
              onSubmit={onSubmit}
            >
              Submit
            </button>
          </form>
        </GoogleFormProvider>
      </div>
    </div>
  );
}

export default App;
