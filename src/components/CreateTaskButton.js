import React, { useState } from 'react';
import { Button, Modal, Box, Typography, TextField, MenuItem } from '@mui/material';
import GreenIcon from "../image/GreenIcon.svg";
import YellowIcon from "../image/YellowIcon.svg";
import RedIcon from "../image/RedIcon.svg";
import { ModalBox, Title, Subtitle, PriorityTitle, DateTimeInput } from './CreateTaskButtonStyles'; // Adjust the import path as necessary

const CreateTaskButton = ({ handleCreateTask, navigateToCategory }) => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const openTaskModal = () => {
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
  };

  const onCreateTask = () => {
    if (!taskTitle || !priority || !date || !time) return; // Don't proceed if any field is empty

    const newTask = {
      title: taskTitle,
      priority: priority,
      date: date,
      time: time,
    };

    handleCreateTask(newTask);
    navigateToCategory();
    closeTaskModal();

    // Reset the form fields after task is created
    setTaskTitle('');
    setPriority('');
    setDate('');
    setTime('');
  };

  // Check if all fields are filled
  const isFormValid = taskTitle && priority && date && time;

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={openTaskModal}
        sx={{ marginTop: '20px' }}
      >
        Create Task
      </Button>

      <Modal
        open={isTaskModalOpen}
        onClose={closeTaskModal}
        aria-labelledby="task-modal-title"
        aria-describedby="task-modal-description"
      >
        <ModalBox>
          <Typography variant="subtitle1" sx={Title}>
            New Task
          </Typography>

          <Typography variant="subtitle1" sx={Subtitle}>
            Title
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            sx={{
              mb: 3,
              backgroundColor: '#101214',
              '& .MuiInputBase-input': { color: '#ffffff' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#4a4a4a' },
                '&:hover fieldset': { borderColor: '#666666' },
                '&.Mui-focused fieldset': { borderColor: '#ffffff' },
              },
            }}
          />

          <Typography variant="subtitle1" sx={PriorityTitle}>
            Set Priority
          </Typography>

          <TextField
            select
            fullWidth
            variant="outlined"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            sx={{
              mb: 3,
              backgroundColor: '#101214',
              '& .MuiInputBase-input': { color: '#ffffff' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#4a4a4a' },
                '&:hover fieldset': { borderColor: '#666666' },
                '&.Mui-focused fieldset': { borderColor: '#ffffff' },
              },
            }}
          >
            <MenuItem value="Low">
              <img src={GreenIcon} alt="Low Priority" style={{ width: 20, height: 20, marginRight: 10 }} />
              Low
            </MenuItem>
            <MenuItem value="Medium">
              <img src={YellowIcon} alt="Medium Priority" style={{ width: 20, height: 20, marginRight: 10 }} />
              Medium
            </MenuItem>
            <MenuItem value="High">
              <img src={RedIcon} alt="High Priority" style={{ width: 20, height: 20, marginRight: 10 }} />
              High
            </MenuItem>
          </TextField>

          <Typography variant="subtitle1" sx={PriorityTitle}>
            Set Deadline
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ width: '48%', mr: 2 }}>
              <Typography variant="subtitle1" sx={Subtitle}>
                Date
              </Typography>
              <TextField
                fullWidth
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                sx={DateTimeInput}
              />
            </Box>

            <Box sx={{ width: '48%' }}>
              <Typography variant="subtitle1" sx={Subtitle}>
                Time
              </Typography>
              <TextField
                fullWidth
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                sx={DateTimeInput}
              />
            </Box>
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={onCreateTask}
            disabled={!isFormValid} // Disable the button if form is not valid
            sx={{ mt: 2, backgroundColor: isFormValid ? '#4CAF50' : '#666666', color: '#ffffff' }}
          >
            Create Task
          </Button>
        </ModalBox>
      </Modal>
    </>
  );
};

export default CreateTaskButton;
