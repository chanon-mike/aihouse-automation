'use client';

import FormField from '@/components/form/FormField';
import { GoogleFormProvider, useGoogleForm } from 'react-google-forms-hooks';
import testForm from '@/scripts/testForm.json';
import prodForm from '@/scripts/prodForm.json';
import SuccessModal from '../common/SuccessModal';
import { useRef, useState } from 'react';

const GoogleForm = () => {
  const successModal = useRef<HTMLDialogElement>(null);
  const [loading, setLoading] = useState(false);
  const isProd = process.env.NODE_ENV === 'production';
  const form = isProd ? prodForm : testForm;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const methods = useGoogleForm({ form: form as any });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setLoading(true);
    await methods.submitToGoogleForms(data);
    successModal.current?.showModal();
    setLoading(false);
  };

  return (
    <>
      <GoogleFormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-2"
        >
          <FormField fields={form.fields} />
          <button
            className={`btn btn-secondary mt-3 ${loading && 'btn-disabled'}`}
            type="submit"
            onSubmit={onSubmit}
          >
            {loading ? <span className="loading" /> : <span>Submit</span>}
          </button>
        </form>
      </GoogleFormProvider>
      <SuccessModal modalRef={successModal} message="Form submitted with success!" />
    </>
  );
};

export default GoogleForm;
