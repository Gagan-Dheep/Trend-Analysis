// Home.jsx
import React from 'react';
import styles from "./style";
import { Clients, CTA, Footer, Navbar, Stats, Testimonials, Hero } from "./components";

const Home = () => (
  <div className="w-full overflow-hidden bg-primary">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`w-full`}>
        <Navbar />
      </div>
    </div>

    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>
    
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Stats />
        {/* <Testimonials /> */}
        {/* <Clients /> */}
        <CTA />
        <Footer /> 
      </div>
    </div>
  </div>
);

export default Home;
