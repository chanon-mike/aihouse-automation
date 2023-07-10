import Home from './DinnerForm';
import { RouterType } from './router.types';

const pagesData: RouterType[] = [
  {
    path: '',
    element: <Home />,
    title: 'home',
  },
];

export default pagesData;
