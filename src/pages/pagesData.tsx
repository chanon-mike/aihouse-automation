import Home from './DinnerForm';
import Reservation from './ReservationPage';
import { RouterType } from './router.types';

const pagesData: RouterType[] = [
  {
    path: '',
    element: <Home />,
    title: 'home',
  },  
  {
    path: 'reservation',
    element: <Reservation />,
    title: 'reservation',
  },
];

export default pagesData;
