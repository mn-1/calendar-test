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
import { UpdateFormDataInfo } from '../../pages/calendar';

type Props = {
  open: boolean;
  handleClose: VoidFunction;
};

export default function InputSchedule(props: Props) {
  const { open, handleClose } = props;

  const defaultValues: UpdateFormDataInfo = {
    title: '',
    start: new Date(),
    end: new Date(),
  };

  const useFormMethods = useForm<UpdateFormDataInfo>({
    resolver: yupResolver(addScheduleSchema),
    defaultValues,
  });

  const { control, handleSubmit, reset } = useFormMethods;

  const onUpdate: SubmitHandler<UpdateFormDataInfo> = async (
    values: UpdateFormDataInfo
  ) => {
    reset({
      title: '',
    });
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

            <Grid container justifyContent='end'>
              <Button
                variant='outlined'
                onClick={() => {
                  reset({
                    title: '',
                  });
                  handleClose();
                }}
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
                更新する
              </Button>
            </Grid>
          </Box>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
