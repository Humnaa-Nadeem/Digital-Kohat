import React from "react";
import ReactDOM from "react-dom/client";
import "leaflet/dist/leaflet.css";
<<<<<<< HEAD
import "./index.css";
import "./styles/commonform.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

// 🌍 Language Context
import { LanguageProvider } from "./context/LanguageContext";

// ================================
// LAYOUTS
import { TourismLayout } from "./Layouts/TourismLayout";
import { EduLayout } from "./Layouts/EduLayout";
import { TechLayout } from "./Layouts/TechLayout";
import { FoodLayout } from "./Layouts/FoodLayout";
import HospitalLayout from "./Layouts/HospitalLayout";
import { BusinessLayout } from "./Layouts/BusinessLayout";
import FormsLayout from "./Layouts/FormsLayout";

// ================================
// COMMON PAGES
import SignUpForm from "./components/SignUpForm/SignUpForm";
import { PageNotFoundPg } from "./Pages/404Page/404Page";
import { Aboutus } from "./Pages/AboutUsPage/Aboutus";
import Contactus from "./Pages/ContactUs/ContactUs";
=======
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import { CustomerAuthProvider } from './Store/CustomerAuthContext.jsx';

// ================================
//           IMPORTS
// ================================

// %%%%%%%%%%% LAYOUTS %%%%%%%%%%%
import { TourismLayout } from './Layouts/TourismLayout';
import { EduLayout } from './Layouts/EduLayout';
import { TechLayout } from './Layouts/TechLayout';
import { FoodLayout } from './Layouts/FoodLayout';
import HospitalLayout from './Layouts/HospitalLayout';
import { BusinessLayout } from './Layouts/BusinessLayout';

// %%%%%%%%%%% GENERAL IMPORTS %%%%%%%%%%%
import { PageNotFoundPg } from './Pages/404Page/404Page';
import { Aboutus } from './Pages/AboutUsPage/Aboutus';
import Contactus from './Pages/ContactUs/ContactUs';

// %%%%%%%%%%% EDUCTION SECTOR %%%%%%%%%%%
import { EduHomePage } from './Pages/EducationPage/EduHomePage/EduHomePage';
import { SchoolPage } from './Pages/EducationPage/EduCatagoriesPg/SchoolPg';
import { CollegesPage } from './Pages/EducationPage/EduCatagoriesPg/CollegesPg';
import { UniPage } from './Pages/EducationPage/EduCatagoriesPg/UniPg';
import { OnlineTrainingPage } from './Pages/EducationPage/EduCatagoriesPg/OnlineTraining';
import { TutorsPage } from './Pages/EducationPage/EduCatagoriesPg/Tutors';
import { OnlineCoursesPage } from './Pages/EducationPage/EduCatagoriesPg/OnlineCourses';
import { SingleLandingPage } from './components/SingleLandingPage/SingleLandingPage.jsx';

// %%%%%%%%%%% TECHNICIANS SECTOR %%%%%%%%%%%
import { TechniciansHomePg } from './Pages/TechniciansPage/TechniciansHomePg/TechniciansHomePg';
import { ElectronicCata } from './Pages/TechniciansPage/TechniciansCatagoriesPg/Electronics';
import { PlumbingGasCata } from './Pages/TechniciansPage/TechniciansCatagoriesPg/PlumAndGas';
import { PaintingConstructCata } from './Pages/TechniciansPage/TechniciansCatagoriesPg/ConstAndPaint';
import { CarpFurnitureCata } from './Pages/TechniciansPage/TechniciansCatagoriesPg/Carpentry&Furniture';
import { CleanMaintCata } from './Pages/TechniciansPage/TechniciansCatagoriesPg/Cleaning&Maintaining';
import { GardOutdoorCata } from './Pages/TechniciansPage/TechniciansCatagoriesPg/Gardening&Outdoor';

