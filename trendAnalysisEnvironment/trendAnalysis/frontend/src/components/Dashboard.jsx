import React, { useEffect, useState } from 'react';
import styles from '../style';
import Testimonials from './Testimonials';
import { a } from '../assets';

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [predictionData, setPredictionData] = useState(null);
  const [datas, setdatas] = useState('');
  const [timestamp, setTimestamp] = useState(Date.now());

  const handleInputChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handlePredict = async () => {
    if (!selectedMonth) return; // Do not fetch if selectedMonth is empty

    setIsLoading(true);
    setPredictionData(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/home/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ month: selectedMonth }),
        credentials: 'include',
      });

      const data = await response.json();
      setPredictionData(data);
      setTimestamp(Date.now());
      console.log(data);
      datas(setPredictionData.bar_plot);
    } catch (error) {
      console.error('Error fetching prediction data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="mb-8 text-4xl font-bold text-center text-white md:text-6xl">Trend Prediction Model</h1>

      <div className="mb-6 text-center text-white">
        <label htmlFor="month" className="block mb-2 text-lg font-bold">
          Enter Month of the Future to Predict:
        </label>
        <input
          type="text"
          id="month"
          value={selectedMonth}
          onChange={handleInputChange}
          className="p-2 text-black border rounded-lg"
          placeholder="e.g., 8 for August 2024"
        />
        <button onClick={handlePredict} className="p-2 mb-20 ml-4 text-white bg-blue-500 rounded-lg">
          Predict
        </button>
      </div>

      {isLoading ? (
        <div className="text-xl text-center text-white">Loading...</div>
      ) : predictionData ? (
        <div className="space-y-6">
          <h2 className='text-4xl font-bold text-center text-white'> The Prediction data for {selectedMonth}th Month is: </h2>

          <div className="w-full p-4 mx-auto bg-white shadow-lg md:w-3/4 lg:w-1/2 rounded-xl mb-7">
            <label className="block mb-2 text-3xl font-bold text-center text-black">Bar Chart</label>
            <img
              src={`http://127.0.0.1:8000/${predictionData.bar_plot}?timestamp=${timestamp}`}
              alt="Bar Chart"
              className="object-contain w-full h-96"
            />
          </div>

          <div className="w-full p-4 mx-auto bg-white shadow-lg md:w-3/4 lg:w-1/2 rounded-xl mb-7">
            <label className="block mb-2 text-3xl font-bold text-center text-black">Line Chart</label>
            <img
              src={`http://127.0.0.1:8000/${predictionData.line_plot}?timestamp=${timestamp}`}
              alt="Line Chart"
              className="object-contain w-full h-96"
            />
          </div>

          <div className="w-full p-4 mx-auto bg-white shadow-lg md:w-3/4 lg:w-1/2 rounded-xl mb-7">
            <label className="block mb-2 text-3xl font-bold text-center text-black">Pie Chart</label>
            <img
              src={`http://127.0.0.1:8000/${predictionData.pie_plot}?timestamp=${timestamp}`}
              alt="Pie Chart"
              className="object-contain w-full h-96"
            />
          </div>

          <div className="w-full p-4 mx-auto bg-white shadow-lg md:w-3/4 lg:w-1/2 rounded-xl mb-7">
            <label className="block mb-2 text-3xl font-bold text-center text-black">Area Chart</label>
            <img
              src={`http://127.0.0.1:8000/${predictionData.rel_plot}?timestamp=${timestamp}`}
              alt="Area Chart"
              className="object-contain w-full h-96"
            />
          </div>
        </div>
      ) : (
        <div className="mb-20 text-xl text-center text-white mt-11">
          Please enter a month and click "Predict" to see the trend predictions.
        </div>
      )}
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter} mb-30`}>
        <div className={`${styles.boxWidth} flex justify-around mb-20`}>
          <Testimonials />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
