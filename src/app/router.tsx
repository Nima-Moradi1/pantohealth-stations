import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import { AppShell } from './shell/AppShell';

const HomePage = React.lazy(() => import('../pages/home/HomePage'));
const NotFoundPage = React.lazy(() => import('../pages/not-found/NotFoundPage'));

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
