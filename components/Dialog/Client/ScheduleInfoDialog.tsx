import * as React from 'react';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
// time
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
// operator
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
// avatar
import Face3OutlinedIcon from '@mui/icons-material/Face3Outlined';
// memo
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
// location
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  DialogActions,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import { EventClickArg } from '@fullcalendar/core';
import { formatDate } from '../../../lib/dateControl';
import FailedDialog from '../FailedDialog';
import { Typography } from '@material-ui/core';
import MemoFormInput from '../../FormControl/MemoFormInput';

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
      <Dialog open={props.open}>
        <DialogActions>
          <Grid container justifyContent='end' alignItems='center'>
            {!props.editMode && (
              <Tooltip title='予定を削除'>
                <span>
                  <IconButton onClick={props.delete}>
                    <DeleteTwoToneIcon fontSize='medium' />
                  </IconButton>
                </span>
              </Tooltip>
            )}
            {!props.editMode && (
              <Tooltip title='編集'>
                <span>
                  <IconButton onClick={props.edit}>
                    <ModeEditOutlineTwoToneIcon fontSize='medium' />
                  </IconButton>
                </span>
              </Tooltip>
            )}
            <Box sx={{ px: 1 }} />
            <Tooltip title='閉じる'>
              <IconButton onClick={props.handleClose}>
                <CloseIcon fontSize='medium' />
              </IconButton>
            </Tooltip>
          </Grid>
        </DialogActions>

        <DialogContent sx={{ px: { md: '2rem' } }}>
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
              <LocationOnOutlinedIcon />
            </Grid>
            <Grid item xs={10} sx={{ mb: '1rem' }}>
              <Typography variant='h6'>
                {event.extendedProps.locationName ?? ''}
              </Typography>
            </Grid>
            <Grid item xs={1} sx={{ mb: '1rem', mr: '0.4rem' }}>
              <PersonOutlineOutlinedIcon />
            </Grid>
            <Grid item xs={10} sx={{ mb: '1rem' }}>
              <Typography>{operatorName}</Typography>
            </Grid>
            <Grid item xs={1} sx={{ mb: '1rem', mr: '0.4rem' }}>
              <AccessTimeOutlinedIcon />
            </Grid>
            <Grid item xs={10} sx={{ mb: '1rem' }}>
              <Typography variant='h6'>{formatDate(start, end)}</Typography>
            </Grid>

            <Grid item xs={1} sx={{ mb: '1rem', mr: '0.4rem' }}>
              <Face3OutlinedIcon />
            </Grid>
            <Grid item xs={10} sx={{ mb: '1rem' }}>
              <Typography color={avatar === '' ? 'textSecondary' : 'inherit'}>
                {avatar != '' ? avatar : 'アバター'}
              </Typography>
            </Grid>
            <Grid container direction='row'>
              <Grid item xs={1} sx={{ mb: '1rem', mr: '0.4rem' }}>
                メモ
              </Grid>
              <Grid
                item
                xs={10}
                sx={{
                  mb: '1rem',
                  border: 1,
                  borderRadius: 1,
                  borderColor: '#dcdcdc',
                  height: '5rem',
                  overflow: 'auto',
                }}
              >
                <Typography color={memo === '' ? 'textSecondary' : 'inherit'}>
                  {memo != '' ? memo : ''}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  else
    return <FailedDialog open={props.open} handleClose={props.handleClose} />;
}
