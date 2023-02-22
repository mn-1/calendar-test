import * as React from 'react';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  DialogActions,
  Dialog,
  DialogContent,
  DialogContentText,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import { EventClickArg } from '@fullcalendar/core';
import { formatDate } from '../../../lib/dateControl';
import FailedDialog from '../FailedDialog';

type Props = {
  open: boolean;
  eventInfo: EventClickArg | null;
  handleClose: VoidFunction;
  delete: VoidFunction;
  edit: VoidFunction;
  editMode: boolean;
};

export default function ScheduleInfoDialog(props: Props) {
  const event = props.eventInfo?.event;

  if (event && event.start && event.end)
    return (
      <Dialog open={props.open} fullWidth>
        <DialogActions>
          <Grid container justifyContent='end' alignItems='center'>
            <Tooltip title='予定を削除'>
              <span>
                <IconButton onClick={props.delete} disabled={props.editMode}>
                  <DeleteTwoToneIcon fontSize='medium' />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title='編集'>
              <span>
                <IconButton onClick={props.edit} disabled={props.editMode}>
                  <ModeEditOutlineTwoToneIcon fontSize='medium' />
                </IconButton>
              </span>
            </Tooltip>
            <Box sx={{ px: 1 }} />
            <Tooltip title='閉じる'>
              <IconButton onClick={props.handleClose}>
                <CloseIcon fontSize='medium' />
              </IconButton>
            </Tooltip>
          </Grid>
        </DialogActions>
        <DialogContent>
          <Box
            sx={{
              boxShadow: { sm: '0 0 5px #ddd' },
              p: '1rem',
            }}
          >
            <DialogContentText tabIndex={-1}>
              タイトル: {event.title}
              <br />
              オペレーター名: {event.extendedProps.operatorName}
              <br />
              時間: {formatDate(event.start)} ~ {formatDate(event.end)}
              <br />
              アバター: {event.extendedProps.avatar}
              <br />
              メモ: {event.extendedProps.memo}
            </DialogContentText>
          </Box>
        </DialogContent>
      </Dialog>
    );
  else
    return <FailedDialog open={props.open} handleClose={props.handleClose} />;
}
