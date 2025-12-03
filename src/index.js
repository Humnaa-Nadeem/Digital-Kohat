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

// ================================
// Routing System
// Using react-router-dom's createBrowserRouter
// ================================

const allRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // Main App/Home Page
  },
  {
    path: "/edu",
    element: <EduHomePage />,
    // Education Sector → Home Page
  },
  {
    path: "/edu/schools",
    element: <SchoolPage />,
    // Education Sector → Schools Page
  },
  {
    path: "/edu/colleges",
    element: <CollegesPage />,
    // Education Sector → Colleges Page
  },
  {
    path: "/edu/uni",
    element: <UniPage />,
    // Education Sector → Universities Page
  },
  {
    path: "/edu/onlineCourses",
    element: <OnlineCoursesPage />
    // Education Sector → Online Courses Page
  },
  {
    path: "/edu/tutors",
    element: <TutorsPage />
    // Education Sector → Tutors Page
  },
  {
    path: "/edu/onlineTraining",
    element: <OnlineTrainingPage />
    // Education Sector → Online Trainings Page
  },
  {
    path: "/tech",
    element: <TechniciansHomePg />,
    // Technicians Sector → Home Page
  },
  {
    path: "/tech/Electrical",
    element: <ElectronicCata />,
    // Technicians Sector → Electrical/Electronic Experts
  },
  {
    path: "/tech/Plumb-Gas",
    element: <PlumbingGasCata />,
    // Technicians Sector → Plumbing & Gas Experts
  },
  {
    path: "/tech/const-paint",
    element: <PaintingConstructCata />
    // Technicians Sector → Construction & Painting Experts
  },
  {
    path: "/tech/carp-furn",
    element: <CarpFurnitureCata />
    // Technicians Sector → Construction & Painting Experts
  },
  {
    path: "/tech/clean-maint",
    element: <CleanMaintCata />
    // Technicians Sector → Cleaning & Maintaning Experts
  },
  {
    path: "/tech/gard-outdoor",
    element: <GardOutdoorCata />
    // Technicians Sector → Gardening and OutDoor Experts
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={allRoutes} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
