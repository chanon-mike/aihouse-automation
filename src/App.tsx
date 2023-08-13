import { BrowserRouter } from 'react-router-dom';
import Router from './pages/router';
import { Auth0ProviderWithNavigate } from './libs/auth0';

const App = () => {
  return (
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <Router />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  );
};
export default App;
