import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Ensure correct path to Navbar
import TaskApp from './components/TaskApp'; // Import TaskApp component for the task section
import CategoryPage from './components/CategoryPage'; // Ensure correct path to CategoryPage
import './App.css'; // Import the CSS file

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Navbar component */}
        <Navbar />
        
        <Routes>
          {/* Home page route */}
          <Route
            path="/"
            element={
              <div>
                {/* Flex container for General text and icons */}
                <div className="content-container">
                  <div className="text-icon-wrapper">
                    {/* Display "General" heading */}
                    
                    
                    {/* Use AddCategoryButton to add icons and text */}
                 
                  </div>
                </div>

                {/* Task section */}
                <div className="task-app-container">
                  <TaskApp />
                </div>
              </div>
            }
          />
          
          {/* Route for CategoryPage */}
          <Route path="/category" element={<CategoryPage />} />
          {/* You can also define dynamic category routes, if needed */}
          {/* <Route path="/category/:title" element={<CategoryPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
};
export default App;
