import React, { useState } from 'react';
import styles from "../style";
import { Footer, Navbar } from '../components';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission, e.g., send the data to an API endpoint
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="w-full overflow-hidden bg-primary">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`w-full`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <section id="contact" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
            <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
              <h1 className="flex-1 font-poppins font-semibold ss:text-[52px] text-[36px] text-white ss:leading-[72px] leading-[54px] mb-4">
                Contact Us
              </h1>
              
              <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-white" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-white" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-white" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="message"
                    placeholder="Your message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>

            <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-14 p-5 relative`}>
              <div className="w-full p-3 shadow-lg rounded-3xl lg:w-3/4">
                <h2 className="mb-4 text-5xl font-bold text-center text-white">Get in Touch</h2>
                <p className="text-lg text-center text-white">
                  We would love to hear from you! Fill out the form to send us a message.
                </p>
                <p className="mt-4 text-lg text-center text-white">
                  Email: contact@trends.com
                </p>
                <p className="text-lg text-center text-white">
                  Phone: +7090201383
                </p>
              </div>
            </div>
          </section>
        </div>
       
      </div> <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
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