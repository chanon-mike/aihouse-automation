'use client';

import type { ChangeEvent } from 'react';
import React, { useEffect, useState } from 'react';

import { useShortAnswerInput } from 'react-google-forms-hooks';

type DateInputProps = {
  id: string | undefined;
};

const ShortAnswerInput = ({ id }: DateInputProps) => {
  const { register, label } = useShortAnswerInput(id ?? '');
  const [value, setValue] = useState('');

  useEffect(() => {
    const val = localStorage.getItem(label) ?? '';
    setValue(val);
  }, [label, setValue]);

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
        className="input text-neutral bg-white"
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
CustomInput.displayName = 'CustomInput';

export default ShortAnswerInput;
