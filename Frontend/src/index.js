import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "react-router-dom";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// ================================
// IMPORTING PAGES
// ================================
import { EduHomePage } from './Pages/EducationPage/EduHomePage/EduHomePage';
import { SchoolPage } from './Pages/EducationPage/EduCatagoriesPg/SchoolPg';
import { CollegesPage } from './Pages/EducationPage/EduCatagoriesPg/CollegesPg';
import { UniPage } from './Pages/EducationPage/EduCatagoriesPg/UniPg';
import { TechniciansHomePg } from './Pages/TechniciansPage/TechniciansHomePg/TechniciansHomePg';
import { ElectronicCata } from './Pages/TechniciansPage/TechniciansCatagoriesPg/Electronics';
import { PlumbingGasCata } from './Pages/TechniciansPage/TechniciansCatagoriesPg/PlumAndGas';
import { PaintingConstructCata } from './Pages/TechniciansPage/TechniciansCatagoriesPg/ConstAndPaint';
import { CarpFurnitureCata } from './Pages/TechniciansPage/TechniciansCatagoriesPg/Carpentry&Furniture';
import { CleanMaintCata } from './Pages/TechniciansPage/TechniciansCatagoriesPg/Cleaning&Maintaining';
import { GardOutdoorCata } from './Pages/TechniciansPage/TechniciansCatagoriesPg/Gardening&Outdoor';
import { OnlineTrainingPage } from './Pages/EducationPage/EduCatagoriesPg/OnlineTraining';
import { TutorsPage } from './Pages/EducationPage/EduCatagoriesPg/Tutors';
import { OnlineCoursesPage } from './Pages/EducationPage/EduCatagoriesPg/OnlineCourses';
import { SignUpForm } from './components/SignUpForm/SignUpForm';
import { EduLayout } from './Layouts/EduLayout';
import { TechLayout } from './Layouts/TechLayout';
import { PageNotFoundPg } from './Pages/404Page/404Page';

// ================================
// Routing System
// Using react-router-dom's createBrowserRouter
// ================================
const allRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  // -------------------------
  // Authentication / User
  // -------------------------
  {
    path: "/form",
    element: <SignUpForm />,
  },

  // -------------------------
  // Page Not Found [404 Error]
  // -------------------------
  {
    path: "*",
    element: <PageNotFoundPg />
  },
  // -------------------------
  // Education Sector
  // -------------------------
  {
    path: "/edu",
    element: <EduLayout />,
    children: [
      { index: true, element: <EduHomePage /> }, //Eduction Home Page
      { path: "schools", element: <SchoolPage /> },//Schools Page
      { path: "colleges", element: <CollegesPage /> },//Colleges Page
      { path: "uni", element: <UniPage /> },//Universities Page
      { path: "online-courses", element: <OnlineCoursesPage /> },//Online Courses Page
      { path: "tutors", element: <TutorsPage /> },//Tutor Page
      { path: "training", element: <OnlineTrainingPage /> },//Online Training Page
    ],
  },

  // -------------------------
  // Technicians Sector
  // -------------------------
  {
    path: "/tech",
    element: <TechLayout />,
    children: [
      { index: true, element: <TechniciansHomePg /> },//Technicians Home Page
      { path: "electrical", element: <ElectronicCata /> },//Electricals Page
      { path: "plumb-gas", element: <PlumbingGasCata /> },//Plumbers Page
      { path: "const-paint", element: <PaintingConstructCata /> },//Painters etc Page
      { path: "carp-furn", element: <CarpFurnitureCata /> },//Carpenter etc Page
      { path: "clean-maint", element: <CleanMaintCata /> }, //Maintainers page
      { path: "gard-outdoor", element: <GardOutdoorCata /> },//Gardeners Page
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={allRoutes} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
