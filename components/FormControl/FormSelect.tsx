import { FC } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import {
  FormControl,
  Select,
  MenuItem,
  SelectProps,
  Typography,
} from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import { scheduleDataInfo } from '../../lib/inputDataControl';
import { styled } from '@mui/material/styles';

type FormSelectProps = {
  operator: any;
  location: any;
  control: Control<scheduleDataInfo>;
  locationDefaultValue: string;
  operatorDefaultValue: string;
  errors: FieldErrors<scheduleDataInfo>;
} & SelectProps;

const FormSelect: FC<FormSelectProps> = ({
  errors,
  control,
  name,
  location,
  operator,
  locationDefaultValue,
  operatorDefaultValue,
  ...otherProps
}: FormSelectProps) => {
  return (
    <>
      <Typography color='secondary'>拠点名</Typography>
      {/* <Controller
        defaultValue={locationDefaultValue}
        control={control}
        name='locationName'
        render={({ field }) => (
          <CssFormControl fullWidth sx={{ my: '0.5rem' }}>
            <Select {...otherProps} {...field} required>
              <MenuItem disabled value=''>
                <em>選択してください</em>
              </MenuItem>
              {location &&
                location.map((user: any) => (
                  <MenuItem key={user.id} value={user.title}>
                    {user.title}
                  </MenuItem>
                ))}
            </Select>
            <FormHelperText sx={{ color: '#FF0000' }}>
              {errors.locationName?.message}
            </FormHelperText>
          </CssFormControl>
        )}
      />
      <Typography color='secondary'>オペレーター名</Typography>
      <Controller
        defaultValue={operatorDefaultValue}
        control={control}
        name='operatorName'
        render={({ field }) => (
          <CssFormControl fullWidth sx={{ my: '0.5rem' }}>
            <Select {...otherProps} {...field} required>
              <MenuItem disabled value=''>
                <em>選択してください</em>
              </MenuItem>
              {operator &&
                operator.map((user: any) => (
                  <MenuItem key={user.id} value={user.name}>
                    {user.name}
                  </MenuItem>
                ))}
            </Select>
            <FormHelperText sx={{ color: '#FF0000' }}>
              {errors.operatorName?.message}
            </FormHelperText>
          </CssFormControl>
        )}
      /> */}
    </>
  );
};

export default FormSelect;

// Styled Material UI TextField Component
const CssFormControl = styled(FormControl)({
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