// %%%%%%%%%%% TOURISM SECTOR %%%%%%%%%%%
import { TourismHome } from './Pages/TourismPage/TourismHomepg/TourismHome';
import { Places } from './Pages/TourismPage/TourismCategoriespg/Places';
import { Hotels } from './Pages/TourismPage/TourismCategoriespg/Hotels';
import { Restaurants } from './Pages/TourismPage/TourismCategoriespg/Restaurants';
import { Parks } from './Pages/TourismPage/TourismCategoriespg/Parks';
import { Bazar } from './Pages/TourismPage/TourismCategoriespg/Bazar';
import { TourismLandingPage } from './Pages/TourismPage/Landingpage/TourismLandingpage';
import { TourGuides } from './Pages/TourismPage/TourismCategoriespg/TourGuides';

// %%%%%%%%%%% RESTURANT SECTOR %%%%%%%%%%%
import { FoodHomePage } from './Pages/FoodPage/FoodHomePage/FoodHomePage';
import { FineDiningPage } from './Pages/FoodPage/FoodCatagoriespg/FineDining';
import { CafesPage } from './Pages/FoodPage/FoodCatagoriespg/Cafes';
import { FastFoodPage } from './Pages/FoodPage/FoodCatagoriespg/FastFood';
import { LocalFoodPage } from './Pages/FoodPage/FoodCatagoriespg/LocalFood';
import { BakeriesPage } from './Pages/FoodPage/FoodCatagoriespg/Bakeries';
import { StreetFoodPage } from './Pages/FoodPage/FoodCatagoriespg/StreetFood';

// %%%%%%%%%%% HOSPITAL SECTOR %%%%%%%%%%%
import { HospHomePage } from './Pages/HospitalPage/HospHomePg/HospHomePg';
import { HospitalsPage } from './Pages/HospitalPage/HosCategoriesPg/Hospitals';
import { ClinicsPage } from './Pages/HospitalPage/HosCategoriesPg/Clinics';
import { PharmaciesPage } from './Pages/HospitalPage/HosCategoriesPg/Pharmacies';
import { DiagnosticsPage } from './Pages/HospitalPage/HosCategoriesPg/Diagnostics';
import { AmbulancePage } from './Pages/HospitalPage/HosCategoriesPg/Ambulance';
import { SpecialistsPage } from './Pages/HospitalPage/HosCategoriesPg/Specialists';

// %%%%%%%%%%% DASHBOARDS %%%%%%%%%%%
import { SuperAdminDashboard } from './Pages/DashBoard/SuperAdmin/SuperAdminLayout/SuperAdminLayout.jsx';
import { SchoolAndClgDashBoard } from './Pages/DashBoard/EductionDashboard/DashBoardHomeLayout/Dashboard.jsx';
import { FoodDashboard } from './Pages/DashBoard/FoodDashboard/FoodDashboard';
import { TourismDashboard } from './Pages/DashBoard/TourismDashboard/TourismDashboard';

// %%%%%%%%%%% BUSINESSES SECTOR %%%%%%%%%%%
import { BusinessHomePage } from './Pages/BusinessPage/BusinessHomePage/BusinessHomePage';
import { ShopsRetailPg } from './Pages/BusinessPage/BusinessCategoriesPg/ShopsRetailPg';
import { OfficesPg } from './Pages/BusinessPage/BusinessCategoriesPg/OfficesPg';
import { EventsPg } from './Pages/BusinessPage/BusinessCategoriesPg/EventsPg';
import { ManufacturingPg } from './Pages/BusinessPage/BusinessCategoriesPg/ManufacturingPg';
import { FreelancersPg } from './Pages/BusinessPage/BusinessCategoriesPg/FreelancersPg';
import { BusinessAdminLogin } from './Pages/BusinessPage/BusinessAdminLogin';
import { BusinessDashboard } from './Pages/DashBoard/BusinessDashboard/BusinessDashboard';
import { TrackOrder } from './Pages/BusinessPage/TrackOrder/TrackOrder';
import { CustomerLogin } from './components/CustomerAuth/CustomerLogin';
import { CustomerDashboard } from './Pages/CustomerDashboard/CustomerDashboard';

