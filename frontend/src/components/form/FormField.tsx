import ShortAnswerInput from './ShortAnswerInput';
import DateInput from './DateInput';

type FormField = (
  | {
      label: string;
      description: null;
      type: string;
      id: string;
      required: boolean;
    }
  | {
      label: string;
      description: null;
      type?: undefined;
      id?: undefined;
      required?: undefined;
    }
)[];

type FormFieldProps = {
  fields: FormField;
};

const FormField = ({ fields }: FormFieldProps) => {
  return (
    <div className="text-center flex flex-col justify-center items-center gap-1">
      <label className="label" data-testid="room-number-label">
        {fields[0].label}
      </label>
      <ShortAnswerInput id={fields[0].id} dataTestId="room-number-field" />
      <label className="label" data-testid="name-label">
        {fields[1].label}
      </label>
      <ShortAnswerInput id={fields[1].id} dataTestId="name-field" />
      {/* Date is not supported with this react hook, 
      so need to manually place field to not mess up with the type from google form */}
      <label className="label" data-testid="date-label">
        {fields[2].label}
      </label>
      <DateInput id={fields[2].id} dataTestId="date-field" />
    </div>
  );
};

export default FormField;
