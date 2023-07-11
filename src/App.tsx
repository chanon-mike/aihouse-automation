import { BrowserRouter } from 'react-router-dom';
import Router from './pages/router';

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Router />
    </BrowserRouter>
  );
};
export default App;
