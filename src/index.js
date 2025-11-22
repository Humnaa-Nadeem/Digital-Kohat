import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "react-router-dom";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { EduHomePage } from './Pages/EducationPage/EduHomePage/EduHomePage';
import { SchoolPage } from './Pages/EducationPage/EduCatagoriesPg/SchoolPg';
import { CollegesPage } from './Pages/EducationPage/EduCatagoriesPg/CollegesPg';
import { UniPage } from './Pages/EducationPage/EduCatagoriesPg/UniPg';

// This is the routing system.
const allRoutes = createBrowserRouter([{
  path: "/",
  element: <App />
},
{
  path: "/edu", //Education Sector , Home Page:
  element: <EduHomePage />
},
{
  path: "/edu/schools", //Education Sector , Schools Page
  element: <SchoolPage />
},
{
  path: "/edu/colleges", //Education Sector , Colleges Page
  element: <CollegesPage />
},
{
  path: "/edu/uni", //Education Sector , Universities Page
  element: <UniPage />
}]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={allRoutes} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
