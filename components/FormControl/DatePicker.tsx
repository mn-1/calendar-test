import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers';

type Props = {
  date: Dayjs;
};

export default function DatePickerForm({ date }: Props) {
  const [value, setValue] = useState<Dayjs | null>(dayjs(date));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        inputFormat='YYYY/MM/DD'
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(params) => (
          <CssTextField {...params} sx={{ mb: '0.5rem' }} />
        )}
      />
    </LocalizationProvider>
  );
}

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#5e5b5d',
    fontWeight: 400,
  },
  '& .MuiInputBase-input': {
    borderColor: '#c8d0d4',
  },
  '& .MuiInput-underline:after': {
    border: 'none',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-error': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#d32f2f',
      },
    },
    '& fieldset': {
      borderColor: '#c8d0d4',
      borderRadius: 0,
    },
    '&:hover fieldset': {
      border: '1px solid #c8d0d4',
    },
    '&.Mui-focused fieldset': {
      border: '1px solid #c8d0d4',
    },
    '& .Mui-disabled': {
      backgroundColor: '#F8F5F0',
    },
  },
});
