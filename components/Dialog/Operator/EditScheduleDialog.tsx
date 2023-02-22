import { useState } from 'react';
// MUI
import CloseIcon from '@mui/icons-material/Close';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import {
  Box,
  DialogActions,
  Dialog,
  DialogContent,
  DialogContentText,
  Grid,
  IconButton,
  Tooltip,
  Button,
  Typography,
} from '@mui/material';
// fullcalendar
import { EventClickArg } from '@fullcalendar/core';
// validate
import { editMemoSchema } from '../../../schema/inputSchedule';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
// lib
import { editMemoInfo } from '../../../lib/inputDataControl';
// components
import FailedDialog from '../FailedDialog';
import EditFormInput from '../../FormControl/EditFormInput';

type Props = {
  open: boolean;
  eventInfo: EventClickArg | null;
  handleClose: VoidFunction;
  editMemo: Function;
};

export default function EditScheduleDialog(props: Props) {
  const event = props.eventInfo?.event;
  const { open, handleClose, editMemo } = props;

  const useFormMethods = useForm<editMemoInfo>({
    resolver: yupResolver(editMemoSchema),
  });

  const { handleSubmit, reset } = useFormMethods;

  // 登録ボタンアクション
  const onSave: SubmitHandler<editMemoInfo> = async (values: editMemoInfo) => {
    console.log('memo', values);
    editMemo(values);
  };

  if (event && event.start && event.end)
    return (
      <Dialog open={open} fullWidth>
        <DialogActions>
          <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems='flex-end'
          >
            <Box sx={{ mx: '1rem' }} />
            <Typography variant='h6' color='secondary' fontWeight='bold'>
              メモを編集する
            </Typography>
            <Tooltip title='閉じる'>
              <IconButton
                onClick={() => {
                  reset({ memo: '' });
                  handleClose();
                }}
              >
                <CloseIcon fontSize='medium' />
              </IconButton>
            </Tooltip>
          </Grid>
        </DialogActions>
        <FormProvider {...useFormMethods}>
          <Box
            component='form'
            autoComplete='off'
            onSubmit={handleSubmit(onSave)}
            sx={{ p: '1rem' }}
          >
            <EditFormInput
              name='memo'
              defaultValue={event.extendedProps.memo}
              autoComplete='off'
              focused
              placeholder='メモ'
              fullWidth
              multiline
              minRows={3}
              maxRows={10}
            />
            <Button variant='contained' type='submit'>
              保存
            </Button>
          </Box>
        </FormProvider>
      </Dialog>
    );
  else return <FailedDialog open={open} handleClose={handleClose} />;
}