// %%%%%%%%%%% FORMS %%%%%%%%%%%
import { TourismRegistration } from './Pages/DashBoard/TourismDashboard/TourismRegistration';
import { AdminLogin } from './Pages/DashBoard/EductionDashboard/AdminLgoInForm/AdminLogin';
import { FoodAdminLogin } from './Pages/DashBoard/FoodDashboard/FoodAdminLogin/FoodAdminLogin';
import { SignUpForm } from './components/SignUpForm/SignUpForm';
import { SuperAdminLogin } from './Pages/DashBoard/SuperAdmin/SuprAdminLogIn/SuprAdminLogin.jsx';
import { RegisterUser } from './components/Form/UserRegistration/RegisterUser.jsx';
import { UserLogin } from './components/Form/UserLogIn/UserLogin.jsx';

>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7

// ================================
// EDUCATION
import { EduHomePage } from "./Pages/EducationPage/EduHomePage/EduHomePage";
import { SchoolPage } from "./Pages/EducationPage/EduCatagoriesPg/SchoolPg";
import { CollegesPage } from "./Pages/EducationPage/EduCatagoriesPg/CollegesPg";
import { UniPage } from "./Pages/EducationPage/EduCatagoriesPg/UniPg";
import { OnlineCoursesPage } from "./Pages/EducationPage/EduCatagoriesPg/OnlineCourses";
import { TutorsPage } from "./Pages/EducationPage/EduCatagoriesPg/Tutors";
import { OnlineTrainingPage } from "./Pages/EducationPage/EduCatagoriesPg/OnlineTraining";

// ================================
// TECHNICIANS
import { TechniciansHomePg } from "./Pages/TechniciansPage/TechniciansHomePg/TechniciansHomePg";
import { ElectronicCata } from "./Pages/TechniciansPage/TechniciansCatagoriesPg/Electronics";
import { PlumbingGasCata } from "./Pages/TechniciansPage/TechniciansCatagoriesPg/PlumAndGas";
import { PaintingConstructCata } from "./Pages/TechniciansPage/TechniciansCatagoriesPg/ConstAndPaint";
import { CarpFurnitureCata } from "./Pages/TechniciansPage/TechniciansCatagoriesPg/Carpentry&Furniture";
import { CleanMaintCata } from "./Pages/TechniciansPage/TechniciansCatagoriesPg/Cleaning&Maintaining";
import { GardOutdoorCata } from "./Pages/TechniciansPage/TechniciansCatagoriesPg/Gardening&Outdoor";

// ================================
// TOURISM
import { TourismHome } from "./Pages/TourismPage/TourismHomepg/TourismHome";
import { Places } from "./Pages/TourismPage/TourismCategoriespg/Places";
import { Hotels } from "./Pages/TourismPage/TourismCategoriespg/Hotels";
import { Restaurants } from "./Pages/TourismPage/TourismCategoriespg/Restaurants";
import { Parks } from "./Pages/TourismPage/TourismCategoriespg/Parks";
import { Guide } from "./Pages/TourismPage/TourismCategoriespg/Guide";
import { Gallery } from "./Pages/TourismPage/TourismCategoriespg/Gallery";
import { TourGuides } from "./Pages/TourismPage/TourismCategoriespg/TourGuides";
import { TourismLandingPage } from "./Pages/TourismPage/Landingpage/TourismLandingpage";

// ================================
// FOOD
import { FoodHomePage } from "./Pages/FoodPage/FoodHomePage/FoodHomePage";
import { FineDiningPage } from "./Pages/FoodPage/FoodCatagoriespg/FineDining";
import { CafesPage } from "./Pages/FoodPage/FoodCatagoriespg/Cafes";
import { FastFoodPage } from "./Pages/FoodPage/FoodCatagoriespg/FastFood";
import { LocalFoodPage } from "./Pages/FoodPage/FoodCatagoriespg/LocalFood";
import { BakeriesPage } from "./Pages/FoodPage/FoodCatagoriespg/Bakeries";
import { StreetFoodPage } from "./Pages/FoodPage/FoodCatagoriespg/StreetFood";

