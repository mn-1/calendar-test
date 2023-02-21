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
import FormInput from '../FormControl/FormInput';
import DatePickerForm from '../FormControl/DatePicker';
import FailedDialog from './FailedDialog';
import AddFormSelect from '../FormControl/FormSelect';
// validate
import { scheduleSchema } from '../../schema/inputSchedule';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
// lib
import { scheduleDataInfo } from '../../lib/inputDataControl';
import { SelectInfoType } from '../../lib/eventControl-2';

type Props = {
  open: boolean;
  operator: any;
  location: any;
  handleClose: VoidFunction;
  addSchedule: Function;
  selectInfo: SelectInfoType;
};

export default function AddScheduleDialog(props: Props) {
  const { open, selectInfo, handleClose, addSchedule, operator, location } =
    props;

  const defaultValues: scheduleDataInfo = {
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
    addSchedule(values);
    reset(defaultValues);
  };

  // キャンセルボタンアクション
  const handleCancelButton = () => {
    handleClose();
    reset(defaultValues);
  };

  if (selectInfo)
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
          <DatePickerForm date={dayjs(selectInfo.startStr)} />
          <FormProvider {...useFormMethods}>
            <Box
              component='form'
              noValidate
              autoComplete='off'
              onSubmit={handleSubmit(onAdd)}
            >
              {/* <AddFormSelect
                operator={operator}
                location={location}
                control={control}
                errors={errors}
                locationDefaultValue={selectInfo.resourceTitle ?? ''}
                operatorDefaultValue=''
              /> */}

              <Typography color='secondary'>タイトル</Typography>
              <FormInput
                name='title'
                autoComplete='off'
                focused
                placeholder='タイトル'
                fullWidth
              />
              <Typography color='secondary'>アバター名</Typography>
              <FormInput
                name='avatar'
                autoComplete='off'
                focused
                placeholder='タイトル'
                fullWidth
              />
              <Typography color='secondary'>メモ</Typography>
              <FormInput
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
