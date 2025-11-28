import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "react-router-dom";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Importing d/fPages
import { EduHomePage } from './Pages/EducationPage/EduHomePage/EduHomePage';
import { SchoolPage } from './Pages/EducationPage/EduCatagoriesPg/SchoolPg';
import { CollegesPage } from './Pages/EducationPage/EduCatagoriesPg/CollegesPg';
import { UniPage } from './Pages/EducationPage/EduCatagoriesPg/UniPg';
import { TechniciansHomePg, TechniciansPg } from './Pages/TechniciansPage/TechniciansHomePg/TechniciansHomePg';
import { ElectronicCata } from './Pages/TechniciansPage/TechniciansCatagoriesPg/Electronics';

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
},
{
  path: "/technicians", //Technicians Sector , Home Page:
  element: <TechniciansHomePg />
},
{
  path: "/technicians/Electronic", //Technicians Sector , Home Page:
  element: <ElectronicCata />
}]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={allRoutes} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
