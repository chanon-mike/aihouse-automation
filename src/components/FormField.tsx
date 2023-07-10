import ShortAnswerInput from './ShortAnswerInput';
import DateInput from './DateInput';
import { FormField } from '../types/types';

type FormFieldProps = {
  fields: FormField;
};

const FormField = ({ fields }: FormFieldProps) => {
  return (
    <div className="text-center flex flex-col gap-1">
      <label>{fields[0].label}</label>
      <ShortAnswerInput id={fields[0].id} />
      <label>{fields[1].label}</label>
      <ShortAnswerInput id={fields[1].id} />
      {/* Date is not supported with this react hook, 
      so need to manually place field to not mess up with the type from google form */}
      <label>{fields[2].label}</label>
      <DateInput id={fields[2].id} />
    </div>
  );
};

export default FormField;
