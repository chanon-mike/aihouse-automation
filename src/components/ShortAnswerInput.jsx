import React, { useState } from "react";

import { useShortAnswerInput } from "react-google-forms-hooks";

export default function ShortAnswerInput({ id }) {
  const { register, label } = useShortAnswerInput(id);
  const [value, setValue] = useState(localStorage.getItem(label) || "");

  const handleChange = (e) => {
    setValue(e.target.value);
    localStorage.setItem(label, e.target.value);
  };

  return (
    <div>
      <CustomInput
        {...register()}
        onChange={handleChange}
        defaultValue={value}
        required
      />
    </div>
  );
}

const CustomInput = React.forwardRef(
  ({ onChange, defaultValue, ...rest }, ref) => {
    return (
      <input
        className="text-slate-800 p-2"
        type="text"
        ref={ref}
        {...rest}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    );
  }
);
