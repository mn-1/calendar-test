import * as yup from 'yup';

export const addScheduleSchema = yup.object().shape({
  title: yup.string().required('タイトルは必須項目です。'),
  memo: yup.string(),
  avatar: yup.string(),
});
