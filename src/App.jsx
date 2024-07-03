import React from 'react';
import { Home_components, ReadCources, Dashboard, Login, SignUp } from './components';
import Cours from './components/Cours';
import Tags from './components/Tags';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import Dashboard_Admin from './components/Dashboard_Admin';
import Dashboard_Enseignant from './components/Dashboard_Enseignant';
import Enseignant from './components/Enseignant'; // Corrected import
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<Home_components />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Cours" element={<Cours />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ReadCources/:id" element={<ReadCources />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Enseignant/:id" element={<Enseignant />} /> 
        <Route path="/Tags/:tag" element={<Tags />} />
        <Route path="/Dashboard_Enseignant" element={<Dashboard_Enseignant />} /> 
        <Route path="/Dashboard_Admin" element={<Dashboard_Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
