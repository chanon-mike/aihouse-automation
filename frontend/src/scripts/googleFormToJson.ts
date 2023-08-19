import { googleFormsToJson } from 'react-google-forms-hooks';

const fetchGoogleFormData = async () => {
  try {
    // Convert unsupported type (DATE) to SHORT_ANSWER manually
    // Test google form
    const testUrl =
      'https://docs.google.com/forms/d/1FuoWmx0xPkorwx4vaX9bUcFSUCzbkdKnt3vn5NAf9pw/viewform';
    // In-production
    const prodUrl =
      'https://docs.google.com/forms/d/e/1FAIpQLSd14yq1hROVw4VX5g38JBcxUdjLKPugGD2hWRKu3wsVQiWqDQ/viewform';

    const testData = await googleFormsToJson(testUrl);
    const testResult = JSON.stringify(testData);
    console.log('testResult:', testResult);

    const prodData = await googleFormsToJson(prodUrl);
    const prodResult = JSON.stringify(prodData);
    console.log('prodResult:', prodResult);
  } catch (error) {
    console.error('Error fetching Google Form data:', error);
  }
};

fetchGoogleFormData();
