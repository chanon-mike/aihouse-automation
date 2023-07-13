import { BrowserRouter } from 'react-router-dom';
import Router from './pages/router';
import { Auth0ProviderWithNavigate } from './utils/auth0';

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Auth0ProviderWithNavigate>
        <Router />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  );
};
export default App;
