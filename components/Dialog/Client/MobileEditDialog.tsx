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
import DatePickerForm from '../../FormControl/DatePicker';
import AddFormSelect from '../../FormControl/AddFormSelect';
import TimeFormInput from '../../FormControl/TimeFormInput';
// validate
import { scheduleSchema } from '../../../schema/inputSchedule';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
// lib
import { scheduleDataInfo } from '../../../lib/inputDataControl';
import { EventClickArg } from '@fullcalendar/core';
import FailedDialog from '../FailedDialog';

type Props = {
  open: boolean;
  operator: any;
  location: any;
  handleClose: VoidFunction;
  editSchedule: Function;
  eventInfo: EventClickArg;
};

export default function MobileEditScheduleDialog(props: Props) {
  const {
    open,
    editSchedule,
    operator,
    location,
    handleClose,
    eventInfo: { event },
  } = props;

  const resetValues = {
    locationName: '',
    operatorName: '',
    title: '',
    memo: '',
    avatar: '',
  };

  const useFormMethods = useForm<scheduleDataInfo>({
    resolver: yupResolver(scheduleSchema),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormMethods;

  // 登録ボタンアクション
  const onAdd: SubmitHandler<scheduleDataInfo> = async (
    values: scheduleDataInfo
  ) => {
    console.log('add values', values);

    editSchedule(values);
    reset(resetValues);
  };

  // キャンセルボタンアクション
  const handleCancelButton = () => {
    handleClose();
    reset(resetValues);
  };

  if (event.start && event.end)
    return (
      <Dialog open={open} fullScreen>
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
              <Typography color='secondary'>日程</Typography>
              <DatePickerForm defaultValue={event.start} control={control} />
              <br />
              <TimeFormInput
                control={control}
                errors={errors}
                startDefaultValue={event.start}
                endDefaultValue={event.end}
              />
              <AddFormSelect
                operator={operator}
                location={location}
                control={control}
                errors={errors}
                locationDefaultValue={event.getResources()[0]._resource.title}
                operatorDefaultValue={event.extendedProps.operatorName}
              />
              <Typography color='secondary'>タイトル</Typography>
              <EditFormInput
                defaultValue={event.title ?? ''}
                name='title'
                autoComplete='off'
                focused
                placeholder='タイトル'
                fullWidth
              />
              <Typography color='secondary'>アバター名</Typography>
              <EditFormInput
                defaultValue={event.extendedProps.avatar}
                name='avatar'
                autoComplete='off'
                focused
                placeholder='アバター'
                fullWidth
              />
              <Typography color='secondary'>メモ</Typography>
              <EditFormInput
                defaultValue={event.extendedProps.memo}
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
                登録する
              </Button>
            </Box>
          </FormProvider>
        </DialogContent>
      </Dialog>
    );
  else return <FailedDialog open={open} handleClose={handleClose} />;
}
