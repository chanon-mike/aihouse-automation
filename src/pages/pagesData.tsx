import Home from './DinnerForm';
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
];

export default pagesData;
