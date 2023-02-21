import dayjs, { Dayjs } from 'dayjs';
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
import EditFormInput from '../FormControl/EditFormInput';
import DatePickerForm from '../FormControl/DatePicker';
import FailedDialog from './FailedDialog';
import FormSelect from '../FormControl/FormSelect';
// validate
import { scheduleSchema } from '../../schema/inputSchedule';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
// lib
import { scheduleDataInfo } from '../../lib/inputDataControl';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import { SelectInfoType } from '../../lib/eventControl-2';

type Props = {
  open: boolean;
  operator: any;
  location: any;
  handleClose: VoidFunction;
  editSchedule: Function;
  eventInfo: EventClickArg;
};

export default function EditScheduleDialog(props: Props) {
  const { open, eventInfo, handleClose, editSchedule, operator, location } =
    props;

  const defaultValues: scheduleDataInfo = {
    title: '',
    memo: '',
    locationName: '',
    operatorName: '',
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
    editSchedule(values);
    reset(defaultValues);
  };

  // キャンセルボタンアクション
  const handleCancelButton = () => {
    handleClose();
    reset(defaultValues);
  };

  const locationDefaultValue =
    eventInfo.event.getResources()[0]._resource.title;

  if (eventInfo)
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
          <DatePickerForm date={dayjs(eventInfo.event.startStr)} />
          <FormProvider {...useFormMethods}>
            <Box
              component='form'
              noValidate
              autoComplete='off'
              onSubmit={handleSubmit(onAdd)}
            >
              {/* <FormSelect
                operator={operator}
                location={location}
                control={control}
                errors={errors}
                locationDefaultValue={locationDefaultValue ?? ''}
                operatorDefaultValue={
                  eventInfo.event.extendedProps.operatorName ?? ''
                }
              /> */}

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
                placeholder='タイトル'
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
