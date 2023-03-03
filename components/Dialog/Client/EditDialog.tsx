// MUI
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Face3OutlinedIcon from '@mui/icons-material/Face3Outlined';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  DialogContent,
  Dialog,
  Button,
  Grid,
  Typography,
  DialogActions,
  Tooltip,
  IconButton,
  DialogTitle,
} from '@mui/material';
// components
import EditFormInput from '../../FormControl/EditFormInput';
import FailedDialog from '../FailedDialog';
// validate
import { editScheduleSchema } from '../../../schema/inputSchedule';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
// lib
import { editScheduleDataInfo } from '../../../lib/inputDataControl';
import { EventClickArg } from '@fullcalendar/core';
import MemoFormInput from '../../FormControl/MemoFormInput';

type Props = {
  open: boolean;
  handleClose: VoidFunction;
  editSchedule: Function;
  eventInfo: EventClickArg;
};

const resetValues = {
  title: '',
  memo: '',
  avatar: '',
};

export default function EditScheduleDialog(props: Props) {
  const { open, eventInfo, handleClose, editSchedule } = props;

  const useFormMethods = useForm<editScheduleDataInfo>({
    resolver: yupResolver(editScheduleSchema),
  });

  const { handleSubmit, reset } = useFormMethods;

  // 登録ボタンアクション
  const onAdd: SubmitHandler<editScheduleDataInfo> = async (
    values: editScheduleDataInfo
  ) => {
    editSchedule(values);
    reset(resetValues);
  };

  // キャンセルボタンアクション
  const handleCancelButton = () => {
    handleClose();
    reset(resetValues);
  };

  if (!eventInfo) return <FailedDialog open={open} handleClose={handleClose} />;

  const {
    event: {
      extendedProps: { avatar, memo },
    },
  } = eventInfo;

  return (
    <Dialog open={open}>
      <DialogActions>
        <Tooltip title='閉じる'>
          <IconButton onClick={handleCancelButton}>
            <CloseIcon fontSize='large' />
          </IconButton>
        </Tooltip>
      </DialogActions>

      <DialogTitle>
        <Grid container justifyContent='center'>
          <Typography variant='h5' color='secondary'>
            予定を編集
          </Typography>
        </Grid>
      </DialogTitle>

      <DialogContent>
        <FormProvider {...useFormMethods}>
          <Box
            component='form'
            noValidate
            autoComplete='off'
            onSubmit={handleSubmit(onAdd)}
          >
            <Grid container direction='row'>
              <Grid item xs={1} sx={{ my: '1rem', mr: '0.4rem' }}></Grid>
              <Grid item xs={10} sx={{ mb: '1rem' }}>
                <EditFormInput
                  name='title'
                  defaultValue={eventInfo.event.title ?? ''}
                  autoComplete='off'
                  focused
                  placeholder='タイトル'
                  fullWidth
                />
              </Grid>
              <Grid item xs={1} sx={{ my: '1.3rem', mr: '0.4rem' }}>
                <Face3OutlinedIcon />
              </Grid>
              <Grid item xs={10} sx={{ mb: '1rem' }}>
                <EditFormInput
                  name='avatar'
                  defaultValue={avatar ?? ''}
                  autoComplete='off'
                  focused
                  placeholder='アバター'
                  fullWidth
                />
              </Grid>
              <Grid item xs={1} sx={{ my: '1.3rem', mr: '0.4rem' }}>
                <SubjectOutlinedIcon />
              </Grid>
              <Grid item xs={10} sx={{ mb: '1rem' }}>
                <MemoFormInput
                  name='memo'
                  defaultValue={memo ?? ''}
                  autoComplete='off'
                  focused
                  placeholder='メモ'
                  fullWidth
                  multiline
                  minRows={3}
                  maxRows={10}
                />
              </Grid>
              <Button
                fullWidth
                variant='contained'
                type='submit'
                sx={{ fontWeight: 'bold', my: '0.5rem' }}
              >
                登録する
              </Button>
            </Grid>
          </Box>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
