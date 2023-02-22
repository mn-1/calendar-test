import * as React from 'react';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  DialogActions,
  Dialog,
  DialogContent,
  DialogContentText,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import { EventClickArg } from '@fullcalendar/core';
import { formatDate } from '../../../lib/dateControl';
import FailedDialog from '../FailedDialog';
import EditFormInput from '../../FormControl/EditFormInput';
// validate
import { scheduleSchema } from '../../../schema/inputSchedule';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
// lib
import { addMemoInfo } from '../../../lib/inputDataControl';

type Props = {
  open: boolean;
  eventInfo: EventClickArg | null;
  handleClose: VoidFunction;
  edit: VoidFunction;
  editMemo: Function;
};

export default function ScheduleInfoDialog(props: Props) {
  const event = props.eventInfo?.event;
  const { open, handleClose, edit, editMemo } = props;

  const useFormMethods = useForm<addMemoInfo>({
    resolver: yupResolver(scheduleSchema),
  });

  const { handleSubmit, reset } = useFormMethods;

  // キャンセルボタンアクション
  const handleCancelButton = () => {
    // handleClose();
    reset({ memo: '' });
  };

  // 登録ボタンアクション
  const onSave: SubmitHandler<addMemoInfo> = async (values: addMemoInfo) => {
    editMemo(values);
    reset(resetValues);
  };

  if (event && event.start && event.end)
    return (
      <Dialog open={props.open} fullWidth>
        <DialogActions>
          <Grid container justifyContent='end' alignItems='center'>
            <Tooltip title='編集'>
              <span>
                <IconButton onClick={props.edit}>
                  <ModeEditOutlineTwoToneIcon fontSize='medium' />
                </IconButton>
              </span>
            </Tooltip>
            <Box sx={{ px: 1 }} />
            <Tooltip title='閉じる'>
              <IconButton onClick={props.handleClose}>
                <CloseIcon fontSize='medium' />
              </IconButton>
            </Tooltip>
          </Grid>
        </DialogActions>
        <DialogContent>
          <Box
            sx={{
              boxShadow: { sm: '0 0 5px #ddd' },
              p: '1rem',
            }}
          >
            <DialogContentText tabIndex={-1}>
              タイトル: {event.title}
              <br />
              オペレーター名: {event.extendedProps.operatorName}
              <br />
              時間: {formatDate(event.start)} ~ {formatDate(event.end)}
              <br />
              アバター: {event.extendedProps.avatar}
              <br />
              メモ
              <br />
              <FormProvider {...useFormMethods}>
                <Box
                  component='form'
                  noValidate
                  autoComplete='off'
                  onSubmit={handleSubmit(onSave)}
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
                </Box>
              </FormProvider>
            </DialogContentText>
          </Box>
        </DialogContent>
      </Dialog>
    );
  else
    return <FailedDialog open={props.open} handleClose={props.handleClose} />;
}
