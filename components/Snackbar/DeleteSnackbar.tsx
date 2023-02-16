import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  open: boolean;
  handleClose: VoidFunction;
  undoDelete: VoidFunction;
};

export default function DeleteSnackbar(props: Props) {
  const action = (
    <React.Fragment>
      <Button color='secondary' size='small' onClick={props.undoDelete}>
        元に戻す
      </Button>
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
      message='予定を削除しました'
      action={action}
    />
  );
}
