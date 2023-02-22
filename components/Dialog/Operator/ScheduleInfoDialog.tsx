import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import {
  Box,
  DialogActions,
  Dialog,
  DialogContent,
  DialogContentText,
  Grid,
  IconButton,
  Tooltip,
  Button,
} from '@mui/material';
import { EventClickArg } from '@fullcalendar/core';
import { formatDate } from '../../../lib/dateControl';
import FailedDialog from '../FailedDialog';
// validate
import { scheduleSchema } from '../../../schema/inputSchedule';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
// lib
import { editMemoInfo } from '../../../lib/inputDataControl';

type Props = {
  open: boolean;
  eventInfo: EventClickArg | null;
  handleClose: VoidFunction;
  edit: VoidFunction;
};

export default function ScheduleInfoDialog(props: Props) {
  const event = props.eventInfo?.event;
  const { open, handleClose, edit } = props;

  if (event && event.start && event.end)
    return (
      <Dialog open={open} fullWidth>
        <DialogActions>
          <Grid container justifyContent='end' alignItems='center'>
            <Tooltip title='編集'>
              <span>
                <IconButton onClick={edit}>
                  <ModeEditOutlineTwoToneIcon fontSize='medium' />
                </IconButton>
              </span>
            </Tooltip>
            <Box sx={{ px: 1 }} />
            <Tooltip title='閉じる'>
              <IconButton onClick={handleClose}>
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
              メモ：{event.extendedProps.memo}
            </DialogContentText>
          </Box>
        </DialogContent>
      </Dialog>
    );
  else return <FailedDialog open={open} handleClose={handleClose} />;
}
