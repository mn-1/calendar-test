import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  open: boolean;
  handleClose: VoidFunction;
};

export default function FailedSnackbar(props: Props) {
  const action = (
    <React.Fragment>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={props.handleClose}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={props.open}
      autoHideDuration={7000}
      onClose={props.handleClose}
      message='通信に失敗しました。'
      action={action}
    />
  );
}
