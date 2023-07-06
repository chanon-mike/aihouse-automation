import form from "../form.json";
import ShortAnswerInput from "./ShortAnswerInput";
import DateInput from "./DateInput";

function FormField() {
  const fields = form.fields;
  return (
    <>
      <label>{fields[0].label}</label>
      <ShortAnswerInput id={fields[0].id} />
      <label>{fields[1].label}</label>
      <ShortAnswerInput id={fields[1].id} />
      {/* Date is not supported with this react hook, 
      so need to manually place field to not mess up with the type from google form */}
      <label>{fields[2].label}</label>
      <DateInput id={fields[2].id} />
    </>
  );
  // return (
  //   <div>
  //     {form.fields.map((field) => {
  //       const { id } = field;

  //       let questionInput = null;

  //       if (field.type === "SHORT_ANSWER") {
  //         if (field.original_type && field.original_type === "DATE") {
  //           questionInput = <DateInput id={id} />;
  //         } else {
  //           questionInput = <ShortAnswerInput id={id} />;
  //         }
  //       }
  //       if (!questionInput) {
  //         return null;
  //       }

  //       return (
  //         <div key={id}>
  //           <label>{field.label}</label>
  //           {questionInput}
  //         </div>
  //       );
  //     })}
  //   </div>
  // );
}

export default FormField;
