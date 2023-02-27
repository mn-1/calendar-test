// MUI
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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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

  const locationDefaultValue =
    eventInfo.event.getResources()[0]._resource.title;

  if (eventInfo)
    return (
      <Dialog open={open} fullWidth>
        <DialogActions>
          <Tooltip title='閉じる'>
            <IconButton onClick={handleCancelButton}>
              <CloseIcon fontSize='large' />
            </IconButton>
          </Tooltip>
        </DialogActions>

        <DialogContent>
          <Grid container justifyContent='center'>
            <Typography variant='h4' color='secondary'>
              予定を編集
            </Typography>
          </Grid>

          <FormProvider {...useFormMethods}>
            <Box
              component='form'
              noValidate
              autoComplete='off'
              onSubmit={handleSubmit(onAdd)}
            >
              <Typography color='secondary'>タイトル</Typography>
              <EditFormInput
                name='title'
                defaultValue={eventInfo.event.title ?? ''}
                autoComplete='off'
                focused
                placeholder='タイトル'
                fullWidth
              />
              <Typography color='secondary'>アバター名</Typography>
              <EditFormInput
                name='avatar'
                defaultValue={eventInfo.event.extendedProps.avatar}
                autoComplete='off'
                focused
                placeholder='アバター'
                fullWidth
              />
              <Typography color='secondary'>メモ</Typography>
              <EditFormInput
                name='memo'
                defaultValue={eventInfo.event.extendedProps.memo}
                autoComplete='off'
                focused
                placeholder='メモ'
                fullWidth
                multiline
                minRows={3}
                maxRows={10}
              />
              <Button
                fullWidth
                variant='contained'
                type='submit'
                sx={{ fontWeight: 'bold', my: '0.5rem' }}
              >
                登録する
              </Button>
            </Box>
          </FormProvider>
        </DialogContent>
      </Dialog>
    );
  else return <FailedDialog open={open} handleClose={handleClose} />;
}
