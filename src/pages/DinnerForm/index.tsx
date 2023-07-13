import { GoogleFormProvider, useGoogleForm } from 'react-google-forms-hooks';
import FormField from '../../components/form/FormField';
import testForm from '../../scripts/testForm.json';
import prodForm from '../../scripts/prodForm.json';
import PageLayout from '../../components/common/PageLayout';
// import { apiUrl } from '../../utils/envValues';
// import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
  const form = import.meta.env.DEV ? testForm : prodForm;
  const methods = useGoogleForm({ form: form as any });

  // const { getAccessTokenSilently } = useAuth0();

  const onSubmit = async (data: any) => {
    console.log('>>> Here is the data', data);
    await methods.submitToGoogleForms(data);
    alert('Form submitted with success!');
  };

  // const fetchPublicTest = async () => {
  //   await fetch(`${apiUrl}/api/public`, {
  //     method: 'get',
  //   }).then((response) => {
  //     console.log(response);
  //     return response.json();
  //   });
  // };

  // const fetchPrivateTest = async () => {
  //   const token = await getAccessTokenSilently();

  //   await fetch(`${apiUrl}/api/private`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     method: 'get',
  //   }).then((response) => {
  //     console.log(response);
  //     return response.json();
  //   });
  // };

  return (
    <PageLayout>
      <div className="w-full h-full flex flex-col justify-center items-center text-dark mt-28">
        {/* <button onClick={fetchPublicTest}>Fetch public</button>
        <button onClick={fetchPrivateTest}>Fetch private</button> */}
        <h2 className="text-lg font-bold">KEEP MY DINNER REQUEST</h2>
        <h1 className="text-4xl font-bold text-center">夕食取り置き届</h1>

        <p className="text-sm max-w-2xl text-clip text-center mt-2">
          初回のみフォームに情報を入力してください。
          その後、データはデバイスに保存されるため、再度入力する必要はありません！閉じるまでアラートメッセージをお待ちください。
          <br />
          You only need to enter your information in the form for the first time. After that, the
          data will be saved on your device, so the further input is not needed! Please wait until
          alert message appear.
        </p>
        <GoogleFormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col items-center mt-5 gap-2"
          >
            <FormField fields={form.fields} />
            <button
              className="rounded-xl p-2 px-5 mt-3 text-dark bg-secondary"
              type="submit"
              onSubmit={onSubmit}
            >
              Submit
            </button>
          </form>
        </GoogleFormProvider>
      </div>
    </PageLayout>
  );
};

export default Home;
