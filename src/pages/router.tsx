import { Route, Routes } from 'react-router-dom';
import { RouterType } from './router.types';
import pagesData from './pagesData';

const Router = () => {
  const pageRoutes = pagesData.map(({ path, title, element }: RouterType) => {
    return <Route key={title} path={`/${path}`} element={element} />;
  });

  return <Routes>{pageRoutes}</Routes>;
};

export default Router;
