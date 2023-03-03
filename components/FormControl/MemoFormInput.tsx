import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';

// Type of Props the FormInput will receive
type FormInputProps = {
  defaultValue: string;
} & TextFieldProps;

const MemoFormInput: FC<FormInputProps> = ({ defaultValue, ...otherProps }) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name='memo'
      defaultValue={defaultValue}
      render={({ field }) => (
        <CssTextField
          {...field}
          {...otherProps}
          placeholder='メモ'
          variant='outlined'
          sx={{ my: '0.5rem' }}
          error={!!errors['memo']}
          helperText={
            errors['memo'] ? (errors['memo']?.message as unknown as string) : ''
          }
        />
      )}
    />
  );
};

export default MemoFormInput;

// Styled Material UI TextField Component
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
      border: '1px solid #dcdcdc',
      borderRadius: 6,
    },
    '&.Mui-focused fieldset': {
      border: '1px solid #dcdcdc',
      borderRadius: 6,
    },
    '& .Mui-disabled': {
      backgroundColor: '#F8F5F0',
    },
  },
});
