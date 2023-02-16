import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import {
  FormControl,
  Select,
  MenuItem,
  SelectProps,
  InputLabel,
} from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import { RegisterScheduleDataInfo } from '../../lib/inputDataControl';
import { styled } from '@mui/material/styles';

type FormSelectProps = {
  users: any;
  errorMessage: string | undefined;
  name: 'operatorName' | 'avatar';
  control: Control<RegisterScheduleDataInfo>;
  defaultValue: string;
} & SelectProps;

const EditFormSelect: FC<FormSelectProps> = (props: FormSelectProps) => {
  const {
    errorMessage,
    control,
    name,
    users,
    label,
    defaultValue,
    ...otherProps
  } = props;

  return (
    <Controller
      defaultValue={defaultValue}
      control={control}
      name={name}
      render={({ field }) => (
        <CssFormControl fullWidth sx={{ my: '0.5rem' }}>
          <InputLabel id='demo-simple-select-label'>{label}</InputLabel>
          <Select {...otherProps} {...field} required>
            <MenuItem disabled value=''>
              <em>選択してください</em>
            </MenuItem>
            {users &&
              users.map((user: any) => (
                <MenuItem key={user.id} value={user.name}>
                  {user.name}
                </MenuItem>
              ))}
          </Select>
          <FormHelperText sx={{ color: '#FF0000' }}>
            {errorMessage}
          </FormHelperText>
        </CssFormControl>
      )}
    />
  );
};

export default EditFormSelect;

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
