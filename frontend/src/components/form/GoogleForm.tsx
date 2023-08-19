'use client';

import FormField from '@/components/form/FormField';
import { GoogleFormProvider, useGoogleForm } from 'react-google-forms-hooks';
import testForm from '@/scripts/testForm.json';
import prodForm from '@/scripts/prodForm.json';

const GoogleForm = () => {
  const isProd = process.env.NODE_ENV === 'production';

  const form = isProd ? prodForm : testForm;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const methods = useGoogleForm({ form: form as any });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    console.log('>>> Here is the data', data);
    await methods.submitToGoogleForms(data);
    alert('Form submitted with success!');
  };

  return (
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
  );
};

export default GoogleForm;
