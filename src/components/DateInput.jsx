import React, { useCallback, useState } from "react";
import { useShortAnswerInput } from "react-google-forms-hooks";
import moment from "moment";

export default function DateInput({ id }) {
  const { register } = useShortAnswerInput(id);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  const handleOnChange = useCallback((e) => {
    const newDate = moment(e.value).format("YYYY-MM-DD");
    setDate(newDate);
  }, []);

  return (
    <div>
      <input
        type="date"
        defaultValue={date}
        onChange={handleOnChange}
        {...register()}
        required
      />
    </div>
  );
}
