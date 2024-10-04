// CreateTaskButtonStyles.js
import { styled } from '@mui/material/styles';

export const ModalBox = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600px',
  backgroundColor: '#22272B',
  height: '600px',
  boxShadow: 24,
  padding: theme.spacing(4),
  borderRadius: 2,
}));

export const Title = {
  color: '#ffffff',
  marginBottom: '1rem',
  fontFamily: 'Urbanist',
  fontSize: '24px',
  fontWeight: 700,
  lineHeight: '19.2px',
  letterSpacing: '0.05em',
  textAlign: 'left',
};

export const Subtitle = {
  color: '#738496',
  marginBottom: '1rem',
  fontFamily: 'Urbanist',
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '16.8px',
  letterSpacing: '0.05em',
  textAlign: 'left',
};

export const PriorityTitle = {
  color: '#ffffff',
  marginBottom: '1rem',
  fontFamily: 'Urbanist',
  fontSize: '16px',
  fontWeight: 700,
  lineHeight: '19.2px',
  letterSpacing: '0.05em',
  textAlign: 'left',
};

export const DateTimeInput = {
  marginBottom: '2rem',
  fontFamily: 'Urbanist',
  backgroundColor: '#101214',
  '& .MuiInputBase-input': { color: '#ffffff' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: '#4a4a4a' },
    '&:hover fieldset': { borderColor: '#666666' },
    '&.Mui-focused fieldset': { borderColor: '#ffffff' },
  },
};
