import ReactDOM from 'react-dom/client';
import "leaflet/dist/leaflet.css";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
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
//tourism imports
import { TourismLayout } from './Layouts/TourismLayout';
import { TourismHome } from './Pages/TourismPage/TourismHomepg/TourismHome';

import { Places } from './Pages/TourismPage/TourismCategoriespg/Places';
import { Hotels } from './Pages/TourismPage/TourismCategoriespg/Hotels';
import { Restaurants } from './Pages/TourismPage/TourismCategoriespg/Restaurants';

import { Parks } from './Pages/TourismPage/TourismCategoriespg/Parks';
import { Guide } from './Pages/TourismPage/TourismCategoriespg/Guide';
import { Gallery } from './Pages/TourismPage/TourismCategoriespg/Gallery';
import { Aboutus } from './Pages/AboutUsPage/Aboutus';
import Contactus from './Pages/ContactUs/ContactUs';
import { TourismLandingPage } from './Pages/TourismPage/Landingpage/TourismLandingpage';



// ================================
// ROUTING SYSTEM
// ================================
const allRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  // Authentication / User
  {

    path: "/form",
    element: <SignUpForm />,
  },

  // About Us Page
  {
    path: "/AboutUs",
    element: <Aboutus />,
  },

  //Contact Us Page 
  {
    path: "/ContactUs",
    element: <Contactus />,
  },

  // Education Sector
  {
    path: "/edu",
    element: <EduLayout />,
    children: [
      { index: true, element: <EduHomePage /> },
      { path: "schools", element: <SchoolPage /> },
      { path: "colleges", element: <CollegesPage /> },
      { path: "uni", element: <UniPage /> },
      { path: "online-courses", element: <OnlineCoursesPage /> },
      { path: "tutors", element: <TutorsPage /> },
      { path: "training", element: <OnlineTrainingPage /> },
    ],
  },

  // Technicians Sector
  {
    path: "/tech",
    element: <TechLayout />,
    children: [
      { index: true, element: <TechniciansHomePg /> },
      { path: "electrical", element: <ElectronicCata /> },
      { path: "plumb-gas", element: <PlumbingGasCata /> },
      { path: "const-paint", element: <PaintingConstructCata /> },
      { path: "carp-furn", element: <CarpFurnitureCata /> },
      { path: "clean-maint", element: <CleanMaintCata /> },
      { path: "gard-outdoor", element: <GardOutdoorCata /> },
    ],
  },




  // Tourism Sector
  {
    path: "/tourism",
    element: <TourismLayout />,
    children: [
      { index: true, element: <TourismHome /> },
      { path: "places", element: <Places /> },
      { path: "hotels", element: <Hotels /> },
      { path: "restaurants", element: <Restaurants /> },
      { path: "parks", element: <Parks /> },
      { path: "guide", element: <Guide /> },
      { path: "gallery", element: <Gallery /> },
      { path: "landing", element: <TourismLandingPage /> },

      // NEW: Dynamic route for individual service provider / tourism landing page
      { path: ":id", element: <TourismLandingPage /> },
    ],
  },

  // Page Not Found
  {
    path: "*",
    element: <PageNotFoundPg />,
  },

]);

// ================================
// Render App
// ================================
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={allRoutes} />);

reportWebVitals();
