import React, { useState } from 'react';
import CreateTaskButton from './CreateTaskButton'; // Adjust the import according to your structure
import TaskCard from './TaskCard'; // Import the TaskCard component
import './CategoryPage.css'; // Import the CSS file

const CategoryPage = () => {
  const [tasks, setTasks] = useState([]); // State to hold tasks
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to control modal visibility
  const [taskToEdit, setTaskToEdit] = useState(null); // State to hold the task being edited

  const handleCreateTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]); // Add the new task to the tasks array
  };
const navigateToCategory = () => {
    console.log("Navigating to category"); // Placeholder function for navigation
  };

  const handleEdit = (task) => {
    setTaskToEdit(task); // Set the task to be edited
    setIsEditModalOpen(true); // Open the modal
  };

  const handleDelete = (taskToDelete) => {
    setTasks((prevTasks) => prevTasks.filter(task => task !== taskToDelete)); // Remove the task from the tasks array
  };

  const handleUpdateTask = (id, updatedTitle) => {
    setTasks((prevTasks) => 
      prevTasks.map(task => (task.id === id ? { ...task, title: updatedTitle } : task))
    ); // Update the task in the tasks array
    setIsEditModalOpen(false); // Close the modal after updating
  };

  return (
    <div>
      <div className="button-container">
        <CreateTaskButton 
          handleCreateTask={handleCreateTask} 
          navigateToCategory={navigateToCategory} 
          className="create-task-button" 
        />
      </div>
      <div className="container">
        <div className="column">
          <h2 className="column-heading">To Do</h2>
          {/* Display tasks under the "To Do" column */}
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <TaskCard 
                key={index} 
                task={task} 
                onEdit={handleEdit} // Pass the edit handler
                onDelete={() => handleDelete(task)} // Pass the specific task to delete
              />
            ))
          ) : (
            <p>No tasks available.</p> // Message when no tasks are present
          )}
          
        </div>
        <div className="column">
          <h2 className="column-heading">In Progress</h2>
          {/* Add your tasks for In Progress here */}
        </div>
        <div className="column">
          <h2 className="column-heading">Completed</h2>
          {/* Add your tasks for Completed here */}
        </div>
      </div>
      

      {/* Edit Task Modal */}
      
    </div>
  );
};

export default CategoryPage;
