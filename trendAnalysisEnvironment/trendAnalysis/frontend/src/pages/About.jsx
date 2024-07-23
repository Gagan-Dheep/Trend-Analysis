import React from 'react';
import { Footer, Navbar } from '../components';
import styles from "../style";

const About = () => {
  return (
    <div className="w-full overflow-hidden bg-primary">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`w-full`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <section id="about" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
            <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
              <h1 className="flex-1 font-poppins font-semibold ss:text-[52px] text-[36px] text-white ss:leading-[72px] leading-[54px] mb-4">
                About Us
              </h1>
              <p className={`${styles.paragraph} max-w-[470px] mt-5 text-center sm:text-left`}>
                Welcome to Trends Analysis! We are dedicated to providing cutting-edge solutions for trend prediction by analyzing social media data and comparing it with live news. Our goal is to help businesses and individuals stay ahead of the curve with accurate and comprehensive trend insights.
              </p>
              <p className={`${styles.paragraph} max-w-[470px] mt-5 text-center sm:text-left`}>
                Our team of experts leverages advanced algorithms and machine learning techniques to ensure you have the most reliable data at your fingertips. Whether you're looking to boost your business strategies or stay informed about the latest trends, we have you covered.
              </p>
            </div>

            <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-14 p-5 relative`}>
              <div className="w-full p-3 shadow-lg rounded-3xl lg:w-3/4">
                <h2 className="mb-4 text-5xl font-bold text-center text-white">Our Mission</h2>
                <p className="text-lg text-center text-white">
                  To empower our users with accurate trend analysis and predictions, helping them make informed decisions in an ever-changing world.
                </p>
                <h2 className="mt-6 mb-4 text-2xl font-bold text-center text-white">Contact Information</h2>
                <p className="text-lg text-center text-white">
                  Email: contact@trends.com
                </p>
                <p className="text-lg text-center text-white">
                  Phone: 7090201383
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
        
       <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        {/* <Stats /> */}
        {/* <Testimonials /> */}
        {/* <Clients /> */}
        {/* <CTA /> */}
        <Footer/> 
      </div>
    </div>
    </div>
  );
};

export default About;