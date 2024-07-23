import React from 'react';
import styles from '../style';
import { Footer, Hero, Navbar } from '../components';
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
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          {/* <Hero /> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Trend;
