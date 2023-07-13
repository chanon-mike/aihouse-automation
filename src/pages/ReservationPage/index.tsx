import { GoogleFormProvider, useGoogleForm } from 'react-google-forms-hooks';
import { BsGithub } from 'react-icons/bs';
import FormField from '../../components/form/FormField';
import testForm from '../../scripts/testForm.json';
import prodForm from '../../scripts/prodForm.json';

const Reservation = () => {
  const form = import.meta.env.DEV ? testForm : prodForm;

  const methods = useGoogleForm({ form: form as any });
  const onSubmit = async (data: any) => {
    console.log('>>> Here is the data', data);
    await methods.submitToGoogleForms(data);
    alert('Form submitted with success!');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-800 p-5">
      <div className="w-full h-full flex flex-col justify-center items-center text-white">
        <div className="text-center">
          <h1 className="text-5xl font-semibold">AI-House HUB-4</h1>
          <h1 className="text-xl font-bold">夕食取り置き予約 (英語の部分は頼んだ)</h1>
        </div>
        <p className="text-gray-400 text-sm max-w-2xl text-clip text-center mt-2">
          夕食取り置きをする日を選択してください。
          <br />
          (英語の部分は頼んだ)
        </p>
        <h3 className="mt-3 text-red-500 text-lg">{import.meta.env.PROD || `Test Google Form`}</h3>
        <GoogleFormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col items-center mt-5 gap-2"
          >
            <FormField fields={form.fields} />
            <button className="bg-yellow-600 rounded-xl p-2 mt-3" type="submit" onSubmit={onSubmit}>
              Submit
            </button>
          </form>
        </GoogleFormProvider>
        <footer>
          <a className="flex mt-10" href="https://github.com/chanon-mike/aihouse-automation">
            <BsGithub className="text-2xl" />
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Reservation;
