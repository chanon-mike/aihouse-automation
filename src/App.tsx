import { BrowserRouter } from 'react-router-dom';
import Router from './pages/router';
//import { Auth0ProviderWithNavigate } from './utils/auth0';

const App = () => {
  return (
    <BrowserRouter>
        <Router />
    </BrowserRouter>
  );
};
export default App;
