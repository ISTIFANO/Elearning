import React from 'react';
import { Home_components, Login, SignUp } from './components';
// import { Home_components } from './components/Home_components'; // Correction du chemin d'importation

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
     
    
     
      <Routes>  
        <Route path="/" element={<Home_components />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
