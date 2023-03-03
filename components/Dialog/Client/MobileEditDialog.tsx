// MUI
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import Face3OutlinedIcon from '@mui/icons-material/Face3Outlined';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import {
  Box,
  DialogContent,
  Dialog,
  Button,
  Typography,
  DialogActions,
  Tooltip,
  IconButton,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// components
import EditFormInput from '../../FormControl/EditFormInput';
import DatePickerForm from '../../FormControl/DatePicker';
import AddFormSelect from '../../FormControl/AddFormSelect';
import TimeFormInput from '../../FormControl/TimeFormInput';
import MemoFormInput from '../../FormControl/MemoFormInput';
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
  const onAdd: SubmitHandler<scheduleDataInfo> = (values: scheduleDataInfo) => {
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
              <Grid container direction='row' alignItems='center'>
                <Grid item xs={1} sx={{ mb: '0.5rem', mr: '0.4rem' }} />
                <Grid item xs={10} sx={{ mb: '0.5rem' }}>
                  <EditFormInput
                    defaultValue={event.title ?? ''}
                    name='title'
                    autoComplete='off'
                    focused
                    placeholder='タイトル'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={1} sx={{ mb: '0.5rem', mr: '0.4rem' }}>
                  <AccessTimeOutlinedIcon />
                </Grid>
                <Grid item xs={10} sx={{ mb: '0.5rem' }}>
                  <DatePickerForm
                    defaultValue={event.start}
                    control={control}
                  />
                  <br />
                  <TimeFormInput
                    control={control}
                    errors={errors}
                    startDefaultValue={event.start}
                    endDefaultValue={event.end}
                  />
                </Grid>
                <AddFormSelect
                  operator={operator}
                  location={location}
                  control={control}
                  errors={errors}
                  locationDefaultValue={event.getResources()[0]._resource.title}
                  operatorDefaultValue={event.extendedProps.operatorName}
                />
                <Grid item xs={1} sx={{ mb: '0.5rem', mr: '0.4rem' }}>
                  <Face3OutlinedIcon />
                </Grid>
                <Grid item xs={10} sx={{ mb: '0.5rem' }}>
                  <EditFormInput
                    defaultValue={event.extendedProps.avatar ?? ''}
                    name='avatar'
                    autoComplete='off'
                    focused
                    placeholder='アバター'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={1} sx={{ mb: '0.5rem', mr: '0.4rem' }}>
                  <SubjectOutlinedIcon />
                </Grid>
                <Grid item xs={10} sx={{ mb: '0.5rem' }}>
                  <MemoFormInput
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
                </Grid>
              </Grid>
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
