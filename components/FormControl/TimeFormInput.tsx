// MUI
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import {
  FormHelperText,
  Grid,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
// lib
import { scheduleDataInfo } from '../../lib/inputDataControl';
// validate
import { Controller, Control, FieldErrors } from 'react-hook-form';

type Props = {
  control: Control<scheduleDataInfo>;
  errors: FieldErrors<scheduleDataInfo>;
  startDefaultValue: Date;
  endDefaultValue: Date;
} & TextFieldProps;

const TimeFormInput = ({
  control,
  errors,
  startDefaultValue,
  endDefaultValue,
}: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid
        container
        direction='row'
        justifyContent='flex-start'
        alignItems='center'
      >
        <Controller
          defaultValue={startDefaultValue}
          control={control}
          name='start'
          render={({ field: { onChange, value } }) => (
            <MobileTimePicker
              value={value}
              onChange={onChange}
              renderInput={(params) => (
                <CssTextField
                  {...params}
                  focused
                  sx={{ mb: '0.5rem', width: '7rem' }}
                  error={!!errors['start']}
                />
              )}
            />
          )}
        />
        <Typography> 〜 </Typography>
        <Controller
          defaultValue={endDefaultValue}
          control={control}
          name='end'
          render={({ field: { onChange, value } }) => (
            <MobileTimePicker
              value={value}
              onChange={onChange}
              renderInput={(params) => (
                <CssTextField
                  {...params}
                  focused
                  sx={{ mb: '0.5rem', width: '7rem' }}
                  error={!!errors['end']}
                />
              )}
            />
          )}
        />
      </Grid>
      <FormHelperText sx={{ color: '#FF0000' }}>
        {errors.end?.message}
      </FormHelperText>
    </LocalizationProvider>
  );
};

export default TimeFormInput;

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
      border: 0,
      borderBottom: '1px solid #dddddd',
    },
    '&.Mui-focused fieldset': {
      border: 0,
      borderBottom: '1px solid #dddddd',
    },
    '& .Mui-disabled': {
      backgroundColor: '#F8F5F0',
    },
  },
});
