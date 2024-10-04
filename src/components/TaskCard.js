import React, { useState } from 'react';
import { Box, Typography, IconButton, Menu, MenuItem, TextField, Button, Modal, Select, FormControl, InputLabel } from '@mui/material';
import { MoreVert as MenuIcon } from '@mui/icons-material'; 
import MediumPriorityIcon from "../image/YellowIcon.svg";
import HighPriorityIcon from "../image/RedIcon.svg";
import LowPriorityIcon from "../image/GreenIcon.svg";
import SkullIcon from "../image/SkullIcon.svg";
import EditIcon from "../image/EditIcon.svg";
import DeleteIcon from "../image/DeleteIcon.svg";
import AddIcon from "../image/AddIcon.svg"; 
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const [isDimmed, setIsDimmed] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title || '');
  const [time, setTime] = useState(task.time || '');
  const [date, setDate] = useState(task.date || '');
  const [priority, setPriority] = useState(task.priority || 'Low');
  const [selectedTask, setSelectedTask] = useState(null);
 
  // State for subtasks
  const [subtasks, setSubtasks] = useState([]); 
  const [newSubtaskTitle, setNewSubtaskTitle] = useState(''); 
  const [newSubtaskDate, setNewSubtaskDate] = useState(''); 
  const [newSubtaskTime, setNewSubtaskTime] = useState(''); 
  const [newSubtaskPriority, setNewSubtaskPriority] = useState('Low'); // New state for subtask priority
  const [isSubtaskModalOpen, setIsSubtaskModalOpen] = useState(false); 
  const [selectedSubtask, setSelectedSubtask] = useState(null);
  const [subtaskAnchorEl, setSubtaskAnchorEl] = useState(null);

  const handleSubtaskMenuOpen = (event, subtask) => {
    setSubtaskAnchorEl(event.currentTarget);
    setSelectedSubtask(subtask); // Store the selected subtask
  };
  const handleStatusChange = (event, subtask, index) => {
    const updatedStatus = event.target.value;
    
    // Update the subtask's status in your state (if using useState or similar state management)
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index].status = updatedStatus;
    
    setSubtasks(updatedSubtasks); // Assuming you're using useState for subtasks
  };
  
  const handleSubtaskMenuClose = () => {
    setSubtaskAnchorEl(null);
    setSelectedSubtask(null); // Reset selected subtask
  };
  const handleEditSubtask = () => {
    setIsSubtaskModalOpen(true); // Open the modal
    setNewSubtaskTitle(selectedSubtask.title);
    setNewSubtaskDate(selectedSubtask.date);
    setNewSubtaskTime(selectedSubtask.time);
    setNewSubtaskPriority(selectedSubtask.priority);
  };
  const handleDeleteSubtask = () => {
    setSubtasks((prevSubtasks) =>
      prevSubtasks.filter((subtask) => subtask !== selectedSubtask)
    );
    handleSubtaskMenuClose(); // Close the menu after deletion
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenTaskModal = (task) => {
    setSelectedTask(task);
    setTaskTitle(task.title);
    setDate(task.date);
    setTime(task.time);
    setPriority(task.priority);
    setIsTaskModalOpen(true);
  };

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false);
  };

  const handleTaskSubmit = (updatedTask) => {
    onEdit(updatedTask);
    handleCloseTaskModal();
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'Low':
        return LowPriorityIcon;
      case 'Medium':
        return MediumPriorityIcon;
      case 'High':
        return HighPriorityIcon;
      default:
        return HighPriorityIcon;
    }
  };

  const priorityIcon = getPriorityIcon(priority);

  const handleOpenSubtaskModal = () => {
    setIsSubtaskModalOpen(true);
  };

  const handleCloseSubtaskModal = () => {
    setIsSubtaskModalOpen(false);
    setNewSubtaskTitle(''); 
    setNewSubtaskDate(''); 
    setNewSubtaskTime(''); 
    setNewSubtaskPriority('Low'); // Reset priority
  };

  const handleAddSubtask = () => {
    const subtaskData = {
      title: newSubtaskTitle,
      date: newSubtaskDate,
      time: newSubtaskTime,
      priority: newSubtaskPriority,
    };
  
    if (selectedSubtask) {
      // Update existing subtask logic here
      const updatedSubtasks = subtasks.map((subtask) => {
        if (subtask.id === selectedSubtask.id) {
          return { ...subtask, ...subtaskData }; // Update the subtask with new data
        }
        return subtask; // Return the unchanged subtask
      });
  
      setSubtasks(updatedSubtasks); // Update the state with the new subtasks array
      setSelectedSubtask(null); // Clear the selected subtask state
    } else {
      // Add new subtask logic here
      const newSubtask = {
        id: Date.now(), // Generate a unique id (you might want to use a better method in a real application)
        ...subtaskData,
      };
  
      setSubtasks((prevSubtasks) => [...prevSubtasks, newSubtask]); // Add the new subtask to the state
    }
  
    handleCloseSubtaskModal(); // Close the modal after action
  };

  return (
    <Box
      sx={{
        backgroundColor: '#2b2b2b',
        padding: '16px',
        borderRadius: '12px',
        marginBottom: '16px',
        position: 'relative',
        color: isDimmed ? 'rgba(255, 255, 255, 0.5)' : '#ffffff',
        width: '280px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
        transition: 'transform 0.5s ease, filter 0.5s ease, color 0.5s ease',
        fontFamily: 'Urbanist',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ color: isDimmed ? '#7a7a7a' : '#a7a7a7', fontSize: '10px', letterSpacing: '0.5px', fontFamily: 'Urbanist', fontWeight: 400 }}>
          {date}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={priorityIcon} alt={`${priority} Priority`} style={{ width: 18, height: 18, filter: isDimmed ? 'brightness(70%)' : 'none' }} />
          <IconButton
            onClick={handleOpenSubtaskModal}
            sx={{ color: '#ffffff', marginLeft: '8px' }}
          >
            <img src={AddIcon} alt="Add Subtask" style={{ width: 18, height: 18 }} />
          </IconButton>
        </Box>
      </Box>

      <Typography variant="body2" sx={{ marginTop: '12px', fontSize: '14px', fontWeight: 600, color: isDimmed ? 'rgba(255, 255, 255, 0.5)' : '#ffffff', letterSpacing: '0.5px', lineHeight: '1.5em', fontFamily: 'Urbanist' }}>
        {taskTitle}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: isDimmed ? '#5a1a1a' : '#7a2222', borderRadius: '6px', padding: '4px 8px' }}>
          <img src={SkullIcon} alt="Time and Date Icon" style={{ width: 14, height: 14, marginRight: '6px', filter: isDimmed ? 'brightness(70%)' : 'none' }} />
          <Typography sx={{ fontSize: '10px', color: isDimmed ? '#ff9999' : '#ff4d4d', letterSpacing: '0.5px', fontFamily: 'Urbanist', fontWeight: 600 }}>
            {date} - {time}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton sx={{ padding: '4px' }} onClick={handleMenuOpen}>
            <MenuIcon sx={{ color: isDimmed ? '#5a5a5a' : '#a7a7a7', fontSize: '16px' }} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                backgroundColor: '#000000',
                color: '#ffffff',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
                borderRadius: '8px',
              },
            }}
          >
            <MenuItem onClick={() => { handleMenuClose(); handleOpenTaskModal(task); }} sx={{ color: '#ffffff' }}>
              <img src={EditIcon} alt="Edit" style={{ marginRight: '10px' }} />
              Edit
            </MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); onDelete(); }} sx={{ color: '#ff0000' }}>
              <img src={DeleteIcon} alt="Delete" style={{ marginRight: '10px' }} />
              Delete
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Displaying Subtasks */}
      {subtasks.map((subtask, index) => (
  <Box
    key={index}
    sx={{
      backgroundColor: '#383838',
      marginTop: '16px',
      padding: '16px',
      borderRadius: '8px',
      position: 'relative',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for a clean look
    }}
  >
    {/* Main content: Title, Date/Time, and Status Dropdown */}
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* Subtask Title and Date/Time */}
      <Box>
        <Typography
          sx={{
            color: '#ffffff',
            fontFamily: 'Urbanist',   // Apply the Urbanist font family
            fontSize: '14px',         // Set the font size to 14px
            fontWeight: '600',        // Set font weight to 600
            lineHeight: '22px',       // Set line-height to 22px
            letterSpacing: '0.05em',  // Adjust letter spacing
            textAlign: 'left',        // Align text to the left
          }}
        >
          {subtask.title}
        </Typography>
        <Typography variant="caption" sx={{ color: '#a7a7a7', fontSize: '12px' }}>
          {subtask.date} - {subtask.time}
        </Typography>
      </Box>

      <FormControl sx={{ minWidth: 120, marginLeft: '16px' }}>
  <Select
    value={subtask.status}
    onChange={(event) => handleStatusChange(event, subtask, index)} // Function to update the status
    sx={{
      backgroundColor: '#505050', // Dropdown background color
      color:
        subtask.status === 'todo' ? '#ffffff' :
        subtask.status === 'inprogress' ? '#ffeb3b' :
        '#4caf50', // Change text color based on status
      fontFamily: 'Urbanist',
      fontSize: '12px',           // Font size for the dropdown
      fontWeight: 600,
      lineHeight: '20px',         // Slightly reduced line height
      letterSpacing: '0.05em',
      borderRadius: '4px',
      padding: '4px',             // Adjusted padding for a smaller appearance
      '& .MuiSelect-select': {
        padding: '0px 10px',      // Custom padding for the dropdown select area
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',            // Remove the border
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: 'none',            // Remove the hover border as well
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: 'none',            // Remove the border when focused
      },
    }}
    MenuProps={{
      PaperProps: {
        sx: {
          backgroundColor: '#000000',
          color: '#ffffff',
        },
      },
    }}
  >
    <MenuItem value="todo">To Do</MenuItem>
    <MenuItem value="inprogress">In Progress</MenuItem>
    <MenuItem value="completed">Completed</MenuItem>
  </Select>
</FormControl>
    </Box>

    {/* Priority Icon and Menu */}
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '8px' }}>
      <img
        src={getPriorityIcon(subtask.priority)}
        alt={`${subtask.priority} Priority`}
        style={{ width: 20, height: 20, marginRight: '8px' }}
      />
      <IconButton
        onClick={(event) => handleSubtaskMenuOpen(event, subtask)}
        sx={{ padding: '4px' }}
      >
        <MoreVertIcon sx={{ color: '#ffffff', fontSize: '18px' }} />
      </IconButton>
    </Box>
  </Box>
))}

