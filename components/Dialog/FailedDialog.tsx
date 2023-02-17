import {
  DialogTitle,
  Box,
  Dialog,
  Grid,
  DialogActions,
  Tooltip,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  open: boolean;
  handleClose: VoidFunction;
};

export default function FailedDialog(props: Props) {
  return (
    <Dialog open={props.open} fullWidth>
      <DialogActions>
        <Grid container justifyContent='end' alignItems='center'>
          <Box sx={{ px: 1 }} />
          <Tooltip title='閉じる'>
            <IconButton onClick={props.handleClose}>
              <CloseIcon fontSize='medium' />
            </IconButton>
          </Tooltip>
        </Grid>
      </DialogActions>
      <DialogTitle sx={{ mb: '2rem' }}>予定の取得に失敗しました</DialogTitle>
    </Dialog>
  );
}
