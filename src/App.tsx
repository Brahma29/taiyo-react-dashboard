import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import Contacts from './screens/Contacts';
import AddContact from './screens/AddContact';
import ChartsMaps from './screens/Charts';

function App() {
  return (
    <div className="App bg-primary-bg">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="/" element={<Contacts />} />
            <Route path="/addcontact" element={<AddContact />} />
            <Route path="/edit/:id" element={<AddContact />} />
            <Route path="/charts" element={<ChartsMaps />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
