import React, { useState } from 'react';
// import LineChartImage from './images/line-chart.png'; // Replace with actual image paths
// import BarChartImage from './images/bar-chart.png';
// import PieChartImage from './images/pie-chart.png';
// import AreaChartImage from './images/area-chart.png';
// import { a } from '../assets/';
const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState('');

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    // Logic to update charts based on the selected month
  };

  const handleTheGraphDisplay = async (e) => {
    e.preventDefault();
    // console.log(inputs)
    const email = inputs.email;
    const password = inputs.password;
    console.log(email, password)
  
    try {
        const response = await fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
            }),
            credentials: 'include',
        });
  
        const data = await response.json();
        if (!response.ok) {
            alert(data.message)
        }
        else{
          navigate("/");
        }
    } catch (error) {
        console.error('Error during signup:', error);
        setErrorMessage('An error occurred, please try again.');
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6 text-center">
        <label htmlFor="month" className="block mb-2 text-lg font-bold">Select Month:</label>
        <select 
          id="month" 
          value={selectedMonth} 
          onChange={handleMonthChange} 
          className="p-2 border rounded-lg"
        >
          <option value="" disabled>Select a month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        <div className="w-full bg-white shadow-lg md:w-1/2 lg:w-1/4 rounded-xl">
          <div className="p-4">
            <h2 className="mb-4 text-xl font-bold">Bar Chart</h2>
            {/* <img src={a} alt="bar Chart" className="w-full h-auto" /> */}
          </div>
        </div>

        <div className="w-full bg-white shadow-lg md:w-1/2 lg:w-1/4 rounded-xl">
          <div className="p-4">
            <h2 className="mb-4 text-xl font-bold">Line Chart</h2>
            {/* <img src={BarChartImage} alt="Bar Chart" className="w-full h-auto" /> */}
          </div>
        </div>
// 
        <div className="w-full bg-white shadow-lg md:w-1/2 lg:w-1/4 rounded-xl">
          <div className="p-4">
            <h2 className="mb-4 text-xl font-bold">Pie Chart</h2>
            {/* <img src={PieChartImage} alt="Pie Chart" className="w-full h-auto" /> */}
          </div>
        </div>

        <div className="w-full bg-white shadow-lg md:w-1/2 lg:w-1/4 rounded-xl">
          <div className="p-4">
            <h2 className="mb-4 text-xl font-bold">Area Chart</h2>
            {/* <img src={AreaChartImage} alt="Area Chart" className="w-full h-auto" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};





export default Dashboard;


