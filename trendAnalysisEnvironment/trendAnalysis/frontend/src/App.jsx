// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import LoginForm from './components/Login';
import Register from './components/Register';
import About from './pages/About';
import Trend from './pages/Trend';
import { Contact } from './pages/Contact';
// import Features from './Features';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trend" element={<Trend />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </Router>
);

export default App;
