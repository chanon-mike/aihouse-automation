import { googleFormsToJson } from "react-google-forms-hooks";

const fetchGoogleFormData = async () => {
  try {
    const url =
      "https://docs.google.com/forms/d/e/1FAIpQLSd9MLFnSCaCnBn9gURoZMXIpKfm1Eazk6FVgflTFNQQ3JcR8Q/viewform";
    const data = await googleFormsToJson(url);
    const result = JSON.stringify(data.fields);
    console.log(result);
  } catch (error) {
    console.error("Error fetching Google Form data:", error);
  }
};

fetchGoogleFormData();
