import * as yup from 'yup';

export const addScheduleSchema = yup.object().shape({
  title: yup.string().required('タイトルは必須項目です。'),
  memo: yup.string(),
  operatorName: yup.string().required('オペレーターを選択してください。'),
  avatar: yup.string().required('アバターを選択してください'),
});

export const editScheduleSchema = yup.object().shape({
  title: yup.string().required('タイトルは必須項目です。'),
  memo: yup.string(),
  operatorName: yup.string().required('オペレーターを選択してください。'),
  avatar: yup.string().required('アバターを選択してください'),
});
