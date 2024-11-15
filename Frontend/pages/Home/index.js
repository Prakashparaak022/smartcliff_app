import React from 'react';
import Layout from '../Layout/index';
import HeroSection from '../Heropage/index';
// import Courses from '../courses/index';
import Admission from '../Admission/index';
import Clients from '../client/index';
import Testimonial from '../Testimonial/index';
import Connect from '../Connect/index';
import Gallery from '../Gallery/index';
import AllCourses from '../Courses/AllCourses';

function Home() {
  return (
    <div>
      <Layout>
        <HeroSection />
        <AllCourses/>
        <Admission/>
        <Clients />
        <Testimonial/>
        <Connect/>
        <Gallery/>
      </Layout>
    </div>
  )
}

export default Home;
