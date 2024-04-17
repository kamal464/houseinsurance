import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Login from '../src/components/Login';
import Signup from '../src/components/Signup';
import HomeInsuranceList from '../src/components/HomeInsuranceList';
import HomeInsuranceForm from './components/HomeInsuranceForm';
import NotFound from './components/NotFound'; // Assuming you have a separate file for NotFound

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
          {loggedIn && (
            <>
              <Route path="/homeinsurancelist" element={<HomeInsuranceList />} />
              <Route path="/homeinsuranceform" element={<HomeInsuranceForm />} />
              <Route path="/homeinsuranceform/:id" element={<HomeInsuranceForm />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
