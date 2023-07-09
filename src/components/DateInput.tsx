import React, { ChangeEvent, useCallback, useState } from 'react';
import { useShortAnswerInput } from 'react-google-forms-hooks';
import moment from 'moment';

type DateInputProps = {
  id: string | undefined;
};

const DateInput = ({ id }: DateInputProps) => {
  const { register } = useShortAnswerInput(id ?? '');
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = moment(e.target.value).format('YYYY-MM-DD');
    setDate(newDate);
  }, []);

  return (
    <div>
      <CustomDateInput {...register()} onChange={handleOnChange} defaultValue={date} />
    </div>
  );
};

type CustomDateInputProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  defaultValue: string;
};

const CustomDateInput = React.forwardRef<HTMLInputElement, CustomDateInputProps>(
  ({ onChange, defaultValue, ...rest }, ref) => {
    return (
      <input
        className="text-slate-800 p-2"
        type="date"
        ref={ref}
        {...rest}
        onChange={onChange}
        defaultValue={defaultValue}
        required
      />
    );
  },
);

export default DateInput;
