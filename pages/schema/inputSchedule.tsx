import * as yup from 'yup';

export const addScheduleSchema = yup.object().shape({
  title: yup.string().required('タイトルは必須項目です。'),
  start: yup.string().required(),
  end: yup.string().required(),
});
