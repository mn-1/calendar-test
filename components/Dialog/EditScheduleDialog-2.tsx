// MUI
import {
  DialogTitle,
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
import EditFormInput from '../FormControl/EditFormInput';
import EditFormSelect from '../FormControl/EditFormSelect';
import FailedDialog from './FailedDialog';
// validate
import { scheduleSchema } from '../../schema/inputSchedule';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
// lib
import { scheduleDataInfo } from '../../lib/inputDataControl';
import { EventClickArg } from '@fullcalendar/core';

type Props = {
  operator: any;
  avatar: any;
  eventInfo: EventClickArg | null;
  handleClose: VoidFunction;
  editSchedule: Function;
};

export default function EditScheduleDialog(props: Props) {
  const { handleClose, editSchedule, eventInfo } = props;
  const event = eventInfo?.event;

  const useFormMethods = useForm<scheduleDataInfo>({
    resolver: yupResolver(scheduleSchema),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormMethods;

  const onEdit: SubmitHandler<scheduleDataInfo> = async (
    values: scheduleDataInfo
  ) => {
    editSchedule(values);
    reset({
      title: '',
      memo: '',
      operatorName: '',
      avatar: '',
    });
  };

  // キャンセルボタン
  const handleCancelButton = () => {
    handleClose();
    reset({
      title: '',
      memo: '',
      operatorName: '',
      avatar: '',
    });
  };

  if (event)
    return (
      <Dialog open={true} fullScreen>
        <DialogActions sx={{ px: '3rem' }}>
          <Tooltip title='閉じる'>
            <IconButton onClick={handleCancelButton}>
              <CloseIcon fontSize='large' />
            </IconButton>
          </Tooltip>
        </DialogActions>

        <DialogContent sx={{ px: '3rem' }}>
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
              onSubmit={handleSubmit(onEdit)}
            >
              <Typography color='secondary'>オペレーター名</Typography>
              <EditFormSelect
                defaultValue={event.extendedProps.operatorName ?? ''}
                users={props.operator}
                errorMessage={errors.operatorName?.message}
                name='operatorName'
                control={control}
              />
              {/* <Typography color='secondary'>アバター名</Typography>
              <EditFormSelect
                defaultValue={event.extendedProps.avatar ?? ''}
                users={props.avatar}
                errorMessage={errors.avatar?.message}
                name='avatar'
                control={control}
              /> */}
              <Typography color='secondary'>タイトル</Typography>
              <EditFormInput
                defaultValue={event.title ?? ''}
                name='title'
                autoComplete='off'
                focused
                placeholder='タイトル'
                fullWidth
              />
              <Typography color='secondary'>メモ</Typography>
              <EditFormInput
                defaultValue={event.extendedProps.memo ?? ''}
                name='memo'
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
                保存
              </Button>
            </Box>
          </FormProvider>
        </DialogContent>
      </Dialog>
    );
  else return <FailedDialog open={true} handleClose={handleClose} />;
}