// ================================
// HOSPITAL
import { HospHomePage } from "./Pages/HospitalPage/HospHomePg/HospHomePg";
import { HospitalsPage } from "./Pages/HospitalPage/HosCategoriesPg/Hospitals";
import { ClinicsPage } from "./Pages/HospitalPage/HosCategoriesPg/Clinics";
import { PharmaciesPage } from "./Pages/HospitalPage/HosCategoriesPg/Pharmacies";
import { DiagnosticsPage } from "./Pages/HospitalPage/HosCategoriesPg/Diagnostics";
import { AmbulancePage } from "./Pages/HospitalPage/HosCategoriesPg/Ambulance";
import { SpecialistsPage } from "./Pages/HospitalPage/HosCategoriesPg/Specialists";

// ================================
// DASHBOARD
import { DashBoard } from "./Pages/DashBoard/DashBoardHomeLayout/Dashboard";
import { FoodDashboard } from "./Pages/DashBoard/FoodDashboard/FoodDashboard";
import ProviderDashboard from "./Pages/DashBoard/ProviderDashboard/ProviderDashboard";
import { ProviderOverview } from "./Pages/DashBoard/ProviderDashboard/ProviderOverview";
import CustomerRequests from "./Pages/DashBoard/ProviderDashboard/Components/CustomerRequests";
import BusinessProfile from "./Pages/DashBoard/ProviderDashboard/Components/BusinessProfile";
import ProviderServices from "./Pages/DashBoard/ProviderDashboard/Components/ProviderServices";
import ProviderReviews from "./Pages/DashBoard/ProviderDashboard/Components/ProviderReviews";
import ProviderSubscription from "./Pages/DashBoard/ProviderDashboard/Components/ProviderSubscription";
import ProviderSupport from "./Pages/DashBoard/ProviderDashboard/Components/ProviderSupport";

// ================================
// BUSINESS
import { BusinessHomePage } from "./Pages/BusinessPage/BusinessHomePage/BusinessHomePage";
import { ShopsRetailPg } from "./Pages/BusinessPage/BusinessCategoriesPg/ShopsRetailPg";
import { OfficesPg } from "./Pages/BusinessPage/BusinessCategoriesPg/OfficesPg";
import { EventsPg } from "./Pages/BusinessPage/BusinessCategoriesPg/EventsPg";
import { ManufacturingPg } from "./Pages/BusinessPage/BusinessCategoriesPg/ManufacturingPg";
import { FreelancersPg } from "./Pages/BusinessPage/BusinessCategoriesPg/FreelancersPg";
import { BusinessRegistration } from "./Pages/BusinessPage/Registration/BusinessRegistration";
import { BusinessLogin } from "./Pages/BusinessPage/Login/BusinessLogin";

