import React, { useEffect, useState } from 'react';
import styles from '../style';
import Testimonials from './Testimonials';

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [predictionData, setPredictionData] = useState(null);
  const [datas, setdatas] = useState('');
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
      console.log(data);
      datas(setPredictionData.bar_plot);
    } catch (error) {
      console.error('Error fetching prediction data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // useEffect(() => {
  //   handlePredict(); // Initial fetch when component mounts or selectedMonth changes
  // }, [selectedMonth]);

  return (
    <div className="p-8 h-[200vh]">
      <h1 className="mb-8 text-6xl font-bold text-center text-white">Trend Prediction Model</h1>

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
        <button onClick={handlePredict} className="p-2 ml-4 text-white bg-blue-500 rounded-lg">
          Predict
        </button>
      </div>

      {isLoading ? (
        <div className="text-xl text-center text-white">Loading...</div>
      ) : predictionData ? (
        <div className="flex flex-wrap justify-center gap-6">
          <div className="w-full bg-white shadow-lg md:w-1/2 lg:w-1/4 rounded-xl">
            <div className="p-4">
              <h2 className="mb-4 text-xl font-bold text-white">Bar Chart</h2>
              <img
                src={`http://127.0.0.1:8000/${predictionData.bar_plot}`}
                alt="Bar Chart"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="w-full bg-white shadow-lg md:w-1/2 lg:w-1/4 rounded-xl">
            <div className="p-4">
              <h2 className="mb-4 text-xl font-bold">Line Chart</h2>
              <img
                src={`http://127.0.0.1:8000/${predictionData.line_plot}`}
                alt="Line Chart"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="w-full bg-white shadow-lg md:w-1/2 lg:w-1/4 rounded-xl">
            <div className="p-4">
              <h2 className="mb-4 text-xl font-bold">Pie Chart</h2>
              <img
                src={`http://127.0.0.1:8000/${predictionData.pie_plot}`}
                alt="Pie Chart"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="w-full bg-white shadow-lg md:w-1/2 lg:w-1/4 rounded-xl">
            <div className="p-4">
              <h2 className="mb-4 text-xl font-bold">Area Chart</h2>
              <img
                src={`http://127.0.0.1:8000/${predictionData.rel_plot}`}
                alt="Area Chart"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-xl text-center text-white mt-11 mb-20">
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
