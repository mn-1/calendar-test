import { useState } from 'react';
// MUI
import {
  DialogTitle,
  Box,
  DialogContent,
  Dialog,
  Button,
  Grid,
  Typography,
} from '@mui/material';
// components
import FormInput from '../FormControl/FormInput';
import FormSelect from '../FormControl/FormSelect';
// validate
import { addScheduleSchema } from '../../schema/inputSchedule';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
// lib
import { RegisterScheduleDataInfo } from '../../lib/inputDataControl';

type Props = {
  open: boolean;
  operator: any;
  avatar: any;
  handleClose: VoidFunction;
  registerSchedule: Function;
};

export default function InputSchedule(props: Props) {
  const { open, handleClose, registerSchedule } = props;

  const defaultValues: RegisterScheduleDataInfo = {
    title: '',
    memo: '',
    operatorName: '',
    avatar: '',
  };

  const useFormMethods = useForm<RegisterScheduleDataInfo>({
    resolver: yupResolver(addScheduleSchema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormMethods;

  const onRegister: SubmitHandler<RegisterScheduleDataInfo> = async (
    values: RegisterScheduleDataInfo
  ) => {
    console.log(values);
    registerSchedule(values);
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
      <DialogTitle>新しい予定</DialogTitle>
      <DialogContent>
        <FormProvider {...useFormMethods}>
          <Box
            component='form'
            noValidate
            autoComplete='off'
            onSubmit={handleSubmit(onRegister)}
          >
            <FormSelect
              label='オペレーター名'
              users={props.operator}
              errorMessage={errors.operatorName?.message}
              name='operatorName'
              control={control}
            />

            <FormSelect
              label='アバター名'
              users={props.avatar}
              errorMessage={errors.avatar?.message}
              name='avatar'
              control={control}
            />
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
