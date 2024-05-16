import React from 'react';
import ReactDOM from 'react-dom/client';
import './Assets/bootstrap.css';
import './Assets/custom.css';
import { RouterProvider } from 'react-router-dom';
import routes from './Utils/routeList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
