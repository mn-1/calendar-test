import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Face3OutlinedIcon from '@mui/icons-material/Face3Outlined';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import {
  Box,
  DialogActions,
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
  Grid,
  IconButton,
  Tooltip,
  Button,
} from '@mui/material';
import { EventClickArg } from '@fullcalendar/core';
import { formatDate } from '../../../lib/dateControl';
import FailedDialog from '../FailedDialog';

type Props = {
  open: boolean;
  eventInfo: EventClickArg | null;
  handleClose: VoidFunction;
  edit: VoidFunction;
};

export default function ScheduleInfoDialog(props: Props) {
  const event = props.eventInfo?.event;
  const { open, handleClose, edit } = props;

  if (!event)
    return <FailedDialog open={props.open} handleClose={props.handleClose} />;

  const {
    start,
    end,
    title,
    extendedProps: { avatar, memo, operatorName },
  } = event;

  if (start && end)
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
          <Grid container direction='row' alignItems='center'>
            <Grid item xs={1} sx={{ mb: '1rem', mr: '0.4rem' }} />
            <Grid
              item
              xs={10}
              sx={{ mb: '2rem', borderBottom: 'solid', borderColor: '#dddddd' }}
            >
              {title != '' ? (
                <Typography variant='h5'>{title}</Typography>
              ) : (
                <Typography variant='h5' color='textSecondary'>
                  タイトル
                </Typography>
              )}
            </Grid>
            <Grid item xs={1} sx={{ mb: '1rem', mr: '0.4rem' }}>
              <AccessTimeOutlinedIcon />
            </Grid>
            <Grid item xs={10} sx={{ mb: '1rem' }}>
              <Typography variant='h6'>{formatDate(start, end)}</Typography>
            </Grid>

            <Grid item xs={1} sx={{ mb: '1rem', mr: '0.4rem' }}>
              <PersonOutlineOutlinedIcon />
            </Grid>
            <Grid item xs={10} sx={{ mb: '1rem' }}>
              <Typography>{operatorName}</Typography>
            </Grid>

            <Grid item xs={1} sx={{ mb: '1rem', mr: '0.4rem' }}>
              <Face3OutlinedIcon />
            </Grid>
            <Grid item xs={10} sx={{ mb: '1rem' }}>
              {avatar != '' ? (
                avatar
              ) : (
                <Typography color='textSecondary'>アバター</Typography>
              )}
            </Grid>

            <Grid item xs={1} sx={{ mb: '1rem', mr: '0.4rem' }}>
              <SubjectOutlinedIcon />
            </Grid>
            <Grid item xs={10} sx={{ mb: '1rem' }}>
              {memo != '' ? (
                memo
              ) : (
                <Typography color='textSecondary'>メモ</Typography>
              )}
            </Grid>
          </Grid>
          {/* タイトル: {event.title}
              <br />
              オペレーター名: {event.extendedProps.operatorName}
              <br />
              時間: {formatDate(event.start)} ~ {formatDate(event.end)}
              <br />
              アバター: {event.extendedProps.avatar}
              <br />
              メモ：{event.extendedProps.memo} */}
        </DialogContent>
      </Dialog>
    );
  else return <FailedDialog open={open} handleClose={handleClose} />;
}
