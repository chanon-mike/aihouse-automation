import { BrowserRouter } from 'react-router-dom';
import Router from './pages/router';
import { Auth0ProviderWithNavigate } from './utils/auth0';

const App = () => {
  return (
    <Auth0ProviderWithNavigate>
      <BrowserRouter basename="/">
        <Router />
      </BrowserRouter>
    </Auth0ProviderWithNavigate>
  );
};
export default App;
