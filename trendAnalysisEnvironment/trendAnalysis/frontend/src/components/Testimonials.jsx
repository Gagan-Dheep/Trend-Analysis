// import { feedback } from "../constants";
import {bar_plot} from '../assets'
import styles from "../style";
import FeedbackCard from "./FeedbackCard";
export const feedback = [ 
  { 
    
    title: "August 2024",
    img: bar_plot,
  }, 
  {
    
    title: "April 2024",
    img: bar_plot,
  },
  {
  
    title: "March 2024",
    img:bar_plot,
  },
];
const Testimonials = () => (
  <section id="clients" className={`${styles.paddingY} ${styles.flexCenter} flex-col relative`}>
    <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" />

    <div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]">
      <h2 className=  {`${styles.heading2} text-center`}>
        Recent Trends <br className="hidden sm:block" /> 
      </h2>                      
    </div>

    <div className="flex flex-wrap sm:justify-start justify-center w-full feedback-container relative z-[1]">
      {feedback.map((card) => <FeedbackCard key={card.id} {...card} />)}
    </div>
  </section>
);

export default Testimonials;
