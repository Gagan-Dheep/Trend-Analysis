import styles from "../style";
import ChartComponent from "./Chart";
import GetStarted from "./GetStarted";
import { useState, useEffect } from "react";

const Hero = () => {
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setAnimation(true);
  }, []);

  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <div className="flex flex-row items-center justify-between w-full mb-4">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[52px] text-[36px] text-white ss:leading-[72px] leading-[54px] text-center sm:text-left">
            Discover the <br className="hidden sm:block" />{" "}
            <span className="text-gradient">Trends</span>{" "}
          </h1>
         
        </div>

        <h2 className="font-poppins font-semibold ss:text-[48px] text-[36px] text-white ss:leading-[72px] leading-[54px] text-center sm:text-left ">
          with Accurate Predictions.
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5 text-center sm:text-left`}>
          Our cutting-edge technology analyzes social media data and compares it with live news to predict trends with high accuracy. Stay ahead with our comprehensive trend analysis.
        </p>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        {/* AI-related animation */}
        
        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
        <ChartComponent/>
      </div>
    </section>
  );
};

export default Hero;