import { quotes } from "../assets";

const FeedbackCard = ({ name, title, img }) => (
  <div className="flex flex-col px-12 py-11 rounded-[20px] bg-gray-100 min-w-[340px] w-[340px] my-4 mr-2 feedback-card shadow-lg ">
    <div className="flex flex-col items-center ">
      <div className="w-[300px] h-[300px] bg-white shadow-lg flex items-center j mb-4 rounded-lg ">
        <img src={img} alt={name} className="object-cover w-full h-full" />
      </div>
      <h4 className="text-white font-poppins font-semibold text-[24px] leading-[36px] focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2">
        {title}
      </h4>
    </div>
  </div>
);

export default FeedbackCard;
