// MUI
import { TextField, TextFieldProps } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers';
// validate
import { useFormContext, Controller, Control } from 'react-hook-form';
// lib
import { scheduleDataInfo } from '../../lib/inputDataControl';

type Props = {
  defaultValue: Date;
  control: Control<scheduleDataInfo>;
} & TextFieldProps;

export default function DatePickerForm({ defaultValue, control }: Props) {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        defaultValue={defaultValue}
        control={control}
        name='date'
        render={({ field: { onChange, value } }) => (
          <DatePicker
            inputFormat='YYYY/MM/DD'
            value={value}
            onChange={onChange}
            renderInput={(params) => (
              <CssTextField
                {...params}
                sx={{ mb: '0.5rem' }}
                error={!!errors['date']}
                helperText={
                  errors['date']
                    ? (errors['date']?.message as unknown as string)
                    : ''
                }
              />
            )}
          />
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
