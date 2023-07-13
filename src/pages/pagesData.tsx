import { AuthenticationGuard } from '../components/auth/AuthenticationGuard';
import Home from './DinnerForm';
import Profile from './Profile';
import Reservation from './ReservationPage';
import { RouterType } from './router.types';

const baseUrl = 'aihouse-automation';

const pagesData: RouterType[] = [
  {
    path: `${baseUrl}/`,
    element: <Home />,
    title: 'home',
  },
  {
    path: `${baseUrl}/reservation`,
    element: <Reservation />,
    title: 'reservation',
  },
  {
    path: `${baseUrl}/profile`,
    element: <AuthenticationGuard component={Profile} />,
    title: 'profile',
  },
];

export default pagesData;
