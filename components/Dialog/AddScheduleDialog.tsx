import dayjs, { Dayjs } from 'dayjs';
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
import FormInput from '../FormControl/FormInput';
import FormSelect from '../FormControl/FormSelect';
import DatePickerForm from '../FormControl/DatePicker';
// validate
import { addScheduleSchema } from '../../schema/inputSchedule';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
// lib
import { AddScheduleDataInfo } from '../../lib/inputDataControl';

type Props = {
  open: boolean;
  operator: any;
  avatar: any;
  handleClose: VoidFunction;
  addSchedule: Function;
  date: string | undefined;
};

export default function AddScheduleDialog(props: Props) {
  const { open, handleClose, addSchedule } = props;

  const defaultValues: AddScheduleDataInfo = {
    title: '',
    memo: '',
    operatorName: '',
    avatar: '',
  };

  const useFormMethods = useForm<AddScheduleDataInfo>({
    resolver: yupResolver(addScheduleSchema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormMethods;

  const onAdd: SubmitHandler<AddScheduleDataInfo> = async (
    values: AddScheduleDataInfo
  ) => {
    console.log(values);
    addSchedule(values);
    reset({
      title: '',
      memo: '',
      operatorName: '',
      avatar: '',
    });
  };

  // キャンセルボタンアクション
  const handleCancelButton = () => {
    reset({
      title: '',
      memo: '',
      operatorName: '',
      avatar: '',
    });
    handleClose();
  };

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
            予定を追加
          </Typography>
        </Grid>
        <DatePickerForm date={dayjs(props.date)} />
        <FormProvider {...useFormMethods}>
          <Box
            component='form'
            noValidate
            autoComplete='off'
            onSubmit={handleSubmit(onAdd)}
          >
            <Typography color='secondary'>オペレーター名</Typography>
            <FormSelect
              users={props.operator}
              errorMessage={errors.operatorName?.message}
              name='operatorName'
              control={control}
            />
            <Typography color='secondary'>アバター名</Typography>
            <FormSelect
              users={props.avatar}
              errorMessage={errors.avatar?.message}
              name='avatar'
              control={control}
            />
            <Typography color='secondary'>タイトル</Typography>
            <FormInput
              name='title'
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
}
