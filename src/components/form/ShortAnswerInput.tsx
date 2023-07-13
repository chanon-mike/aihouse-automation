import React, { ChangeEvent, useState } from 'react';

import { useShortAnswerInput } from 'react-google-forms-hooks';

type DateInputProps = {
  id: string | undefined;
};

const ShortAnswerInput = ({ id }: DateInputProps) => {
  const { register, label } = useShortAnswerInput(id ?? '');
  const [value, setValue] = useState(localStorage.getItem(label) || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    localStorage.setItem(label, e.target.value);
  };

  return (
    <div>
      <CustomInput {...register()} onChange={handleChange} defaultValue={value} />
    </div>
  );
};

type CustomInputProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  defaultValue: string;
};

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ onChange, defaultValue, ...rest }, ref) => {
    return (
      <input
        className="text-dark rounded-xl p-3"
        type="text"
        ref={ref}
        {...rest}
        onChange={onChange}
        defaultValue={defaultValue}
        required
      />
    );
  },
);

export default ShortAnswerInput;
