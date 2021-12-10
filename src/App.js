import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router,Routes } from 'react-router-dom';
import CustomChatBot from './Components/CustomChatBot/CustomChatBot';
import LandingPage from './Components/LoginPage/LoginPage';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/chatbot" element={<CustomChatBot/>}/>
          </Routes>
      </Router>
      
    </div>
  );
}

export default App;
