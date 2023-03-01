import { FC } from 'react';
// MUI
import { styled } from '@mui/material/styles';
import FormHelperText from '@mui/material/FormHelperText';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import {
  FormControl,
  Select,
  MenuItem,
  SelectProps,
  Typography,
  Grid,
} from '@mui/material';
// validate
import { Control, Controller, FieldErrors } from 'react-hook-form';
// lib
import { scheduleDataInfo } from '../../lib/inputDataControl';

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
      <Grid container direction='row' alignItems='center'>
        <Grid item xs={1} sx={{ mb: '0.5rem', mr: '0.4rem' }}>
          <LocationOnOutlinedIcon />
        </Grid>
        <Grid item xs={10} sx={{ mb: '0.5rem' }}>
          <Controller
            defaultValue={locationDefaultValue}
            control={control}
            name='locationName'
            render={({ field }) => (
              <CssFormControl fullWidth sx={{ my: '0.5rem' }} focused>
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
        </Grid>
        <Grid item xs={1} sx={{ mb: '0.5rem', mr: '0.4rem' }}>
          <PersonOutlineOutlinedIcon />
        </Grid>
        <Grid item xs={10} sx={{ mb: '0.5rem' }}>
          <Controller
            defaultValue={operatorDefaultValue}
            control={control}
            name='operatorName'
            render={({ field }) => (
              <CssFormControl fullWidth sx={{ my: '0.5rem' }} focused>
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
          />
        </Grid>
      </Grid>
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
