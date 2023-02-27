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

type Props = {
  open: boolean;
  operator: any;
  location: any;
  handleClose: VoidFunction;
  addSchedule: Function;
  date: Date;
};

export default function AddScheduleDialog(props: Props) {
  const { open, handleClose, addSchedule, operator, location, date } = props;

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

    addSchedule(values);
    reset(resetValues);
  };

  // キャンセルボタンアクション
  const handleCancelButton = () => {
    handleClose();
    reset(resetValues);
  };

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
            予定を追加
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
            <DatePickerForm defaultValue={date} control={control} />
            <br />
            <TimeFormInput
              control={control}
              errors={errors}
              startDefaultValue={new Date('2018-01-01T01:00:00.000Z')}
              endDefaultValue={new Date('2018-01-01T02:00:00.000Z')}
            />
            <AddFormSelect
              operator={operator}
              location={location}
              control={control}
              errors={errors}
              locationDefaultValue=''
              operatorDefaultValue=''
            />
            <Typography color='secondary'>タイトル</Typography>
            <EditFormInput
              defaultValue=''
              name='title'
              autoComplete='off'
              focused
              placeholder='タイトル'
              fullWidth
            />
            <Typography color='secondary'>アバター名</Typography>
            <EditFormInput
              defaultValue=''
              name='avatar'
              autoComplete='off'
              focused
              placeholder='タイトル'
              fullWidth
            />
            <Typography color='secondary'>メモ</Typography>
            <EditFormInput
              defaultValue=''
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
}
