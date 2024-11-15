import React from "react";
import { useRouter } from "next/router";
import Home from "./Home";
import AboutSection from "./About";
import Services from "./services";
import ApplyNowForm from "./apply";
import ContactUsForm from "./Contact";
import AdminLogin from "./Admin";
import HireForm from "./hire";
import Dashboard from "./dashboard/index";
import AddTask from "./dashboard/add";
import MyModal from "./dashboard/update";
import Coursespage from "./dashboard/coursespage";
import Courses from "./Courses/index.js";
import HTD from "./services/HTD";
import InstitutionTraining from "./services/Institution";
import MCATraining from "./services/MCA";
import LateralTraining from "./services/Lateral";
import SoftwareDevelopmentCourses from "./Courses/SoftwareDevelopmentCourses";
import EmbeddedCourses from "./Courses/EmbeddedCourses";
import TestingTrackCourses from "./Courses/TestingTrackCourses";
import MechanicalDesignCourses from "./Courses/MechanicalDesignCourses";
import Layout from "./Layout";
import QuickEnquiry from "./quickenquiry";
import EnquiryForms from "./enquiry";
import { FormDataProvider } from "./FormContext";
import { FormProvider } from "./FormContext";
import "../styles/globals.css";
import "../styles/footer.css";
import "../styles/Hero.css";
import "../styles/courses.css";
import "../styles/admission.css";
import "../styles/sliders.css";
import "../styles/clients.css";
import "../styles/testimonial.css";
import "../styles/connect.css";
import "../styles/home.css";
import "../styles/about.css";
import "../styles/services.css";
import "../styles/form.css";
import "../styles/navbar.css";
import "../styles/index.css";
import SportHouse from "./sportform";
import Sports from "./dashboard/sports";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const getPageComponent = () => {
    switch (router.pathname) {
      case "/":
        return <Home />;
      case "/about":
        return <AboutSection />;
      case "/Courses":
        return <Courses />;
      case "/Courses/SoftwareDevelopmentCourses":
        return (
          <Layout>
            <SoftwareDevelopmentCourses />
          </Layout>
        );
      case "/Courses/EmbeddedCourses":
        return (
          <Layout>
            <EmbeddedCourses />
          </Layout>
        );
      case "/Courses/TestingTrackCourses":
        return (
          <Layout>
            <TestingTrackCourses />
          </Layout>
        );
      case "/Courses/MechanicalDesignCourses":
        return (
          <Layout>
            <MechanicalDesignCourses />
          </Layout>
        );
      case "/services":
        return <Services />;
      case "/services/htd":
        return <HTD />;
      case "/services/institution":
        return <InstitutionTraining />;
      case "/services/mca":
        return <MCATraining />;
      case "/services/lateral":
        return <LateralTraining />;
      // case "/signup":
      //   return <AdminLogin />;
      case "/quickenquiry":
        return <QuickEnquiry />;
      case "/apply":
        return <ApplyNowForm />;
      case "/Contact":
        return <ContactUsForm />;
      case "/hire":
        return <HireForm />;
      case "/dashboard":
        return <Dashboard />;
      case "/dashboard/add":
        return <AddTask />;
      case "/dashboard/update":
        return <MyModal />;
      case "/dashboard/coursespage":
        return <Coursespage />;
      case "/sportform":
        return <SportHouse />;
      case "/dashboard/sports":
        return <Sports />;
      case "/enquiry":
        return (
          <FormProvider>
            <EnquiryForms />
          </FormProvider>
        );
      default:
        return (
          <div className="App">
            <Component {...pageProps} />
          </div>
        );
    }
  };

  return getPageComponent();
}

export default MyApp;