// ================================
// ROUTES
const routes = [
<<<<<<< HEAD
  { path: "/", element: <App /> },
  {
    path: "/form",
    element: <FormsLayout />,
    children: [
      { index: true, element: <SignUpForm /> },
    ]
  },
  { path: "/AboutUs", element: <Aboutus /> },
  { path: "/ContactUs", element: <Contactus /> },

  { path: "/dashboard", element: <DashBoard /> },
  { path: "/dashboard/fooddashboard", element: <FoodDashboard /> },

  {
    path: "/dashboard/provider",
    element: <ProviderDashboard />,
    children: [
      { index: true, element: <ProviderOverview /> },
      { path: "requests", element: <CustomerRequests /> },
      { path: "profile", element: <BusinessProfile /> },
      { path: "services", element: <ProviderServices /> },
      { path: "reviews", element: <ProviderReviews /> },
      { path: "subscription", element: <ProviderSubscription /> },
      { path: "support", element: <ProviderSupport /> },
    ],
  },

=======
  {
    path: "/",
    element: <App />
  },

  {
    path: "/user/register",
    element: <RegisterUser />
  },

  {
    path: "/user/login",
    element: <UserLogin />
  },

  // Authentication / User
  {
    path: "/form",
    element: <SignUpForm />
  },

  {
    path: "/superadmin/dashboard",
    element: <SuperAdminDashboard />
  },

  {
    path: "/superadmin/login",
    element: <SuperAdminLogin />
  },

  // About Us Page
  {
    path: "/AboutUs",
    element: <Aboutus />
  },

  // Contact Us Page 
  {
    path: "/ContactUs",
    element: <Contactus />
  },
  // Education Sector
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
  {
    path: "/edu",
    element: <EduLayout />,
    children: [
      { index: true, element: <EduHomePage /> },
      { path: "schools", element: <SchoolPage /> },
      { path: "colleges", element: <CollegesPage /> },
      { path: "uni", element: <UniPage /> },
      { path: "onlineCourses", element: <OnlineCoursesPage /> },
      { path: "tutors", element: <TutorsPage /> },
      { path: "training", element: <OnlineTrainingPage /> },
      { path: "admin", element: <AdminLogin /> },
      { path: "dashboard", element: <SchoolAndClgDashBoard /> },
      { path: ":catagory/:id", element: <SingleLandingPage /> }
    ],
  },

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

  {
    path: "/tourism",
    element: <TourismLayout />,
    children: [
      { index: true, element: <TourismHome /> },
      { path: "dashboard", element: <TourismDashboard /> },
      { path: "register", element: <TourismRegistration /> },
      { path: "places", element: <Places /> },
      { path: "hotels", element: <Hotels /> },
      { path: "restaurants", element: <Restaurants /> },
      { path: "parks", element: <Parks /> },

      { path: "guides", element: <TourGuides /> },
<<<<<<< HEAD
      { path: "gallery", element: <Gallery /> },
=======
      { path: "bazar", element: <Bazar /> },

      { path: "landing", element: <TourismLandingPage /> },
      // Dynamic route for individual service provider
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
      { path: ":id", element: <TourismLandingPage /> },
    ],
  },

  {
    path: "/food",
    element: <FoodLayout />,
    children: [
      { index: true, element: <FoodHomePage /> },
      { path: "fine-dining", element: <FineDiningPage /> },
      { path: "cafes", element: <CafesPage /> },
      { path: "fast-food", element: <FastFoodPage /> },
      { path: "local-food", element: <LocalFoodPage /> },
      { path: "bakeries", element: <BakeriesPage /> },
      { path: "street-food", element: <StreetFoodPage /> },
      { path: "fooddashboard", element: <FoodDashboard /> },
      { path: "admin", element: <FoodAdminLogin /> },
    ],
  },

  {
    path: "/hospital",
    element: <HospitalLayout />,
    children: [
      { index: true, element: <HospHomePage /> },
      { path: "hospitals", element: <HospitalsPage /> },
      { path: "clinics", element: <ClinicsPage /> },
      { path: "pharmacies", element: <PharmaciesPage /> },
      { path: "diagnostics", element: <DiagnosticsPage /> },
      { path: "ambulance", element: <AmbulancePage /> },
      { path: "specialists", element: <SpecialistsPage /> },
    ],
  },

  {
    path: "/business",
    element: <BusinessLayout />,
    children: [
      { index: true, element: <BusinessHomePage /> },
      { path: "shops", element: <ShopsRetailPg /> },
      { path: "offices", element: <OfficesPg /> },
      { path: "events", element: <EventsPg /> },
      { path: "manufacturing", element: <ManufacturingPg /> },
      { path: "freelancers", element: <FreelancersPg /> },
      { path: "admin-login", element: <BusinessAdminLogin /> },
      {
        path: "dashboard",
        element: <BusinessDashboard />,
        children: [
          {
            path: "track-order",
            element: <CustomerDashboard />
          }
        ]
      },
    ],
  },

<<<<<<< HEAD
  { path: "/business/register", element: <BusinessRegistration /> },
  { path: "/business/login", element: <BusinessLogin /> },
=======
  // Page Not Found
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
  { path: "*", element: <PageNotFoundPg /> },
  {
    path: "/customer/login",
    element: <CustomerLogin />
  },
  {
    path: "/customer/dashboard",
    element: <CustomerDashboard />
  },
  {
    path: "/api/payfast/return", element: <PageNotFoundPg />
  },
];

// ================================
// ROUTER
const router = createBrowserRouter(routes);

// ================================
<<<<<<< HEAD
// RENDER
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  </React.StrictMode>
=======
// Render App
// ================================
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CustomerAuthProvider>
    <RouterProvider router={allRoutes} />
  </CustomerAuthProvider>
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
);

reportWebVitals();
