import React from 'react';
import styles from '../style';
import { Footer, Hero, Navbar, Testimonials } from '../components';
import Dashboard from '../components/Dashboard';

const Trend = () => {
  return (
    <div className="w-full overflow-hidden bg-primary">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className="w-full">
          <Navbar />
        </div>
      </div>
      <div>
       <div className="">
        <Dashboard/>
       </div>
        </div>
        <div className={`bg-blue-300 ${styles.paddingX} ${styles.flexCenter} mt-20 `}>
      <div className={`${styles.boxWidth}`}>
        {/* <Stats /> */}
        {/* <Testimonials /> */}
        {/* <Clients /> */}
        {/* <CTA /> */}
        <Footer /> 
      </div>
    </div>
      
    </div>
  );
};

export default Trend;