{/* Subtask Menu for Edit and Delete Options */}
<Menu
  anchorEl={subtaskAnchorEl}
  open={Boolean(subtaskAnchorEl)}
  onClose={handleSubtaskMenuClose}
  PaperProps={{
    sx: {
      backgroundColor: '#000000',
      color: '#ffffff',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
      borderRadius: '8px',
    },
  }}
>
  <MenuItem onClick={handleEditSubtask} sx={{ color: '#ffffff', display: 'flex', alignItems: 'center' }}>
    <img src={EditIcon} alt="Edit" style={{ width: '16px', marginRight: '8px' }} />
    Edit
  </MenuItem>
  <MenuItem onClick={handleDeleteSubtask} sx={{ color: '#ff4f4f', display: 'flex', alignItems: 'center' }}>
    <img src={DeleteIcon} alt="Delete" style={{ width: '16px', marginRight: '8px' }} />
    Delete
  </MenuItem>
</Menu>

{/* Subtask Modal */}
<Modal
  open={isSubtaskModalOpen}
  onClose={handleCloseSubtaskModal}
  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
>
  <Box sx={{ backgroundColor: '#22272B', padding: '16px', borderRadius: '8px', width: '400px' }}>
    <Typography variant="h6" sx={{ marginBottom: '16px', color: '#ffffff' }}>
      {selectedSubtask ? "Edit Subtask" : "Add Subtask"} {/* Change title based on action */}
    </Typography>

    {/* Subtask Title Heading */}
    <Typography variant="subtitle1" sx={{ color: '#ffffff', marginBottom: '8px' }}>
      Subtask Title
    </Typography>
    <TextField
      fullWidth
      placeholder="Enter subtask title"
      value={newSubtaskTitle}
      onChange={(e) => setNewSubtaskTitle(e.target.value)}
      sx={{ marginBottom: '16px' }}
      InputProps={{
        sx: { color: '#ffffff' }, // Change input text color to white
      }}
    />

    {/* Date Heading */}
    <Typography variant="subtitle1" sx={{ color: '#ffffff', marginBottom: '8px' }}>
      Date
    </Typography>
    <TextField
      fullWidth
      type="date"
      value={newSubtaskDate}
      onChange={(e) => setNewSubtaskDate(e.target.value)}
      sx={{ marginBottom: '16px' }}
      InputProps={{
        sx: { color: '#ffffff' }, // Change input text color to white
      }}
    />

    {/* Time Heading */}
    <Typography variant="subtitle1" sx={{ color: '#ffffff', marginBottom: '8px' }}>
      Time
    </Typography>
    <TextField
      fullWidth
      type="time"
      value={newSubtaskTime}
      onChange={(e) => setNewSubtaskTime(e.target.value)}
      sx={{ marginBottom: '16px' }}
      InputProps={{
        sx: { color: '#ffffff' }, // Change input text color to white
      }}
    />

    {/* Priority Heading */}
    <Typography variant="subtitle1" sx={{ color: '#ffffff', marginBottom: '8px' }}>
      Priority
    </Typography>
    <FormControl fullWidth sx={{ marginBottom: '16px' }}>
      <Select
        value={newSubtaskPriority}
        onChange={(e) => setNewSubtaskPriority(e.target.value)}
        sx={{ color: '#ffffff' }} // Change Select text color to white
      >
        <MenuItem value="Low">Low</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="High">High</MenuItem>
      </Select>
    </FormControl>

    <Button
      variant="contained"
      onClick={handleAddSubtask} // You might want to rename this function for clarity
      disabled={!newSubtaskTitle || !newSubtaskDate || !newSubtaskTime || !newSubtaskPriority}
      sx={{
        backgroundColor: (!newSubtaskTitle || !newSubtaskDate || !newSubtaskTime || !newSubtaskPriority)
          ? 'rgba(255, 255, 255, 0.3)'  // Lightly visible when disabled
          : '#1976d2',                   // Blue color when enabled
        color: '#ffffff',
        cursor: (!newSubtaskTitle || !newSubtaskDate || !newSubtaskTime || !newSubtaskPriority)
          ? 'not-allowed'                // Change cursor to not-allowed when disabled
          : 'pointer',
        transition: 'background-color 0.3s ease', // Smooth transition between states
      }}
    >
      {selectedSubtask ? "Update Subtask" : "Add Subtask"} {/* Change button text based on action */}
    </Button>
  </Box>
</Modal>
      {/* Edit Task Modal */}
    </Box>
  );
};

export default TaskCard;
