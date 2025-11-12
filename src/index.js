import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "react-router-dom";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { EduHomePage } from './Pages/EducationPage/EduHomePage/EduHomePage';

// This is the routing system.
const allRoutes = createBrowserRouter([{
  path: "/",
  element: <App />
}
  ,
{
  path: "/education",
  element: <EduHomePage />
}])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={allRoutes} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
