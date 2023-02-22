import * as yup from 'yup';

export const scheduleSchema = yup.object().shape({
  title: yup.string(),
  memo: yup.string(),
  avatar: yup.string(),
});

export const addMemoSchema = yup.object().shape({
  memo: yup.string(),
});
