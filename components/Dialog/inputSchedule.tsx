import * as React from 'react';
import {
  DialogTitle,
  Box,
  DialogContent,
  Dialog,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import { addScheduleSchema } from '../../schema/inputSchedule';
import FormInput from '../FormControl/FormInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { RegisterScheduleDataInfo } from '../../lib/inputDataControl';

type Props = {
  open: boolean;
  handleClose: VoidFunction;
  registerSchedule: Function;
};

export default function InputSchedule(props: Props) {
  const { open, handleClose, registerSchedule } = props;

  const defaultValues: RegisterScheduleDataInfo = {
    title: '',
    memo: '',
  };

  const useFormMethods = useForm<RegisterScheduleDataInfo>({
    resolver: yupResolver(addScheduleSchema),
    defaultValues,
  });

  const { control, handleSubmit, reset } = useFormMethods;

  const onUpdate: SubmitHandler<RegisterScheduleDataInfo> = async (
    values: RegisterScheduleDataInfo
  ) => {
    reset({
      title: '',
    });
    registerSchedule(values);
  };

  // キャンセルボタンアクション
  const handleCancelButton = () => {
    reset({
      title: '',
    });
    handleClose();
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>新しい予定</DialogTitle>
      <DialogContent>
        <FormProvider {...useFormMethods}>
          <Box
            component='form'
            noValidate
            autoComplete='off'
            onSubmit={handleSubmit(onUpdate)}
          >
            <Typography>タイトル</Typography>
            <FormInput
              name='title'
              autoComplete='off'
              focused
              placeholder='タイトル'
              fullWidth
            />
            <FormInput
              name='memo'
              autoComplete='off'
              focused
              placeholder='メモ'
              fullWidth
            />
            <Grid container justifyContent='end'>
              <Button
                variant='outlined'
                onClick={handleCancelButton}
                sx={{
                  fontWeight: 'bold',
                  mr: '1rem',
                }}
              >
                キャンセル
              </Button>
              <Button
                variant='contained'
                type='submit'
                sx={{
                  fontWeight: 'bold',
                }}
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
