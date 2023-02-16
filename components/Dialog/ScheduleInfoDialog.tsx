import * as React from 'react';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Typography,
  Box,
  DialogActions,
  Dialog,
  DialogContent,
  DialogContentText,
  Grid,
  IconButton,
  Tooltip,
  DialogTitle,
} from '@mui/material';
import { EventClickArg } from '@fullcalendar/core';
import { formatDate } from '../../lib/dateControl';

type Props = {
  open: boolean;
  eventInfo: EventClickArg | null;
  handleClose: VoidFunction;
  delete: VoidFunction;
  edit: VoidFunction;
};

export default function ScheduleInfoDialog(props: Props) {
  const event = props.eventInfo?.event;

  if (event && event.start && event.end)
    return (
      <Dialog open={props.open} fullWidth>
        <DialogActions>
          <Grid container justifyContent='end' alignItems='center'>
            <Tooltip title='予定を削除'>
              <IconButton onClick={props.delete}>
                <DeleteTwoToneIcon fontSize='medium' />
              </IconButton>
            </Tooltip>
            <Tooltip title='編集'>
              <IconButton onClick={props.edit}>
                <ModeEditOutlineTwoToneIcon fontSize='medium' />
              </IconButton>
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
