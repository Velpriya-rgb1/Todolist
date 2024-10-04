import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Illustration from './Illustration';
import CreateTaskButton from './CreateTaskButton';

const TaskApp = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate(); // Get the navigate function from the hook

  const handleCreateTask = () => {
    // Create a task logic (you can customize the task details as needed)
    setTasks([...tasks, { id: tasks.length + 1, name: `Task ${tasks.length + 1}` }]);
  };

  const navigateToCategory = () => {
    navigate('/category'); // Navigate to the CategoryPage
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        backgroundColor: '#101214', // Matches dark background
        padding: '20px'
      }}
    >
      {/* Illustration */}
      <Illustration />


      {/* Create Task Button with navigation */}
      <CreateTaskButton 
        handleCreateTask={handleCreateTask} 
        navigateToCategory={navigateToCategory} 
      />
    </Box>
  );
};

export default TaskApp;
