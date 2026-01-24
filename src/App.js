import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoodifyLandingPage from './landing';
import Login from './login';
import Signup from './signup';
import Dashboard from './dashboard';
import MoodTracker from './mood-tracker';
import ActivitiesPage from './activities';
import ThemePage from './theme';
import RecommendationsPage from './recommendations';
import PersonalizedContentPage from './results';
import ContentPage from './content';



function App() {
  return (
    
      <Router>
        <Routes>
            <Route path="/" element={<MoodifyLandingPage/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} /> 
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/mood-tracker" element={<MoodTracker/>} />
            <Route path="/activities" element={<ActivitiesPage/>} />
            <Route path="/theme" element={<ThemePage/>} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
            <Route path="/results" element={<PersonalizedContentPage/>} />
            <Route path="/content" element={<ContentPage/>} />
          </Routes>
        
      </Router>
    
  );
}

export default App;